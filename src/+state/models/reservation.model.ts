export interface Reservation {
  fromDate: string | undefined;
  endDate: string | undefined;
  userId: string | undefined;
  hostId: string | undefined;
  vehicleId: string | undefined;
}

export interface PopulatedReservation {
  cost: string;
  fromDate: string;
  endDate: string;
  user: any;
  host: any;
  vehicle: any;
  _id: any;
}
