export interface Vehicle {
  _id: string;
  owner: string;
  brand: string;
  model: string;
  place: string;
  price: number;
  rate: number;
  specification: Specification;
  features: Feature;
  reviews: Review[];
  extras: Extras[];
  description: string;
  isCancelFree: boolean;
}

export interface VehicleQuery {
  place: string;
  fromDate: string;
  endDate: string;
}

interface Feature {
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

interface Review {
  userId: string;
  userName: string;
  date: string;
  score: number;
  review: string;
}

interface Extras {
  title: string;
  description: string;
  price: number;
}

interface Specification {
  fuelConsumption: { units: string; quantity: number };
  fuelType: string;
  doors: number;
  seats: number;
}
