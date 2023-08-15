import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../../schemas/users/users.schema';
import { UserDataToUpdate } from '../../models/user.model';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ICrud } from 'interface/crud.interface';

@Injectable()
export class UsersService implements ICrud<User, CreateUserDto, string, UpdateUserDto> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  delete(id: string, userId: string): Promise<void | User> {
    throw new Error('Method not implemented.');
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

  async update(userId: string, dataRequest: Partial<UpdateUserDto>): Promise<User> {
    let updatedUser;

    try {
      const updateUser = await this.updateUserConverter(dataRequest);
      await this.userModel.findByIdAndUpdate(userId, { $set: { ...updateUser } });
      updatedUser = await this.userModel.findById(userId).exec();
      if (!updatedUser) {
        throw new NotFoundException('Cannot find user');
      }
    } catch (error) {
      if (error) throw new NotFoundException('User Not Found');
    }

    return updatedUser as User;
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

  async updateUserReservation(id: string, reservationId: string): Promise<UserDocument> {
    let user;
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
      throw new Error(error);
    }
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
      throw new Error(error);
    }
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
