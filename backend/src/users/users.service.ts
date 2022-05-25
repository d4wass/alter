import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async addUser(email: string, lastName: string, firstName: string, password: string) {
    const newUser = new this.userModel({ email, lastName, firstName, password });
    const result = await newUser.save();

    return result.id as string;
  }

  async getUser(email: string): Promise<User | undefined> {
    // console.log(email);
    let user;
    try {
      user = await this.userModel.findOne({ email });
    } catch (error) {
      throw new NotFoundException('Cannot find user');
    }

    if (!user) {
      throw new NotFoundException('Cannot find user');
    }
    // console.log(user);
    return user as User;
  }
}
