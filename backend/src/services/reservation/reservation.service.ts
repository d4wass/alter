import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ICrudService } from 'interface/crud.interface';
import { Types } from 'mongoose';
import { ReservationDate, ReservationStatus } from 'src/models/reservations/reservation.model';
import { Reservation } from 'src/schemas/reservation/reservation.schema';
import * as moment from 'moment';
import { ReservationDto } from 'src/models/reservations/reservation.dto';

@Injectable()
export class ReservationService extends ICrudService<Reservation, ReservationDto, string> {
  async create(reservationData: ReservationDto): Promise<{ reservationId: string }> {
    let reservation;
    const { hostId, userId, vehicleId, price, endDate, fromDate } = reservationData;
    const totalPrice = this.calculateRentalCost(fromDate, endDate, price);

    try {
      const newReservation = new this.reservationModel({
        host: hostId,
        user: userId,
        vehicle: vehicleId,
        cost: totalPrice,
        ...reservationData
      });
      reservation = await newReservation.save();

      if (!!reservation) {
        this.usersCreateReservationUpdate(hostId, userId, reservation._id);
        await this.vehicleModel
          .findByIdAndUpdate({ _id: vehicleId }, { $push: { avalibility: reservation._id } })
          .exec();
      } else {
        throw new HttpException('Cannot create reservation', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      return { reservationId: reservation._id };
    } catch (error) {
      throw new HttpException('Cannot create reservation', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<Reservation> {
    let result;
    try {
      result = await this.reservationModel
        .findById(id)
        .populate({ path: 'user', select: ['firstName', 'lastName', '_id'] })
        .populate({ path: 'host', select: ['firstName', 'lastName', '_id'] })
        .populate('vehicle');
    } catch (error) {
      throw new NotFoundException('Cannot find reservation');
    }
    return result;
  }

  async delete(id: string): Promise<void> {
    const reservation = await this.reservationModel.findById(id).exec();
    const { user, host, vehicle } = reservation;

    try {
      await this.reservationModel.findByIdAndDelete(id);
      this.usersDeleteReservationUpdate(host, user, id);
      await this.vehicleModel.findByIdAndUpdate(vehicle, {
        $pull: { avalibility: new Types.ObjectId(id) }
      });
    } catch (error) {
      throw new NotFoundException('Cannot delete reservation');
    }
  }

  async findAll(userId: string): Promise<Reservation[]> {
    const reservations = await this.reservationModel.find({ host: userId });

    if (!reservations) {
      throw new NotFoundException("User doesn't have any reservations");
    }

    return [...reservations];
  }

  async update(id: string, updateReservation: Partial<ReservationDto>): Promise<Reservation> {
    // eslint-disable-next-line prefer-const
    let reservation = await this.reservationModel.findById(id).exec();

    if (!reservation) {
      throw new NotFoundException('Cannot find reservation');
    }

    try {
      if (reservation) {
        //! issue with update if request body have incomplete data then update overrides existing doc removing missing in body request fields
        // await this.reservationModel.findByIdAndUpdate(id, updateReservation, { new: true });
        for (const field in updateReservation) {
          reservation[field] = updateReservation[field];
        }
        reservation.save((err, result) => {
          return result;
        });
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }

    return reservation as Reservation;
  }

  async confirm(id: string, status: ReservationStatus): Promise<Reservation> {
    const confirmedReservation = await this.reservationModel.findByIdAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );

    try {
      if (confirmedReservation) {
        return confirmedReservation;
      } else {
        throw new NotFoundException('Reservation not found');
      }
    } catch (error) {
      throw new NotFoundException('Cannot confirm reservation', error);
    }
  }

  private async usersCreateReservationUpdate(
    hostId: string,
    userId: string,
    reservationId: string
  ) {
    await this.userModel.findByIdAndUpdate(hostId, { $push: { reservations: reservationId } });
    await this.userModel.findByIdAndUpdate(userId, { $push: { reservations: reservationId } });
  }

  private getErrorMsg<T extends Record<string, boolean>>(obj: T): string[] {
    const failedDocument: string[] = [];
    for (const key in obj) {
      if (!obj[key]) {
        failedDocument.push(`${key} was not found`);
      }
    }
    return failedDocument;
  }

  private async usersDeleteReservationUpdate(
    hostId: string,
    userId: string,
    reservationId: string
  ) {
    const id = new Types.ObjectId(reservationId);
    await this.userModel.findByIdAndUpdate(hostId, { $pull: { reservations: id } });
    await this.userModel.findByIdAndUpdate(userId, { $pull: { reservations: id } });
  }

  private calculateRentalCost(fromDate: ReservationDate, endDate: ReservationDate, price: number) {
    const convertedFromDate = new Date(this.convertDate(`${fromDate.date} ${fromDate.hour}`));
    const convertedEndDate = new Date(this.convertDate(`${endDate.date} ${endDate.hour}`));
    const differentTime = convertedEndDate.getTime() - convertedFromDate.getTime();

    const rentalTime = Number((differentTime / (1000 * 60 * 60)).toFixed(2));
    const totalCost = (rentalTime / 24) * price;
    return totalCost.toFixed(2);
  }

  private convertDate(date: string): any {
    return moment(date, 'DD.MM.YYYY HH:mm');
  }
}
