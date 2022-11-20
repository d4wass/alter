export interface IVehicleBasicData {
  brand: string;
  model: string;
  place: string;
  price: number;
  description?: string;
}

export interface IVehicleSpecificationData {
  fuelConsumption: Record<string, any>;
  fuelType: string;
  doors: number;
  seats: number;
}
