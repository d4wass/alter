export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isTerms: boolean;
  isNewsletter?: boolean;
  mobile: string;
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
