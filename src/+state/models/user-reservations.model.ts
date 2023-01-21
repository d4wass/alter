import { Reservation } from './reservation.model';

export interface UserReservations extends Partial<Reservation> {
  _id: string;
}
