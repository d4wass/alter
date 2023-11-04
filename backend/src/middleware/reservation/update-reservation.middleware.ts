import { NestMiddleware, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import { DateTime } from 'luxon';
import { Model } from 'mongoose';
import { ReservationDate } from 'src/models/reservations/reservation.model';
import { Reservation, ReservationDocument } from 'src/schemas/reservation/reservation.schema';
import { User } from 'src/schemas/users/users.schema';
import { Vehicle, VehicleDocument } from 'src/schemas/vehicle/vehicle.schema';

type ReservationDateTimestamps = {
  fromDate: number;
  endDate: number;
};

export class UpdateReservationMiddleware implements NestMiddleware {
  dateFormat = 'dd/MM/yy HH:mm';
  constructor(
    @InjectModel('Vehicle') private readonly vehicleModel: Model<Vehicle>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Reservation') private readonly reservationModel: Model<Reservation>
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.method === 'PUT') {
        await this.checkDataOfUpdateReservation(req);
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  private async checkDataOfUpdateReservation(req: Request) {
    const { body, params } = req;
    let reservation;

    try {
      reservation = await this.reservationModel.findById(params.id).populate('vehicle');
    } catch (error) {
      throw new NotFoundException('Cannot find reservation to update');
    }

    const updateDateOfReservation = {
      fromDate: reservation.fromDate,
      endDate: reservation.endDate
    };
    const vehicle = reservation.vehicle as unknown as VehicleDocument;
    const vehicleReservations = await this.reservationModel.find({
      _id: { $in: vehicle.avalibility }
    });

    if (!!vehicleReservations.length) {
      this.isReservationDateCorrect(
        vehicleReservations,
        params.id,
        body.fromDate,
        body.endDate,
        updateDateOfReservation
      );
    }
  }

  private isReservationDateCorrect(
    avalibility: ReservationDocument[],
    reservationId: string,
    fromDate: Partial<ReservationDate>,
    endDate: Partial<ReservationDate>,
    existingDateReservation: { fromDate: ReservationDate; endDate: ReservationDate }
  ) {
    const timestampDates = this.convertToTimestamp(fromDate, endDate, existingDateReservation);

    const avalibilityTimestamps = avalibility
      .filter((existReservation) => existReservation._id.toString() !== reservationId)
      .map(({ fromDate, endDate }) => ({
        fromDate: DateTime.fromFormat(
          `${fromDate.date} ${fromDate.hour}`,
          this.dateFormat
        ).toMillis(),
        endDate: DateTime.fromFormat(`${endDate.date} ${endDate.hour}`, this.dateFormat).toMillis()
      }));

    const isVehicleAvailable = avalibilityTimestamps.every((i) =>
      this.timestampChecker(i.fromDate, i.endDate, timestampDates.fromDate, timestampDates.endDate)
    );

    if (timestampDates.fromDate > timestampDates.endDate) {
      throw {
        status: 400,
        message:
          'Cannot update a reservation, the end date of the reservation cannot be earlier than the start date reservation'
      };
    }

    if (timestampDates.fromDate === timestampDates.endDate) {
      throw {
        status: 400,
        message:
          'Cannot update reservation, start date of reservation cannot be equal to end date reservation'
      };
    }

    if (!isVehicleAvailable) {
      throw {
        status: 400,
        message:
          'Cannot update a reservation, the vehicle already reserved at the selected date or date overlaps the existing reservation'
      };
    }
  }

  private timestampChecker(
    existStartDate: number,
    existEndDate: number,
    newStartDate: number,
    newEndDate: number
  ) {
    return !(
      (newStartDate === existStartDate && newEndDate === existEndDate) ||
      (existStartDate <= newEndDate && existEndDate >= newStartDate)
    );
  }

  private convertToTimestamp(
    fromDate: Partial<ReservationDate> | undefined,
    endDate: Partial<ReservationDate> | undefined,
    existingDateReservation: { fromDate: ReservationDate; endDate: ReservationDate }
  ): ReservationDateTimestamps {
    const filledDate = {
      fromDate: !!fromDate
        ? this.fillUpMissingReservationData(fromDate, existingDateReservation.fromDate)
        : existingDateReservation.fromDate,
      endDate: !!endDate
        ? this.fillUpMissingReservationData(endDate, existingDateReservation.endDate)
        : existingDateReservation.endDate
    };
    const formattedDate = {
      fromDate: DateTime.fromFormat(
        `${filledDate.fromDate.date} ${filledDate.fromDate.hour}`,
        this.dateFormat
      ).toMillis(),
      endDate: DateTime.fromFormat(
        `${filledDate.endDate.date} ${filledDate.endDate.hour}`,
        this.dateFormat
      ).toMillis()
    };

    return formattedDate;
  }

  private fillUpMissingReservationData(
    updateDate: Partial<ReservationDate>,
    existingDate: ReservationDate
  ): ReservationDate {
    let filledData: ReservationDate;
    //! CANNOT READ POROPERTIES OF UNDEFINED READING 'DATE'
    if (!!updateDate.date) {
      filledData = { date: updateDate.date, hour: existingDate.hour };
    } else {
      filledData = { date: existingDate.date, hour: updateDate.hour };
    }

    return filledData;
  }
}
