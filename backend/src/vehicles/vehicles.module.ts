import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleSchema } from 'src/models/vehicle.model';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Vehicle', schema: VehicleSchema }])],
  providers: [VehiclesService],
  exports: [VehiclesService]
})
export class VehiclesModule {}
