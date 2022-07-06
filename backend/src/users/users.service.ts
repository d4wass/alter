import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(userData: User): Promise<void> {
    const { email, firstName, lastName, password } = userData;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new this.userModel({ email, firstName, lastName, password: hashedPassword });

    await newUser.save();
  }

  async getUser(email: string): Promise<User | undefined> {
    let user;
    try {
      user = await this.userModel.findOne({ email });
    } catch (error) {
      throw new NotFoundException('Cannot find user');
    }

    if (!user) {
      throw new NotFoundException('Cannot find user');
    }
    return user as User;
  }
}
