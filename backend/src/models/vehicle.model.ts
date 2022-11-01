import * as mongoose from 'mongoose';

export const AvalibilitySchema = new mongoose.Schema({
  from: { type: String },
  until: { type: String }
});

export interface VehicleQuery {
  place: string;
  fromDate: { date: string; hour: string };
  endDate: { date: string; hour: string };
}

export const VehicleSchema = new mongoose.Schema({
  id: { type: String },
  hostId: { type: String },
  brand: { type: String },
  model: { type: String },
  place: { type: String },
  price: { type: Number },
  rate: { type: Number },
  specification: { type: Object },
  features: { type: Object },
  rewievs: { type: Array },
  extras: { type: Array },
  description: { type: String },
  isCancelFree: { type: Boolean },
  avalibility: [AvalibilitySchema]
});

export interface Vehicle extends mongoose.Document {
  id: string;
  hostId: string;
  brand: string;
  model: string;
  place: string;
  price: number;
  rate: number;
  specification: Specification;
  features: Feature;
  rewievs: Review[];
  extras: Extras[];
  description: string;
  isCancelFree: boolean;
  avalibility: Avalibility[];
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
  description: string;
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

export interface Avalibility {
  from: string;
  until: string;
}
