export interface ReservationModel {
  hostId: string;
  userId: string;
  vehicleId: string;
  fromDate: ReservationDate;
  endDate: ReservationDate;
  price: number;
}

export type ReservationDate = {
  date: string;
  hour: string;
};
