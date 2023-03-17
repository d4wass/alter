import { Controller, Get, Param, Post, Query, UseGuards, Request, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { VehiclesService } from './vehicles.service';

@Controller()
export class VehiclesController {
  constructor(
    private readonly vehicleService: VehiclesService,
    private readonly usersService: UsersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('host/addVehicle')
  async addVehicle(@Request() req) {
    const { userId, vehicle } = req.body;

    const addedVehicle = await this.vehicleService.create(vehicle, userId);
    const { vehicleId } = addedVehicle;

    await this.usersService.updateUserVehicles(userId, vehicleId);

    return vehicleId;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('host/removeVehicle')
  async removeVehicle(@Request() req) {
    const { userId, vehicleId } = req.body;
    await this.usersService.deleteUserVehicle(userId, vehicleId);
    await this.vehicleService.delete(vehicleId);

    // return removedVehicleFromUser;
  }

  @Get('search/:brand')
  async getVehiclesByBrand(@Param('brand') param: string) {
    const vehiclesByBrand = await this.vehicleService.getVehiclesByBrand(param);
    return vehiclesByBrand;
  }

  @Get('search')
  async getVehiclesByQuery(@Query() query) {
    const vehiclesByQuery = await this.vehicleService.findByQuery(query);
    return vehiclesByQuery;
  }

  @Get('vehicles')
  async getAllVehicles() {
    const vehicles = await this.vehicleService.findAll();
    return vehicles;
  }

  @Get('vehicle/:id')
  async getVehicleById(@Param('id') id: string) {
    const vehicle = await this.vehicleService.findOne(id);
    return vehicle;
  }
}
