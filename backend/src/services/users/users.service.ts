import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../../schemas/users/users.schema';
import { CreateUserDto, UpdateUserDto, UserDto } from '../../models/users/user.dto';
import { ICrudService } from 'interface/crud.interface';

@Injectable()
export class UsersService extends ICrudService<User, UserDto, string> {
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
    const updatedFields = {};
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException('Cannot find user');
    }

    for (const key in updateUserDto) {
      if (updateUserDto.hasOwnProperty(key) && user[key] !== updateUserDto[key]) {
        updatedFields[key] = updateUserDto[key];
      }
    }

    if (Object.keys(updatedFields).length > 0) {
      await this.userModel.findByIdAndUpdate(userId, { $set: updatedFields }).exec();
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
