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

export interface IVehicleBasicData {
  brand: string;
  model: string;
  place: string;
  price: number | null;
  description?: string;
}

export interface IVehicleSpecificationData {
  fuelConsumption: Record<string, any>;
  fuelType: string;
  doors: number;
  seats: number;
}

export interface IVehicleFeaturesData {
  engine: { capacity: string; power: number | null };
  gearbox: string;
  drive: string;
  equipment: any;
}

export interface IVehicleEquipment {
  equipment: {
    appleCarPlay: boolean;
    androidAuto: boolean;
    bluetooth: boolean;
    usb: boolean;
    headUpDisplay: boolean;
    navigation: boolean;
    airConditioning: boolean;
    keyLess: boolean;
    cruiseControl: {
      standard: boolean;
      active: boolean;
      adaptive: boolean;
      autonomic: boolean;
    };
    lights: {
      led: boolean;
      xenon: boolean;
      biXenon: boolean;
      laser: boolean;
    };
    parkingAssist: {
      camera: boolean;
      camera360: boolean;
      autonomic: boolean;
    };
    isofix: boolean;
  };
}
