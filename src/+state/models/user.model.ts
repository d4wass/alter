export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isTerms: boolean;
  isNewsletter?: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}
