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
    equipment: string[];
  };
}
