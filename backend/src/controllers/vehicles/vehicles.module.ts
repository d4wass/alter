import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from 'src/schemas/reservation/reservation.schema';
import { User, UserSchema } from 'src/schemas/users/users.schema';
import { Vehicle, VehicleSchema } from '../../schemas/vehicle/vehicle.schema';
import { VehiclesService } from '../../services/vehicles/vehicles.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vehicle.name, schema: VehicleSchema },
      { name: User.name, schema: UserSchema },
      { name: Reservation.name, schema: ReservationSchema }
    ]),
    UsersModule
  ],
  providers: [VehiclesService],
  exports: [VehiclesService]
})
export class VehiclesModule {}
