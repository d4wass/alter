import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDataToUpdate } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/schemas/users/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async create(userData: User): Promise<string> {
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

    return user.id;
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
    const updateUser = await this.updateUserConverter(dataRequest);

    let update;
    let user;

    try {
      update = await this.userModel.findByIdAndUpdate(userId, { $set: { ...updateUser } });
    } catch (error) {
      throw new NotFoundException('User Not Found');
    }

    if (!update) {
      throw new NotFoundException('Cannot find user');
    }

    return user as User;
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

  async checkIsHost(id: string): Promise<boolean> {
    return (await this.userModel.findById(id)).isHost;
  }

  private async isUserExist(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });

    return user ? true : false;
  }

  private async updateUserConverter(updatedData: UserDataToUpdate) {
    const { emailUpdate, passwordUpdate, descriptionUpdate, mobileUpdate } = updatedData;
    const data = {
      email: emailUpdate,
      password: passwordUpdate.newValue ? await this.hashPassword(passwordUpdate?.newValue) : '',
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
