import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from '../../schemas/users/users.schema';
import { CreateUserDto, UpdateUserDto, UserDto } from '../../models/users/user.dto';
import { ICrudService } from 'src/interface/crud.interface';
import { hashPassword } from 'src/helper/password-hash';
import { Types } from 'mongoose';

@Injectable()
export class UsersService extends ICrudService<User, UserDto, string> {
  async delete(id: string): Promise<void> {
    try {
      const reservationsIdsAsUser = await this.reservationOfUser(id, 'user');
      const reservationsIdsAsHost = await this.reservationOfUser(id, 'host');

      if (reservationsIdsAsUser.length) {
        await this.removeUserFromReferencesDocs(reservationsIdsAsUser, 'host');
      }
      if (reservationsIdsAsHost.length) {
        await this.removeUserFromReferencesDocs(reservationsIdsAsHost, 'user');
      }

      await this.vehicleModel.deleteMany({ owner: id });
      await this.reservationModel.deleteMany({ user: id });
      await this.reservationModel.deleteMany({ host: id });
      await this.userModel.findByIdAndDelete(id);
    } catch (error) {
      throw new ForbiddenException('Cannot remove user');
    }
  }

  async create(userData: CreateUserDto): Promise<User> {
    const { email, firstName, lastName, password } = userData;
    const hashedPassword = await hashPassword(password);
    const newUser = new this.userModel({
      email,
      firstName,
      lastName,
      password: hashedPassword
    });
    const user = await newUser.save();

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

  private async removeUserFromReferencesDocs(
    reservationsIds: Types.ObjectId[],
    as: string
  ): Promise<void> {
    reservationsIds.forEach(async (reservationId) => {
      const reservation = await this.reservationModel.findById(reservationId).exec();

      await this.userModel.findByIdAndUpdate(
        reservation[as],
        { $pull: { reservations: new Types.ObjectId(reservationId) } },
        { new: true }
      );
      await this.vehicleModel.findByIdAndUpdate(
        reservation.vehicle,
        { $pull: { avalibility: new Types.ObjectId(reservationId) } },
        { new: true }
      );
    });
  }

  private async reservationOfUser(id: string, as: string): Promise<Types.ObjectId[]> {
    const reservationsAsUser = await this.reservationModel
      .find()
      .where({ [as]: { $in: [id] } })
      .exec();
    const reservationIds = reservationsAsUser.map((reservation) => reservation._id);

    return reservationIds;
  }
}
