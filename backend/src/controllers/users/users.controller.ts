import { Controller, UseGuards, Post, Get, Request, Put } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { AuthService } from '../../services/auth/auth.service';

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
  async getProfile(@Request() req) {
    const userId = this.authService.getUserIdFromToken(req.headers.authorization);
    return this.userService.getUserById(userId);
  }

  @Get('user')
  async getUser(@Request() req) {
    return this.userService.getUserById(req.body.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateUser(@Request() req) {
    const userId = this.authService.getUserIdFromToken(req.headers.authorization);
    const updatedUser = await this.userService.updateUserCredentials(req.body, userId);

    return {
      user: updatedUser,
      token: req.headers.authorization.replace('Bearer ', '')
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('validate')
  async validateUserCredentials(@Request() req) {
    return this.authService.validateDataToUpdateUser(req.headers.authorization, req.body);
  }
}