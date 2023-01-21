import { Vehicle } from './vehicle.model';

export interface UserVehicles extends Partial<Vehicle> {
  _id: string;
}
