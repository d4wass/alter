import { Vehicle } from 'src/schemas/vehicle/vehicle.schema';

export interface UserDto {
  email: string;
  firstName: string;
  isNewsletter?: boolean;
  isTerms: boolean;
  lastName: string;
  password: string;
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
