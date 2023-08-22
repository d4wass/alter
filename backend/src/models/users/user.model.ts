import { Vehicle } from 'src/schemas/vehicle/vehicle.schema';

export interface UserModel {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  mobile: string;
  description?: string;
}

export interface UserDataToValidate {
  passwordUpdate: UpdateCredentials;
  mobileUpdate: UpdateCredentials;
}

interface UpdateCredentials {
  oldValue?: string;
  newValue?: string;
  confirmValue?: string;
}
