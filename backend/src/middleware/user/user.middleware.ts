import { HttpException, HttpStatus, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { User } from 'src/schemas/users/users.schema';

export class UserMiddleware implements NestMiddleware {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      if (req.method === 'POST') {
        await this.isUserExist(body.email);
      }

      next();
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  private async isUserExist(email: string) {
    const user = await this.userModel.findOne({ email });
    const isUser = user ? false : true;

    if (!isUser) {
      throw new HttpException('User with this email is already exists', HttpStatus.CONFLICT);
    }
  }
}
