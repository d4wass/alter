import { Body, Controller, Get, Param, Post, Query, UseGuards, Request } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Avalibility } from 'src/schemas/vehicle/avalibility.schema';
import { Review } from 'src/schemas/vehicle/review.schema';
import { UsersService } from 'src/users/users.service';
import { Extras, Feature, Specification } from '../models/vehicle.model';
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
  async addVehicle(
    @Request() req
    // @Body('owner') owner: any,
    // @Body('brand') brand: string,
    // @Body('model') model: string,
    // @Body('place') place: string,
    // @Body('price') price: number,
    // @Body('specification') specification: Specification,
    // @Body('features') features: Feature,
    // @Body('extras') extras: Extras[],
    // @Body('description') description: string,
    // @Body('isCancelFree') isCancelFree: boolean,
    // @Body('avalibility') avalibility: Avalibility[],
    // @Body('reviews') reviews: Review[]
  ) {
    //TODO:
    //add guard that prevents from adding vehicle when user is not login
    //add guard that prevents from adding vehicle when user is not host
    //add update user document when user add a vehicle
    const userId = this.authService.getUserIdFromToken(req.headers.authorization);
    const isHost = await this.usersService.checkIsHost(userId);

    if (isHost) {
      await this.vehicleService.addVehicle(req.body);
    }
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
