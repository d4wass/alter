import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Vehicle } from '../vehicle/vehicle.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  email: string;
  @Prop({ type: String, required: true })
  firstName: string;
  @Prop({ type: String, required: true })
  lastName: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ type: String })
  mobile?: string;
  @Prop({ type: Boolean })
  isHost?: boolean;
  @Prop({ type: Boolean })
  isNewsletter?: boolean;
  @Prop({ type: Boolean })
  isMobileNotification?: boolean;
  @Prop({ type: String })
  description?: string;
  @Prop([{ type: Types.ObjectId, ref: 'Vehicle' }])
  vehicles: Vehicle[];
}

export const UserSchema = SchemaFactory.createForClass(User);
