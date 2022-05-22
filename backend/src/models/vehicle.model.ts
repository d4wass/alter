import * as mongoose from 'mongoose';

export const VehicleSchema = new mongoose.Schema({
  id: { type: String },
  hostId: { type: String },
  brand: { type: String },
  model: { type: String },
  place: { type: String },
  specification: { type: Object },
  features: { type: Object },
  rewievs: { type: Array },
  extras: { type: Array },
  description: { type: String },
  isCancelFree: { type: Boolean },
  isBooked: { type: Boolean }
});

export interface Vehicle extends mongoose.Document {
  id: string;
  hostId: string;
  brand: string;
  model: string;
  place: string;
  specification: Specification;
  features: Feature;
  rewievs: Review[];
  extras: Extras[];
  description: string;
  isCancelFree: boolean;
  isBooked: boolean;
}

export interface Feature {
  engine: { capacity: number; power: number };
  gearbox: { manual: boolean; automatic: boolean };
  drive: { rear: boolean; front: boolean; all: boolean };
  equipment: {
    appleCarPlay: boolean;
    androidAuto: boolean;
    bluetooth: boolean;
    usb: boolean;
    headUpDisplay: boolean;
    navigation: boolean;
    airConditioning: boolean;
    keyLess: boolean;
    cruiseControl: { standard: boolean; active: boolean; adaptive: boolean };
    lights: { led: boolean; xenon: boolean; biXenon: boolean; laser: boolean };
    parkingAssist: { camera: boolean; camera360: boolean; autonomic: boolean };
    isofix: boolean;
  };
}

export interface Review {
  userId: string;
  userName: string;
  date: string;
  score: number;
  review: string;
}

export interface Extras {
  title: string;
  description: string;
  price: number;
}

export interface Specification {
  fuelConsumption: { units: string; quantity: number };
  fuelType: string;
  doors: number;
  seats: number;
}
