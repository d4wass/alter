import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ICrudService } from 'src/interface/crud.interface';
import { Types } from 'mongoose';
import { VehicleQuery } from '../../models/vehicles/vehicle.model';
import { CreateVehicleDto } from '../../models/vehicles/vehicle.dto';
import { Vehicle } from '../../schemas/vehicle/vehicle.schema';

@Injectable()
export class VehiclesService extends ICrudService<Vehicle, CreateVehicleDto, string> {
  async create(createVehicleDto: CreateVehicleDto, owner: string): Promise<{ vehicleId: string }> {
    let result;
    try {
      const newVehicle = new this.vehicleModel({
        ...createVehicleDto,
        owner
      });
      result = await newVehicle.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    if (result) {
      try {
        await this.userModel.findByIdAndUpdate(
          { _id: owner },
          { $push: { vehicles: result._id } },
          { new: true }
        );
      } catch (error) {
        throw new HttpException(error, HttpStatus.FORBIDDEN);
      }
    }

    return { vehicleId: result._id };
  }
  async delete(vehicleId: string, userId: string): Promise<void> {
    try {
      const availibility = (await this.vehicleModel.findById(vehicleId).exec()).avalibility;
      if (availibility.length) {
        availibility.forEach(async (id) => {
          const reservation = await this.reservationModel.findById(id).exec();
          await this.userModel.findByIdAndUpdate(
            reservation.user,
            { $pull: { reservations: id } },
            { new: true }
          );
          await this.userModel.findByIdAndUpdate(
            reservation.host,
            { $pull: { reservations: id } },
            { new: true }
          );
          await this.reservationModel.findByIdAndDelete(id);
        });
      }
      await this.userModel.findByIdAndUpdate(
        userId,
        { $pull: { vehicles: new Types.ObjectId(vehicleId) } },
        { new: true }
      );
      await this.vehicleModel.findByIdAndDelete(vehicleId);
    } catch (error) {
      throw new NotFoundException('Vehicle not exist or be already removed');
    }
  }

  async update(vehicleId: string, updateVehicle: Partial<CreateVehicleDto>): Promise<Vehicle> {
    const id = new Types.ObjectId(vehicleId);
    const isVehicleExists = await this.vehicleModel.findById(vehicleId).exec();
    const isUserHasVehicle = await this.userModel
      .findOne({
        vehicles: { $in: [id] }
      })
      .exec();

    let vehicle;

    if (!isVehicleExists) {
      throw new NotFoundException('Vehicle selected to update is not exist');
    }

    try {
      if (isVehicleExists && !isUserHasVehicle) {
        throw new NotFoundException('Cannot find user vehicle');
      }

      await this.vehicleModel.findByIdAndUpdate(vehicleId, {
        $set: { ...updateVehicle }
      });
      vehicle = this.vehicleModel.findById(vehicleId).exec();
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }

    return vehicle as Vehicle;
  }

  //Search Vehicle Actions
  async findAll(): Promise<Vehicle[]> {
    let vehicles;

    try {
      vehicles = await this.vehicleModel.find().exec();
    } catch (error) {
      throw new NotFoundException(`Cannot find any vehicles`);
    }

    return vehicles;
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleModel
      .findById(id)
      .populate({ path: 'owner', select: ['firstName', 'lastName', 'id', 'email'] })
      .exec();

    if (!vehicle) {
      throw new NotFoundException(`Cannot find vehicle of id: ${id}`);
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
