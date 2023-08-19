import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICrud } from 'interface/crud.interface';
import { Model } from 'mongoose';
import { ReservationModel } from 'src/models/reservation.model';
import { Reservation, ReservationDocument } from 'src/schemas/reservation/reservation.schema';
import * as moment from 'moment';

@Injectable()
export class ReservationService implements ICrud<Reservation, ReservationModel, string> {
  constructor(
    @InjectModel(Reservation.name) private readonly reservationModel: Model<ReservationDocument>
  ) {}

  async create(reservationData: ReservationModel): Promise<{ reservationId: string }> {
    let reservation;
    const { hostId, userId, vehicleId, price, endDate, fromDate } = reservationData;
    const numberOfDay = this.calculateRentalCost(fromDate, endDate);

    try {
      if (reservationData.hostId !== reservationData.userId) {
        const newReservation = new this.reservationModel({
          host: hostId,
          user: userId,
          vehicle: vehicleId,
          cost: Number(price) * numberOfDay,
          ...reservationData
        });
        reservation = await newReservation.save();
      }
    } catch (error) {
      throw new HttpException('Cannot create reservation', HttpStatus.BAD_REQUEST);
    }

    return { reservationId: reservation._id };
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

  async delete(reservationId: string): Promise<void> {
    try {
      await this.reservationModel.findByIdAndDelete(reservationId);
    } catch (error) {
      throw new NotFoundException('Cannot delete reservation');
    }
  }

  findAll(): Promise<Reservation[]> {
    throw new Error('Method not implemented.');
  }

  update(id: unknown, updateDto: ReservationModel): Promise<Reservation> {
    throw new Error('Method not implemented.');
  }

  private calculateRentalCost(fromDate: string, endDate: string) {
    const convertedFromDate = new Date(this.convertDate(fromDate));
    const convertedEndDate = new Date(this.convertDate(endDate));
    const differentTime = convertedEndDate.getTime() - convertedFromDate.getTime();

    return differentTime / (1000 * 3600 * 24) + 1;
  }

  private convertDate(date: string): any {
    return moment(date, 'DD.MM.YYYY');
  }
}
