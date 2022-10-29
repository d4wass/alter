import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Feature } from './feature.schema';
import { Specification } from './specification.schema';
import { Avalibility } from './avalibility.schema';
import { Review } from './review.schema';
import { Extras } from './extras.schema';

export type VehicleDocument = Vehicle & Document;

@Schema()
export class Vehicle {
  @Prop()
  id: string;
  @Prop()
  hostId: string;
  @Prop()
  brand: string;
  @Prop()
  model: string;
  @Prop()
  place: string;
  @Prop()
  price: number;
  @Prop()
  rate: number;
  @Prop()
  specification: Specification;
  @Prop()
  features: Feature;
  @Prop()
  reviews: Review[];
  @Prop()
  extras: Extras[];
  @Prop()
  description: string;
  @Prop()
  isCancelFree: boolean;
  @Prop()
  avalibility: Avalibility[];
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
