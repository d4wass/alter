import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from '../users/users.schema';
import { Vehicle } from '../vehicle/vehicle.schema';

export type ReservationDocument = Reservation & Document;
@Schema()
class ReservationDate {
  @Prop({ type: String, required: true })
  date: string;
  @Prop({ type: String, required: true })
  hour: string;
}
@Schema()
export class Reservation {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: string;
  @Prop({ type: Types.ObjectId, ref: 'Vehicle', required: true })
  vehicle: string;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  host: string;
  @Prop({ required: true })
  fromDate: ReservationDate;
  @Prop({ required: true })
  endDate: ReservationDate;
  @Prop({ type: Number })
  cost: number;
  @Prop({ type: String, enum: ['new', 'confirmed', 'canceled'], default: 'new' })
  status: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
