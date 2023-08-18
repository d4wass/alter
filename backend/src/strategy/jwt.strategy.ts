import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserDocument } from '../schemas/users/users.schema';
import { UsersService } from '../services/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      ignoreExpiration: false,
      expiresIn: configService.get<string>('JWT_EXPIRATION_TIME')
    });
  }

  async validate(payload: UserDocument) {
    return this.userService.findOne(payload.id);
  }
}
