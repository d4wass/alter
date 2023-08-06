import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICrud } from 'interface/crud.interface';
import { Model } from 'mongoose';
import { VehicleQuery } from '../../models/vehicle.model';
import { CreateVehicleDto } from './dto/vehicle.dto';
import { Vehicle, VehicleDocument } from '../../schemas/vehicle/vehicle.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class VehiclesService implements ICrud<Vehicle, CreateVehicleDto, string> {
  constructor(
    @InjectModel(Vehicle.name) private readonly vehicleModel: Model<VehicleDocument>,
    private readonly usersService: UsersService
  ) {}

  async create(createVehicleDto: CreateVehicleDto, owner: string): Promise<{ vehicleId: string }> {
    const newVehicle = new this.vehicleModel({
      ...createVehicleDto,
      owner
    });
    const result = await newVehicle.save();
    await this.usersService.updateUserVehicles(owner, result._id);

    return { vehicleId: result._id };
  }

  async delete(id: string): Promise<void> {
    await this.vehicleModel.deleteOne({ _id: id });
  }

  //TODO: implement on UI site this actions
  async update(id: string, updateVehicleDto: Partial<CreateVehicleDto>): Promise<Vehicle> {
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
      vehicle = await (
        await this.vehicleModel.findById(id)
      ).populate({ path: 'owner', select: ['firstName', 'lastName', '_id', 'email'] });
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
