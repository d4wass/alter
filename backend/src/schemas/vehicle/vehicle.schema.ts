import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Feature } from './feature.schema';
import { Specification } from './specification.schema';
import { Avalibility } from './avalibility.schema';
import { Review } from './review.schema';
import { Extras } from './extras.schema';
import { User } from '../users/users.schema';

export type VehicleDocument = Vehicle & Document;

@Schema()
export class Vehicle {
  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  owner: User;
  @Prop({ type: String })
  brand: string;
  @Prop({ type: String })
  model: string;
  @Prop({ type: String })
  place: string;
  @Prop({ type: String })
  price: number;
  @Prop({ type: String })
  rate: number;
  @Prop({ type: String })
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
