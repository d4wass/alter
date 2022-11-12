import { Controller, Get, Param, Post, Query, UseGuards, Request } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { VehiclesService } from './vehicles.service';

@Controller()
export class VehiclesController {
  constructor(
    private readonly vehicleService: VehiclesService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('host/addVehicle')
  async addVehicle(@Request() req) {
    //TODO:
    //add guard that prevents from adding vehicle when user is not login
    //add guard that prevents from adding vehicle when user is not host
    //add update user document when user add a vehicle
    const userId = this.authService.getUserIdFromToken(req.headers.authorization);
    const isHost = await this.usersService.checkIsHost(userId);

    // if (isHost) {
    const vehicleId = await this.vehicleService.addVehicle({ owner: userId, ...req.body });
    await this.usersService.updateUserVehicles(userId, vehicleId);
    // }
  }

  @Get('search/:brand')
  async getVehiclesByBrand(@Param('brand') param: string) {
    const formattedParam = this.vehicleService.stringFormatter(param);
    const vehiclesByBrand = await this.vehicleService.getVehiclesByBrand(formattedParam);
    return vehiclesByBrand;
  }

  @Get('search')
  async getVehiclesByQuery(@Query() query) {
    console.log(query);
    const vehiclesByQuery = await this.vehicleService.getVehiclesByQuery(query);
    return vehiclesByQuery;
  }

  @Get('vehicles')
  async getAllVehicles() {
    const vehicles = await this.vehicleService.getAllVehicles();
    return vehicles;
  }

  @Get('vehicle/:id')
  async getVehicleById(@Param('id') id: string) {
    const vehicle = await this.vehicleService.getVehicleById(id);
    return vehicle;
  }
}
