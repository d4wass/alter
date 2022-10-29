import { Schema, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Review {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
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
