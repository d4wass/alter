import { Prop, SchemaFactory, Schema, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FeatureDocument = Feature & Document;

@Schema()
export class Feature {
  @Prop({ type: raw({ capacity: { type: String }, power: { type: Number } }) })
  engine: Record<string, any>;
  @Prop({ type: raw({ manual: { type: Boolean }, automatic: { type: Boolean } }) })
  gearbox: Record<string, any>;
  @Prop({
    type: raw({ rear: { type: Boolean }, front: { type: Boolean }, all: { type: Boolean } })
  })
  drive: Record<string, any>;
  @Prop({ type: [String] })
  equipment: string[];
}

export const FeatureSchema = SchemaFactory.createForClass(Feature);

interface EngineInfo {
  capacity: string;
  power: number;
}
