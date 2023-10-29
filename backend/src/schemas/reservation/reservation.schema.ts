import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type ReservationDocument = Reservation & Document;
@Schema()
class ReservationDate {
  @Prop({ type: String, required: true })
  date: string;
  @Prop({ type: String, required: true })
  hour: string;
}
@Schema({
  toJSON: {
    virtuals: true
  }
})
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

const ReservationSchema = SchemaFactory.createForClass(Reservation);

ReservationSchema.virtual('id').get(function (this: ReservationDocument) {
  return this._id;
});

export { ReservationSchema };
