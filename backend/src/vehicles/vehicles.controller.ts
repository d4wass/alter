import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Avalibility } from 'src/schemas/vehicle/avalibility.schema';
import { Extras, Feature, Specification } from '../models/vehicle.model';
import { VehiclesService } from './vehicles.service';

@Controller()
export class VehiclesController {
  constructor(private readonly vehicleService: VehiclesService) {}

  @Post('host/addVehicle')
  async addVehicle(
    @Body('brand') brand: string,
    @Body('model') model: string,
    @Body('place') place: string,
    @Body('price') price: number,
    @Body('specification') specification: Specification,
    @Body('features') features: Feature,
    @Body('extras') extras: Extras[],
    @Body('description') description: string,
    @Body('isCancelFree') isCancelFree: boolean,
    @Body('avalibility') avalibility: Avalibility[]
  ) {
    //add guard that prevents from adding vehicle when user is host and is login
    await this.vehicleService.addVehicle({
      brand,
      model,
      place,
      price,
      specification,
      features,
      extras,
      description,
      isCancelFree,
      avalibility
    });
  }

  @Get('search/:brand')
  async getVehiclesByBrand(@Param('brand') param: string) {
    const formattedParam = this.vehicleService.stringFormatter(param);
    const vehiclesByBrand = await this.vehicleService.getVehiclesByBrand(formattedParam);
    return vehiclesByBrand;
  }

  @Get('search')
  async getVehiclesByQuery(@Query() query) {
    const vehiclesByQuery = await this.vehicleService.getVehiclesByQuery(query);
    return vehiclesByQuery;
  }

  @Get('vehicles')
  async getAllVehicles() {
    const vehicles = await this.vehicleService.getAllVehicles();
    return vehicles;
  }
}
