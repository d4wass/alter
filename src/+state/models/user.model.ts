export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isTerms?: boolean;
  isNewsletter?: boolean;
  mobile?: string;
  description?: string;
  reservation?: any;
  vehicles?: any;
}

export interface UserDataProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isTerms?: boolean;
  isNewsletter?: boolean;
  mobile?: string;
  description?: string;
  reservations?: any;
  vehicles?: any;
}

export interface UserDataToUpdate {
  emailUpdate?: string;
  descriptionUpdate?: string;
  mobileUpdate?: {
    newValue?: string;
    oldValue?: string;
    confirmValue?: string;
  };
  passwordUpdate?: {
    newValue?: string;
    oldValue?: string;
    confirmValue?: string;
  };
}

export interface Credentials {
  email: string;
  password: string;
}

interface UpdateCredentials {
  oldValue: string;
  newValue: string;
  confirmValue: string;
}

export interface UserDataUpdate {
  passwordUpdate: UpdateCredentials;
  mobileUpdate: UpdateCredentials;
}
