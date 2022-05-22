import { Body, Controller, Post } from '@nestjs/common';
import { Extras, Feature, Review, Specification } from '../models/vehicle.model';
import { VehiclesService } from './vehicles.service';

@Controller()
export class VehiclesController {
  constructor(private readonly vehicleService: VehiclesService) {}

  @Post('host/addVehicle')
  async addVehicle(
    @Body('brand') brand: string,
    @Body('model') model: string,
    @Body('place') place: string,
    @Body('specification') specification: Specification,
    @Body('features') features: Feature,
    @Body('rewievs') rewievs: Review[],
    @Body('extras') extras: Extras[],
    @Body('description') description: string,
    @Body('isCancelFree') isCancelFree: boolean,
    @Body('isBooked') isBooked: boolean
  ) {
    //add guard that prevents from adding vehicle when user is host and is login
    await this.vehicleService.addVehicle({
      brand,
      model,
      place,
      specification,
      features,
      rewievs,
      extras,
      description,
      isCancelFree,
      isBooked
    });
  }
}
