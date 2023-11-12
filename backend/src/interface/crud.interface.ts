import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from '../schemas/reservation/reservation.schema';
import { User, UserDocument } from '../schemas/users/users.schema';
import { Vehicle, VehicleDocument } from '../schemas/vehicle/vehicle.schema';

export abstract class ICrudService<T, K, S> {
  constructor(
    @InjectModel(User.name) readonly userModel: Model<UserDocument>,
    @InjectModel(Vehicle.name) readonly vehicleModel: Model<VehicleDocument>,
    @InjectModel(Reservation.name) readonly reservationModel: Model<ReservationDocument>
  ) {}

  abstract findOne(id: S): Promise<T>;
  abstract create(createDto: K, id?: S): Promise<T | { [key: string]: S }>;
  abstract update(id: S, updateDto: K, userId?: S): Promise<T>;
  abstract delete(id: S, userId: S): Promise<T | void>;
}
