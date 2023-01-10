import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICrud } from 'interface/crud.interface';
import { Model } from 'mongoose';
import { ReservationDto } from 'src/models/reservation.model';
import { Reservation, ReservationDocument } from 'src/schemas/reservation/reservation.schema';

@Injectable()
export class ReservationService implements ICrud<Reservation, ReservationDto, string> {
  constructor(
    @InjectModel(Reservation.name) private readonly reservationModel: Model<ReservationDocument>
  ) {}

  //TODO: create a way for calculating cost of reservation number of days multiple by cost per day of rental
  async create(reservationData: ReservationDto): Promise<{ reservationId: string }> {
    let reservation;
    const { hostId, userId, vehicleId } = reservationData;

    try {
      if (reservationData.hostId !== reservationData.userId) {
        const newReservation = new this.reservationModel({
          host: hostId,
          user: userId,
          vehicle: vehicleId,
          ...reservationData
        });
        reservation = await newReservation.save();
      }
    } catch (error) {
      console.log(error);
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

  //TODO: implement rest of CRUD method
  findAll(): Promise<Reservation[]> {
    throw new Error('Method not implemented.');
  }
  update(id: unknown, updateDto: ReservationDto): Promise<Reservation> {
    throw new Error('Method not implemented.');
  }
}
