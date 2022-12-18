export interface VehicleQuery {
  place: string;
  fromDate: { date: string; hour: string };
  endDate: { date: string; hour: string };
}

export interface VehicleDto {
  // [key: string]: any;
  brand: string;
  model: string;
  place: string;
  price: number;
  description: string;
  specification: {
    fuelConsumption: { units: string; quantity: number };
    fuelType: string;
    doors: number;
    seats: number;
  };
  features: {
    engine: { capacity: number; power: number };
    gearbox: string;
    drive: string;
    equipment: {
      airConditioning: boolean;
      androidAuto: boolean;
      appleCarPlay: boolean;
      bluetooth: boolean;
      cruiseControl: { standard: boolean; active: boolean; adaptive: boolean; autonomic: boolean };
      headUpDisplay: boolean;
      isofix: boolean;
      keyLess: boolean;
      lights: { led: boolean; xenon: boolean; biXenon: boolean; laser: boolean };
      navigation: boolean;
      parkingAssist: { camera: boolean; camera360: boolean; autonomic: boolean };
      usb: boolean;
    };
  };
}
