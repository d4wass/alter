export interface Reservation {
  fromDate: string | undefined;
  endDate: string | undefined;
  userId: string | undefined;
  hostId: string | undefined;
  vehicleId: string | undefined;
}

export interface PopulatedReservation {
  fromDate: string;
  endDate: string;
  user: any;
  host: any;
  vehicle: any;
}
