import { Controller, Get, Param, Query } from '@nestjs/common';
import { VehiclesService } from 'src/services/vehicles/vehicles.service';

@Controller('search')
export class SearchController {
  constructor(private readonly vehicleService: VehiclesService) {}

  @Get('/:brand')
  async getVehiclesByBrand(@Param('brand') param: string) {
    const vehiclesByBrand = await this.vehicleService.getVehiclesByBrand(param);
    return vehiclesByBrand;
  }

  @Get()
  async getVehiclesByQuery(@Query() query) {
    const vehiclesByQuery = await this.vehicleService.findByQuery(query);
    return vehiclesByQuery;
  }
}
