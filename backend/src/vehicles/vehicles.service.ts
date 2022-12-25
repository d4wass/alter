import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICrud } from 'interface/crud.interface';
import { Model } from 'mongoose';
import { VehicleDto, VehicleQuery } from 'src/models/vehicle.model';
import { Vehicle, VehicleDocument } from 'src/schemas/vehicle/vehicle.schema';

@Injectable()
export class VehiclesService implements ICrud<Vehicle, VehicleDto, string> {
  constructor(@InjectModel(Vehicle.name) private readonly vehicleModel: Model<VehicleDocument>) {}

  async create(createVehicleDto: VehicleDto, userId: string): Promise<{ vehicleId: string }> {
    let result;

    try {
      const newVehicle = new this.vehicleModel({ ...createVehicleDto, owner: userId });
      result = await newVehicle.save();
    } catch (error) {
      throw new Error(`Cannot create vehicle ${error}`);
    }

    return { vehicleId: result._id };
  }

  //TODO: implement on UI site this actions
  async update(id: string, updateVehicleDto: Partial<VehicleDto>): Promise<Vehicle> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<Vehicle> {
    throw new Error('Method not implemented.');
  }

  //Search Vehicle Actions
  async findAll(): Promise<Vehicle[]> {
    let vehicles;

    try {
      vehicles = await this.vehicleModel.find().exec();
    } catch (error) {
      throw new Error(`Cannot find any vehicles`);
    }

    return vehicles;
  }

  async findOne(id: string): Promise<Vehicle> {
    let vehicle;

    try {
      vehicle = await this.vehicleModel.findById(id);
    } catch (error) {
      throw new Error(`Cannot find vehicle with ${id}`);
    }
    return vehicle;
  }

  async findByQuery(query: VehicleQuery): Promise<Vehicle[]> {
    let vehiclesByQuery: Vehicle[];

    try {
      vehiclesByQuery = await this.vehicleModel
        .find({
          'place': { $regex: `^${query.place}$`, $options: 'i' },
          'avalibility.from': { $not: { $eq: query.fromDate } },
          'avalibility.until': { $not: { $eq: query.endDate } }
        })
        .exec();
    } catch (error) {
      throw new NotFoundException(`Cannot find vehicles by query: ${query}`);
    }

    return vehiclesByQuery;
  }

  // async removeVehicle() { }
  // async updateVehicle() { }

  //user request
  // async bookVehicle() { }
  // async reviewVehicle() { }

  //search request
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
}
