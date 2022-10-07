import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async register(userData: User): Promise<any> {
    const user = await this.usersService.create(userData);
    return user;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(credentials: { email: string; password: string }): Promise<{ access_token: string }> {
    const user = await this.usersService.getUserByEmail(credentials.email);
    const { id, firstName, lastName, email } = user;

    return {
      access_token: this.jwtService.sign({ id, firstName, lastName, email })
    };
  }

  async validatePassword(
    token: string,
    password: { oldValue: string; newValue: string; confirmValue: string }
  ): Promise<{ isValid: boolean }> {
    const tokenizedUser = this.jwtService.decode(token.replace('Bearer ', ''), {
      complete: true,
      json: true
    }) as any;
    const user = await this.usersService.getUserById(tokenizedUser.payload.id);
    console.log('USER', user);
    console.log('Password 2', password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('IS MATCH', isMatch);

    return { isValid: isMatch };
  }
}
