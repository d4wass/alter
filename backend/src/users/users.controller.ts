import { Controller, UseGuards, Post, Get, Request, Put, Patch, Param } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @Post('auth/register')
  async register(@Request() req) {
    return this.authService.register(req.body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const profile = { ...req.user };
    return profile;
  }

  @Get('user')
  async getUser(@Request() req) {
    console.log(req.body.id);
    return this.userService.getUserById(req.body.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateUser(@Request() req) {
    return this.userService.updateUser(req.body);
  }
}
