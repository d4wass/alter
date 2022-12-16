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
