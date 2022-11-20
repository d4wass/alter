import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from '../users/users.schema';
import { Vehicle } from '../vehicle/vehicle.schema';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: User;
  @Prop({ type: Types.ObjectId, ref: 'Vehicle' })
  vehicleId: Vehicle;
  @Prop({ type: Types.ObjectId, ref: 'User' })
  hostId: User;
  @Prop({ type: String, required: true })
  fromDate: string;
  @Prop({ type: String, required: true })
  endDate: string;
  @Prop({ type: String, required: true })
  cost: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
