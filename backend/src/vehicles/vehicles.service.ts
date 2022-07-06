import { Injectable, NotFoundException } from '@nestjs/common';
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
  async getVehiclesByModel(model: string) {
    let vehiclesByModel: Vehicle[];
    try {
      vehiclesByModel = await this.vehicleModel.find({ model }).exec();
    } catch (error) {
      throw new NotFoundException('Cannot find vehicles by model');
    }

    if (!vehiclesByModel) {
      throw new NotFoundException('Cannot find vehicles by model');
    }

    return vehiclesByModel as Vehicle[];
  }

  async getVehiclesByBrand(brand: string) {
    let vehiclesByBrand: Vehicle[];
    try {
      vehiclesByBrand = await this.vehicleModel.find({ brand }).exec();
    } catch (error) {
      throw new NotFoundException('Cannot find vehicles by brand');
    }

    if (!vehiclesByBrand) {
      throw new NotFoundException('Cannot find vehicles by brand');
    }

    return vehiclesByBrand as Vehicle[];
  }

  async getVehiclesByQuery(query: any) {
    let vehiclesByQuery: Vehicle[];
    try {
      vehiclesByQuery = await this.vehicleModel.find(query).exec();
    } catch (error) {
      throw new NotFoundException('Cannot find vehicles by brand');
    }

    if (!vehiclesByQuery) {
      throw new NotFoundException('Cannot find vehicles by brand');
    }

    return vehiclesByQuery as Vehicle[];
  }

  async getVehiclesByPlace(place: string) {
    let vehiclesByPlace: Vehicle[];
    try {
      vehiclesByPlace = await this.vehicleModel.find({ place }).exec();
    } catch (error) {
      throw new NotFoundException('Cannot find vehicles by place');
    }

    if (!vehiclesByPlace) {
      throw new NotFoundException('Cannot find vehicles by place');
    }

    return vehiclesByPlace as Vehicle[];
  }

  async getAllVehicles() {
    const vehicles = await this.vehicleModel.find().exec();
    console.log(vehicles);
    return vehicles;
  }

  stringFormatter(value: string): string {
    const formattedParam = value.charAt(0).toUpperCase() + value.toLowerCase().slice(1);
    return formattedParam;
  }
}
