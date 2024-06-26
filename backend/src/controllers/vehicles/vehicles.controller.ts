import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Delete,
  Body,
  UsePipes,
  Req,
  Put
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CustomValidationPipe } from '../../pipes/custom-validation.pipe';
import { CreateVehicleDto } from '../../models/vehicles/vehicle.dto';
import { VehiclesService } from '../../services/vehicles/vehicles.service';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/models/auth/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehicleService: VehiclesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles(RolesEnum.User)
  @UsePipes(new CustomValidationPipe('Vehicle validation failed'))
  async addVehicle(@Body() vehicle: CreateVehicleDto, @Req() { user }: any) {
    const userId = user._id.toString();
    const newVehicle = await this.vehicleService.create(vehicle, userId);

    return newVehicle;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async removeVehicle(@Param() { id }, @Req() { user }: any) {
    const userId = user._id.toString();
    await this.vehicleService.delete(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateVehicle(@Param() { id }, @Body() body) {
    const updatedVehicle = await this.vehicleService.update(id, body);
    return updatedVehicle;
  }

  @Get()
  async getAllVehicles() {
    const vehicles = await this.vehicleService.findAll();
    return vehicles;
  }

  @Get('brands')
  async getBrands() {
    const brands = await this.vehicleService.getVehiclesBrands();
    return brands;
  }

  @Get('/:id')
  async getVehicleById(@Param('id') id: string) {
    const vehicle = await this.vehicleService.findOne(id);
    return vehicle;
  }

  @Get('/:model')
  async getVehiclesByModel(@Param('model') model: string) {
    const vehicles = await this.vehicleService.getVehiclesByModel(model);
    return vehicles;
  }
}
