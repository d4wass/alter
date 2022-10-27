import { Prop, SchemaFactory, Schema, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SpecificationDocument = Specification & Document;

@Schema()
export class Specification {
  @Prop(raw({ units: { type: String }, quantity: { type: Number } }))
  fuelConsumption: Record<string, any>;
  @Prop()
  fuelType: string;
  @Prop()
  doors: number;
  @Prop()
  seats: number;
}

export const SpecificationSchema = SchemaFactory.createForClass(Specification);

interface FuelConsumption {
  units: string;
  quantity: number;
}
