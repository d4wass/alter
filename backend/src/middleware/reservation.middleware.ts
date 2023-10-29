import { NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import { DateTime } from 'luxon';
import { Document, Model } from 'mongoose';
import { ReservationDate } from 'src/models/reservations/reservation.model';
import { Reservation } from 'src/schemas/reservation/reservation.schema';
import { User } from 'src/schemas/users/users.schema';
import { Vehicle } from 'src/schemas/vehicle/vehicle.schema';

export class ReservationMiddleware implements NestMiddleware {
  constructor(
    @InjectModel('Vehicle') private readonly vehicleModel: Model<Vehicle>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Reservation') private readonly reservationModel: Model<Reservation>
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.method === 'POST') {
        await this.checkDataOfNewReservation(req);
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  private async checkDataOfNewReservation(req: Request) {
    const { userId, vehicleId, hostId, fromDate, endDate } = req.body;

    const user = await this.userModel.findById(userId);
    const host = await this.userModel.findById(hostId);
    const vehicle = await this.vehicleModel.findById(vehicleId);
    const vehicleReservations = await this.reservationModel.find({
      _id: { $in: vehicle.avalibility }
    });

    this.isDocumentExists({ user, host, vehicle });
    this.isHostNotEqualToUser(hostId, userId);
    if (!!vehicleReservations.length) {
      this.isReservationDateCorrect(vehicleReservations, fromDate, endDate);
    }
  }

  private isDocumentExists(documents: Record<string, Document>) {
    for (const key in documents) {
      if (!documents[key]) {
        throw {
          status: 404,
          message: `${key.charAt(0).toUpperCase() + key.slice(1)} is not exists`
        };
      }
    }
  }

  private isHostNotEqualToUser(hostId: string, userId: string) {
    if (hostId === userId) {
      throw {
        status: 400,
        message: 'User cannot rent a vehicle from yourself'
      };
    }
  }

  private isReservationDateCorrect(
    avalibility: Reservation[],
    fromDate: ReservationDate,
    endDate: ReservationDate
  ) {
    const fromDateTimestamp = this.convertToTimestamp(
      !!fromDate ? fromDate.date : '',
      !!fromDate ? fromDate.hour : ''
    );
    const endDateTimestamp = this.convertToTimestamp(
      !!endDate ? endDate.date : '',
      !!endDate ? endDate.hour : ''
    );
    const avalibilityTimestamps = avalibility.map((i) => {
      const avalibilityTimestamps = {
        fromDate: this.convertToTimestamp(i.fromDate.date, i.fromDate.hour),
        endDate: this.convertToTimestamp(i.endDate.date, i.endDate.hour)
      };
      return avalibilityTimestamps;
    });

    const isVehicleAvailable = avalibilityTimestamps.every((i) =>
      this.timestampChecker(i.fromDate, i.endDate, fromDateTimestamp, endDateTimestamp)
    );

    if (fromDateTimestamp > endDateTimestamp) {
      throw {
        status: 400,
        message:
          'Cannot create a reservation, the end date of the reservation cannot be earlier than the start date reservation'
      };
    }

    if (fromDateTimestamp === endDateTimestamp) {
      throw {
        status: 400,
        message:
          'Cannot create reservation, start date of reservation cannot be equal to end date reservation'
      };
    }

    if (!isVehicleAvailable) {
      throw {
        status: 400,
        message:
          'Cannot create a reservation, the vehicle already reserved at the selected date or date overlaps the existing reservation'
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

  private convertToTimestamp(date: string, hour: string): number {
    const format = 'dd/MM/yy HH:mm';
    const dateToFormat = `${date} ${hour}`;

    return DateTime.fromFormat(dateToFormat, format).toMillis();
  }
}
