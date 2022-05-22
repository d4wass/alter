import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vehicle } from '../models/vehicle.model';
import { Model } from 'mongoose';

@Injectable()
export class VehiclesService {
  constructor(@InjectModel('Vehicle') private readonly vehicleModel: Model<Vehicle>) {}
  //host request
  async addVehicle(vehicle: Partial<Vehicle>) {
    const newVehicle = new this.vehicleModel({ ...vehicle });
    const result = await newVehicle.save();

    return result.id as string;
  }

  // async removeVehicle() { }
  // async updateVehicle() { }

  //user request
  // async bookVehicle() { }
  // async reviewVehicle() { }

  //search request
  // async getAllVehicles() {}
  // async getVehiclesByModel() {}
  // async getVehiclesByBrand() {}
  // async getVehiclesByPlace() {}
  // async getVehiclesByHost() {}
  // async getVehicle() {}
}
