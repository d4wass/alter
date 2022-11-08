import { Schema, Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Review {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: string;
  // userName will be getting by userId from reference to user Schema
  @Prop()
  userName: string;
  @Prop()
  date: string;
  @Prop()
  score: number;
  @Prop()
  description: string;
}
