import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error as MongooseError, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../../schemas/users/users.schema';
import { UserDto, UserDataToUpdate } from '../../models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async create(userData: UserDto): Promise<string | undefined> {
    let user;
    const { email, firstName, lastName, password } = userData;
    const hashedPassword = await this.hashPassword(password);
    const isUser = await this.isUserExist(email);

    try {
      if (!isUser) {
        const newUser = new this.userModel({
          email,
          firstName,
          lastName,
          password: hashedPassword
        });
        user = await newUser.save();
      }
    } catch (error) {
      if (isUser) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      throw new Error(error);
    }

    if (user) {
      return user._id;
    } else {
      return undefined;
    }
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

  async getUserById(id: string): Promise<User | undefined> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Cannot find user');
    }
    if (!user) {
      throw new NotFoundException('Cannot find user');
    }
    return user as User;
  }

  async updateUserCredentials(dataRequest: UserDataToUpdate, userId: string): Promise<User> {
    let updatedUser;

    try {
      const updateUser = await this.updateUserConverter(dataRequest);
      updatedUser = await this.userModel.findByIdAndUpdate(userId, { $set: { ...updateUser } });

      return updatedUser as User;
    } catch (error) {
      console.log(error);
      if (error) throw new NotFoundException('User Not Found');

      if (!updatedUser) {
        throw new NotFoundException('Cannot find user');
      }
    }
  }

  async updateUserVehicles(id: string, vehicle: string): Promise<UserDocument> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
      await this.userModel.findByIdAndUpdate(
        { _id: id },
        { vehicles: [...user.vehicles, vehicle] }
      );
    } catch (error) {
      throw new Error('Cannot update user vehicle');
    }
    return user as UserDocument;
  }

  async deleteUserVehicle(id: string, vehicleId: string): Promise<void> {
    let user: UserDocument;
    try {
      await this.userModel
        .findByIdAndUpdate({ _id: id }, { $pull: { vehicles: { id: vehicleId } } })
        .exec();
      user = await this.userModel.findById(id).exec();
      // user.vehicles.filter((_id) => _id !== vehicleId);
    } catch (error) {
      console.log(error);
      throw new Error('Cannot remove user vehicle');
    }
    console.log(vehicleId);
    console.log(user);
  }

  async updateUserReservation(id: string, reservationId: string): Promise<UserDocument> {
    let user;
    console.log('reservation user service');
    try {
      user = await this.userModel.findById(id).exec();

      if (!user.reservation.includes(reservationId)) {
        await this.userModel.findByIdAndUpdate(id, {
          reservation: [...user.reservation, reservationId]
        });
      }
    } catch (error) {
      throw new Error('Cannot update user reservation');
    }

    return user as UserDocument;
  }

  async deleteUserReservation(userId: string, reservationId: string): Promise<void> {
    let user;
    try {
      await this.userModel.updateOne(
        { _id: userId },
        {
          $pull: {
            reservation: [reservationId]
          }
        }
      );
      user = await this.userModel.findById(userId).exec();
    } catch (error) {
      console.log('user error');
      throw new Error(error);
    }
    console.log(user);
  }

  async deleteHostReservation(hostId: string, reservationId: string): Promise<void> {
    let user;
    try {
      await this.userModel.updateOne(
        { _id: hostId },
        {
          $pull: {
            reservation: [reservationId]
          }
        }
      );
      user = await this.userModel.findById(hostId).exec();
    } catch (error) {
      console.log('host error');
      throw new Error(error);
    }
    console.log(user);
  }

  private async isUserExist(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });

    return user ? true : false;
  }

  private async updateUserConverter(updatedData: UserDataToUpdate) {
    const { emailUpdate, passwordUpdate, descriptionUpdate, mobileUpdate } = updatedData;

    const data = {
      email: emailUpdate,
      password: !!passwordUpdate.newValue ? await this.hashPassword(passwordUpdate?.newValue) : '',
      description: descriptionUpdate,
      mobile: mobileUpdate.newValue
    };

    const filteredData = Object.fromEntries(Object.entries(data).filter((value) => value[1]));

    return filteredData;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }
}
