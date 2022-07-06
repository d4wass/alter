import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async register(userData: User): Promise<any> {
    return await this.usersService.create(userData);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(email);
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { name: user.email, sub: user._id.toString() };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
