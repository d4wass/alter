import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  isHost: { type: Boolean },
  description: { type: String },
  reviews: { type: Array },
  profilePhoto: { type: String },
  mobile: { type: String },
  isNewsletter: { type: Boolean },
  isMobileNotification: { type: Boolean }
});

UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

UserSchema.set('toObject', { virtuals: true });

export interface User extends mongoose.Document {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  mobile?: string;
  isHost?: boolean;
  isNewsletter?: boolean;
  isMobileNotification?: boolean;
  description?: string;
}
