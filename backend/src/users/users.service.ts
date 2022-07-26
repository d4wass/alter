import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import { from, iif, Observable, of } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(userData: User): Promise<void> {
    const { email, firstName, lastName, password } = userData;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const isUser = await this.isUserExist(email);

    console.log('create user', isUser);
    if (!isUser) {
      const newUser = new this.userModel({ email, firstName, lastName, password: hashedPassword });
      await newUser.save();
    } else {
      console.log('User is already exists');
    }
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

  private async isUserExist(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    const isUser = user ? true : false;

    return isUser;
  }
}
