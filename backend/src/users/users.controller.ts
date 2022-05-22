import { Controller, UseGuards, Post, Body, Get } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('account')
  async createUser(
    @Body('email') email: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('password') password: string
  ) {
    await this.usersService.addUser(email, firstName, lastName, password);
  }
}
