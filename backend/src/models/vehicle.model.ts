export interface VehicleQuery {
  place: string;
  fromDate: { date: string; hour: string };
  endDate: { date: string; hour: string };
}

export interface VehicleModel {
  brand: string;
  model: string;
  place: string;
  price: number;
  description: string;
  specification: VehicleSpecificationModel;
  features: VehicleFeaturesModel;
}

export interface VehicleSpecificationModel {
  fuelConsumption: VehicleFuelConsumptionModel;
  fuelType: string;
  doors: number;
  seats: number;
}

export interface VehicleFeaturesModel {
  engine: VehicleEngineModel;
  gearbox: Record<string, boolean>;
  drive: Record<string, boolean>;
  equipment?: string[];
}

export interface VehicleEngineModel {
  capacity: number;
  power: number;
}

export interface VehicleFuelConsumptionModel {
  units: string;
  quantity: number;
}
