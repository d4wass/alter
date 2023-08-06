import { FormControl, FormGroup } from '@ngneat/reactive-forms';

export interface VehicleForm {
  vehicleMainInfo: FormGroup<VehicleMainInformation>;
  vehicleSpecInfo: FormGroup<VehicleSpecificationInformation>;
  vehicleFeaturesInfo: FormGroup<any>;
}

export interface VehicleMainInformation {
  brand: FormControl<string>;
  model: FormControl<string>;
  place: FormControl<string>;
  price: FormControl<number | null>;
  description: FormControl<string>;
}

export interface VehicleSpecificationInformation {
  fuelConsumption: FormGroup<FuelConsumption>;
  fuelType: FormControl<string>;
  doors: FormControl<number | null>;
  seats: FormControl<number | null>;
}

export interface VehicleFeaturesInformation {
  engine: FormGroup<Engine>;
  gearbox: FormControl<string>;
  drive: FormControl<string>;
  equipment: FormControl<string[]>;
}

type FuelConsumption = {
  units: FormControl<string>;
  quantity: FormControl<string>;
};

type Engine = {
  capacity: FormControl<string>;
  power: FormControl<number | null>;
};
