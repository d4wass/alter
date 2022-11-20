import * as mongoose from 'mongoose';
import { Vehicle } from 'src/schemas/vehicle/vehicle.schema';

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

UserSchema.set('toObject', { virtuals: true });

export interface User extends mongoose.Document {
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

export interface UserDataToValidate {
  passwordUpdate: UpdateCredentials;
  mobileUpdate: UpdateCredentials;
}

export interface UserDataToUpdate {
  emailUpdate?: string;
  descriptionUpdate?: string;
  mobileUpdate?: UpdateCredentials;
  passwordUpdate?: UpdateCredentials;
  vehicles?: (string | Vehicle)[];
}

interface UpdateCredentials {
  oldValue?: string;
  newValue?: string;
  confirmValue?: string;
}
