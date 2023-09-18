import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICrud } from 'interface/crud.interface';
import { Model, Types } from 'mongoose';
import { ReservationDate, ReservationModel } from 'src/models/reservations/reservation.model';
import { Reservation, ReservationDocument } from 'src/schemas/reservation/reservation.schema';
import * as moment from 'moment';
import { User, UserDocument } from 'src/schemas/users/users.schema';
import { Vehicle, VehicleDocument } from 'src/schemas/vehicle/vehicle.schema';
import { ReservationDto } from 'src/models/reservations/reservation.dto';

@Injectable()
export class ReservationService implements ICrud<Reservation, ReservationDto, string> {
  constructor(
    @InjectModel(Reservation.name) private readonly reservationModel: Model<ReservationDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Vehicle.name) private readonly vehicleModel: Model<VehicleDocument>
  ) {}

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

  async delete(reservationId: string): Promise<void> {
    const reservation = await this.reservationModel.findById(reservationId).exec();
    const { user, host, vehicle } = reservation;

    try {
      await this.reservationModel.findByIdAndDelete(reservationId);
      this.usersDeleteReservationUpdate(host, user, reservationId);
      await this.vehicleModel.findByIdAndUpdate(vehicle, {
        $pull: { avalibility: new Types.ObjectId(reservationId) }
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

  update(id: unknown, updateDto: ReservationModel): Promise<Reservation> {
    throw new Error('Method not implemented.');
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
