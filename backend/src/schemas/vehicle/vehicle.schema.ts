import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Feature } from './feature.schema';
import { Specification } from './specification.schema';
import { Avalibility } from './avalibility.schema';
import { Review } from './review.schema';
import { Extras } from './extras.schema';
import { User } from '../users/users.schema';

export type VehicleDocument = Vehicle & Document;

@Schema()
export class Vehicle {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: User;
  @Prop({ type: String, required: true })
  brand: string;
  @Prop({ type: String, required: true })
  model: string;
  @Prop({ type: String, required: true })
  place: string;
  @Prop({ type: String, required: true })
  price: number;
  @Prop({ type: String })
  rate?: number;
  @Prop()
  specification: Specification;
  @Prop()
  features: Feature;
  @Prop()
  reviews: Review[];
  @Prop()
  extras: Extras[];
  @Prop({ type: String })
  description: string;
  @Prop({ type: Boolean })
  isCancelFree: boolean;
  @Prop()
  avalibility: Avalibility[];
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);

VehicleSchema.virtual('id').get(function (this: VehicleDocument) {
  return this._id;
});
VehicleSchema.pre('deleteOne', function (next) {
  // console.log(this), console.log(this.model);
  // next();
});
