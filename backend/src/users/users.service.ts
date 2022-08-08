import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(userData: User): Promise<Partial<User>> {
    let user;
    const { email, firstName, lastName, password } = userData;
    const hashedPassword = await this.hashPassword(password);
    const isUser = await this.isUserExist(email);

    if (!isUser) {
      const newUser = new this.userModel({
        email,
        firstName,
        lastName,
        password: hashedPassword,
        description: '',
        profilePhoto: '',
        reviews: []
      });
      await newUser.save();
      user = { id: newUser.id, email: newUser.email };
    } else {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return user as Partial<User>;
  }

  async getUser(email: string): Promise<User | undefined> {
    let user;
    try {
      user = await this.userModel.findOne({ email }).exec();
    } catch (error) {
      throw new NotFoundException('Cannot find user');
    }

    if (!user) {
      throw new NotFoundException('Cannot find user');
    }
    return user as User;
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

    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: id
    } as User;
  }

  async updateUser(dataRequest: {
    id: string;
    firstName: string;
    lastName: string;
  }): Promise<unknown> {
    const { id, firstName, lastName } = dataRequest;

    let update;
    try {
      update = await this.userModel.findOneAndUpdate(
        { id },
        { firstName, lastName },
        { new: true }
      );
    } catch (error) {
      throw new NotFoundException('User Not Found');
    }

    if (!update) {
      throw new NotFoundException('Cannot find user');
    }
    return update as User;
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
