import {
  Controller,
  UseGuards,
  Post,
  Get,
  Request,
  Put,
  UsePipes,
  Body,
  Req
} from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { AuthService } from '../../services/auth/auth.service';
import { CreateUserDto, UpdateUserDto } from 'src/services/users/dto/user.dto';
import { CustomValidationPipe } from '../../pipes/custom-validation.pipe';

@Controller()
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @Post('auth/register')
  @UsePipes(new CustomValidationPipe('User validation failed'))
  async register(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomValidationPipe('User validation failed'))
  @Put('update')
  async updateUser(@Body() updateUser: UpdateUserDto, @Req() { user }) {
    const userId = user._id.toString();
    const updatedUser = await this.userService.update(userId, updateUser);

    return updatedUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const userId = this.authService.getUserIdFromToken(req.headers.authorization);
    return this.userService.findOne(userId);
  }

  @Get('user')
  async getUser(@Request() req) {
    return this.userService.findOne(req.body.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('validate')
  async validateUserCredentials(@Request() req) {
    return this.authService.validateDataToUpdateUser(req.headers.authorization, req.body);
  }
}
