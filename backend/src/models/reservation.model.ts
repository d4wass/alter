import * as mongoose from 'mongoose';

export const ReservationSchema = new mongoose.Schema({
  hostId: { type: String },
  userId: { type: String },
  vehicleId: { type: String },
  fromDate: { type: String },
  endDate: { type: String }
});

export interface Reservation extends mongoose.Document {
  fromDate: string;
  endDate: string;
  userId: string;
  hostId: string;
  vehicleId: string;
}
