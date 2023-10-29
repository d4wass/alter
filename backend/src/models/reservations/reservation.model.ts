export interface ReservationModel {
  hostId: string;
  userId: string;
  vehicleId: string;
  fromDate: ReservationDate;
  endDate: ReservationDate;
  price: number;
  status: ReservationStatus;
}

export type ReservationDate = {
  date: string;
  hour: string;
};

export enum ReservationStatus {
  New = 'new',
  Confirmed = 'confirmed',
  Canceled = 'canceled'
}
