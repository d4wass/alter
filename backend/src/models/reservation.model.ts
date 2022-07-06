import * as mongoose from 'mongoose';

export const ReservationSchema = new mongoose.Schema({
  id: { type: String },
  hostId: { type: String },
  userId: { type: String },
  vehicleId: { type: String },
  fromDate: { type: Date },
  endDate: { type: Date },
  fromHour: { type: String },
  endHour: { type: String }
});

export interface Reservation extends mongoose.Document {
  fromDate: Date;
  fromHour: any;
  endDate: Date;
  endHour: any;
  userId: string;
  hostId: string;
  vehicleId: string;
}
