import { Controller, UseGuards, Post, Get, Request, Response } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller()
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/register')
  async register(@Request() req) {
    await this.authService.register(req.body);
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
}
