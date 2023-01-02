import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from 'src/schemas/vehicle/vehicle.schema';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }])],
  providers: [VehiclesService],
  exports: [VehiclesService]
})
export class VehiclesModule {}
