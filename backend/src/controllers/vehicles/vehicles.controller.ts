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
  Req,
  Put
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CustomValidationPipe } from '../../pipes/custom-validation.pipe';
import { CreateVehicleDto } from '../../services/vehicles/dto/vehicle.dto';
import { VehiclesService } from '../../services/vehicles/vehicles.service';

@Controller()
export class VehiclesController {
  constructor(private readonly vehicleService: VehiclesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('vehicles')
  @UsePipes(new CustomValidationPipe('Vehicle validation failed'))
  async addVehicle(@Body() vehicle: CreateVehicleDto, @Req() { user }: any) {
    const userId = user._id.toString();
    const newVehicle = await this.vehicleService.create(vehicle, userId);

    return newVehicle;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('vehicles/:id')
  async removeVehicle(@Param() { id }, @Req() { user }: any) {
    const userId = user._id.toString();
    await this.vehicleService.delete(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('vehicles/:id')
  async updateVehicle(@Param() { id }, @Body() body) {
    const updatedVehicle = await this.vehicleService.update(id, body);
    return updatedVehicle;
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
