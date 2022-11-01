import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { Vehicle } from '../models/vehicle.model';
import { Model } from 'mongoose';
import { VehicleQuery } from 'src/models/vehicle.model';
import { Vehicle, VehicleDocument } from 'src/schemas/vehicle/vehicle.schema';

@Injectable()
export class VehiclesService {
  constructor(@InjectModel(Vehicle.name) private readonly vehicleModel: Model<VehicleDocument>) {}
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
    let vehiclesByModel: Promise<Vehicle[]>;
    try {
      vehiclesByModel = this.vehicleModel.find({ model }).exec();
    } catch (error) {
      throw new NotFoundException('Cannot find vehicles by model');
    }

    if (!vehiclesByModel) {
      throw new NotFoundException('Cannot find vehicles by model');
    }

    return vehiclesByModel;
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

  async getVehiclesByQuery(query: VehicleQuery) {
    let vehiclesByQuery: Vehicle[];
    try {
      vehiclesByQuery = await this.vehicleModel
        .find({
          'place': query.place,
          'avalibility.from': { $not: { $eq: query.fromDate } },
          'avalibility.until': { $not: { $eq: query.endDate } }
        })
        .exec();
    } catch (error) {
      throw new NotFoundException('Cannot find vehicles by query');
    }

    if (!vehiclesByQuery) {
      throw new NotFoundException('Cannot find vehicles by query');
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
    return vehicles;
  }

  stringFormatter(value: string): string {
    const formattedParam = value.charAt(0).toUpperCase() + value.toLowerCase().slice(1);
    return formattedParam;
  }
}
