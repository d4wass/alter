import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationMiddleware } from 'src/middleware/reservation.middleware';
import { UpdateReservationMiddleware } from 'src/middleware/update-reservation.middleware';
import { Reservation, ReservationSchema } from 'src/schemas/reservation/reservation.schema';
import { User, UserSchema } from 'src/schemas/users/users.schema';
import { Vehicle, VehicleSchema } from 'src/schemas/vehicle/vehicle.schema';
import { ReservationService } from '../../services/reservation/reservation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
      { name: Vehicle.name, schema: VehicleSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  providers: [ReservationService],
  exports: [ReservationService]
})
export class ReservationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ReservationMiddleware)
      .forRoutes({ path: '/reservation', method: RequestMethod.POST });

    consumer
      .apply(UpdateReservationMiddleware)
      .forRoutes({ path: '/reservation/:id', method: RequestMethod.PUT });
  }
}
