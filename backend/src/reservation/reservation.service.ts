import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from 'src/models/reservation.model';

@Injectable()
export class ReservationService {
  constructor(@InjectModel('Reservation') private readonly reservationModel: Model<Reservation>) {}

  async addReservation(reservation: Partial<Reservation>) {
    const newReservation = new this.reservationModel({ ...reservation });
    const result = await newReservation.save();

    return result.id as string;
  }

  async getReservation(id: string) {
    let result: Reservation;
    try {
      result = await this.reservationModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Cannot find reservation');
    }

    return result;
  }
}
