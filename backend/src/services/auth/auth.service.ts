import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/schemas/users/users.schema';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}
  async validateUser(email: string, password: string): Promise<Partial<UserDocument>> {
    const user = await this.usersService.getUserByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(credentials: { email: string; password: string }): Promise<{ access_token: string }> {
    try {
      const user = await this.usersService.getUserByEmail(credentials.email);
      const { id, firstName, lastName, email } = user;

      return {
        access_token: this.jwtService.sign({ id, firstName, lastName, email })
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
