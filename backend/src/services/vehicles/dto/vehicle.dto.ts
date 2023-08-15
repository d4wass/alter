import {
  VehicleEngineModel,
  VehicleFeaturesModel,
  VehicleFuelConsumptionModel,
  VehicleModel,
  VehicleSpecificationModel
} from '../../../models/vehicle.model';
import { IsNotEmpty, IsString, IsNumber, ValidateNested, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { IsRecordOfBooleans } from '../../../decorators/custom-valid-decorators.decorator';

class FuelConsumption implements VehicleFuelConsumptionModel {
  @IsString()
  @IsNotEmpty()
  units: string;
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

class Specification implements VehicleSpecificationModel {
  @ValidateNested()
  @Type(() => FuelConsumption)
  fuelConsumption: FuelConsumption = new FuelConsumption();
  @IsString()
  @IsNotEmpty()
  fuelType: string;
  @IsNumber()
  @IsNotEmpty()
  doors: number;
  @IsNumber()
  @IsNotEmpty()
  seats: number;
}

class Engine implements VehicleEngineModel {
  @IsNumber()
  @IsNotEmpty()
  capacity: number;
  @IsNumber()
  @IsNotEmpty()
  power: number;
}

class Features implements VehicleFeaturesModel {
  @ValidateNested()
  @Type(() => Engine)
  engine: Engine = new Engine();
  @IsRecordOfBooleans({ message: 'Inpropriate value for vehicle gearbox' })
  gearbox: Record<string, boolean>;
  @IsRecordOfBooleans({ message: 'Inpropriate value for vehicle drive' })
  drive: Record<string, boolean>;
  equipment?: string[];
}

export class CreateVehicleDto implements VehicleModel {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Brand value is too short' })
  brand: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Model value is too short' })
  model: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Place value is too short' })
  place: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
  description: string;
  @ValidateNested()
  @Type(() => Specification)
  specification: Specification = new Specification();
  @ValidateNested()
  @Type(() => Features)
  features: Features = new Features();
}
