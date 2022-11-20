import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from 'src/schemas/reservation/reservation.schema';

@Injectable()
export class ReservationService {
  constructor(@InjectModel('Reservation') private readonly reservationModel: Model<Reservation>) {}

  async addReservation(reservationData: Reservation): Promise<string> {
    let reservation;

    try {
      const newReservation = new this.reservationModel({ ...reservationData });
      reservation = await newReservation.save();
    } catch (error) {
      console.log(error);
      throw new HttpException('Cannot create reservation', HttpStatus.BAD_REQUEST);
    }

    return reservation.id;
  }

  async getReservation(id: string) {
    let result: Reservation;
    try {
      result = await this.reservationModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Cannot find reservation');
    }
    console.log(result);
    return result;
  }
}
