import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AvalibilityDocument = Avalibility & Document;

@Schema()
export class Avalibility {
  @Prop()
  reservationId: string;
  @Prop(raw({ date: String, hour: String }))
  fromDate: Record<string, string>;
  @Prop(raw({ date: String, hour: String }))
  endDate: Record<string, string>;
}

export const AvalibilitySchema = SchemaFactory.createForClass(Avalibility);
