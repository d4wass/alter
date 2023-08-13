import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  Delete,
  Body,
  UsePipes,
  Req
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CreateVehicleValidationPipe } from '../../pipes/vehicle-validation.pipe';
import { CreateVehicleDto } from '../../services/vehicles/dto/vehicle.dto';
import { VehiclesService } from '../../services/vehicles/vehicles.service';

@Controller()
export class VehiclesController {
  constructor(private readonly vehicleService: VehiclesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('host/addVehicle')
  @UsePipes(new CreateVehicleValidationPipe())
  async addVehicle(@Body() vehicle: CreateVehicleDto, @Req() { user }: any) {
    const userId = user._id.toString();
    const addedVehicle = await this.vehicleService.create(vehicle, userId);
    const { vehicleId } = addedVehicle;

    return { vehicleId };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('host/removeVehicle/:id')
  async removeVehicle(@Param() { id }, @Req() { user }: any) {
    const userId = user._id.toString();
    await this.vehicleService.delete(id, userId);
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
