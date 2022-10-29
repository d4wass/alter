import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AvalibilityDocument = Avalibility & Document;

@Schema()
export class Avalibility {
  @Prop()
  from: string;
  @Prop()
  until: string;
}

export const AvalibilitySchema = SchemaFactory.createForClass(Avalibility);
