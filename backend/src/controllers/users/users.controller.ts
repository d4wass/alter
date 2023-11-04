import {
  Controller,
  UseGuards,
  Post,
  Get,
  Request,
  Put,
  UsePipes,
  Body,
  Req,
  Delete
} from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { AuthService } from '../../services/auth/auth.service';
import { CreateUserDto, UpdateUserDto } from 'src/models/users/user.dto';
import { CustomValidationPipe } from '../../pipes/custom-validation.pipe';

@Controller()
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @Post('register')
  @UsePipes(new CustomValidationPipe('User validation failed'))
  async register(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
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
  async getProfile(@Request() { user }) {
    const userId = user._id.toString();
    return this.userService.findOne(userId);
  }
  //leave this endpoint for action of getting data to display info about user for other user perspective
  @Get('user')
  async getUser(@Request() req) {
    return this.userService.findOne(req.body.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('user')
  async deleteUser(@Req() { user }: any) {
    const id = user._id.toString();
    return this.userService.delete(id);
  }
}
