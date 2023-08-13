import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/schemas/users/users.schema';
import { UserDataToValidate } from '../../models/user.model';

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

  async validateDataToUpdateUser(
    token: string,
    data: { updatedData: UserDataToValidate }
  ): Promise<{ isPasswordValid: boolean; isMobileValid: boolean }> {
    const userFromToken = this.detokenizeUser(token);
    const { confirmValue } = data.updatedData.passwordUpdate;
    const { confirmValue: confirmMobileValue } = data.updatedData.mobileUpdate;

    const user = await this.usersService.getUserById(userFromToken.payload.id);

    const isPasswordMatch = await bcrypt.compare(confirmValue, user.password);
    const isMobileMatch = user.mobile === confirmMobileValue;

    return { isPasswordValid: isPasswordMatch, isMobileValid: isMobileMatch };
  }

  getUserIdFromToken(token: string): string {
    const tokenizedUser = this.jwtService.decode(token.replace('Bearer ', ''), {
      complete: true,
      json: true
    }) as any;

    return tokenizedUser.payload.id;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  private detokenizeUser(token: string) {
    const tokenizedUser = this.jwtService.decode(token.replace('Bearer ', ''), {
      complete: true,
      json: true
    }) as any;

    return tokenizedUser;
  }
}
