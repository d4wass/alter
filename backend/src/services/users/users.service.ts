import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../../schemas/users/users.schema';
import { CreateUserDto, UpdateUserDto, UserDto } from '../../models/users/user.dto';
import { ICrud } from 'interface/crud.interface';
import { VehicleModel } from 'src/models/vehicles/vehicle.model';
import { Vehicle } from 'src/schemas/vehicle/vehicle.schema';
import { Reservation } from 'src/schemas/reservation/reservation.schema';
import { ReservationModel } from 'src/models/reservations/reservation.model';

@Injectable()
export class UsersService implements ICrud<User, UserDto, string> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Vehicle.name) private readonly vehicleModel: Model<VehicleModel>,
    @InjectModel(Reservation.name) private readonly reservationModel: Model<ReservationModel>
  ) {}

  async delete(id: string): Promise<void> {
    try {
      await this.userModel.findByIdAndDelete(id);
      await this.vehicleModel.deleteMany({ owner: id });
      //TODO: delete all reservation related to removed user
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  async create(userData: CreateUserDto): Promise<User> {
    let user;
    const { email, firstName, lastName, password } = userData;
    const hashedPassword = await this.hashPassword(password);
    const isUser = await this.isUserExist(email);

    if (!isUser) {
      const newUser = new this.userModel({
        email,
        firstName,
        lastName,
        password: hashedPassword
      });
      user = await newUser.save();
    } else {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return user as User;
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedField = {};
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException('Cannot find user');
    }

    for (const key in updateUserDto) {
      if (updateUserDto.hasOwnProperty(key) && user[key] !== updateUserDto[key]) {
        updatedField[key] = updateUserDto[key];
      }
    }

    if (Object.keys(updatedField).length > 0) {
      await this.userModel.findByIdAndUpdate(userId, { $set: updatedField }).exec();
      return this.userModel.findById(userId).exec();
    }

    return user as User;
  }

  async findOne(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(`Cannot find user with ${id}`);
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<UserDocument | undefined> {
    let user;
    try {
      user = await this.userModel.findOne({ email }).exec();
    } catch (error) {
      throw new NotFoundException('Cannot find user');
    }

    if (!user) {
      throw new NotFoundException('Cannot find user');
    }
    return user as UserDocument;
  }

  private async isUserExist(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });

    return user ? true : false;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }
}
