import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from '../../schemas/vehicle/vehicle.schema';
import { VehiclesService } from '../../services/vehicles/vehicles.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }]),
    UsersModule
  ],
  providers: [VehiclesService],
  exports: [VehiclesService]
})
export class VehiclesModule {}
