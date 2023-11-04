import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMiddleware } from 'src/middleware/user/user.middleware';
import { Reservation, ReservationSchema } from 'src/schemas/reservation/reservation.schema';
import { Vehicle, VehicleSchema } from 'src/schemas/vehicle/vehicle.schema';
import { User, UserSchema } from '../../schemas/users/users.schema';
import { UsersService } from '../../services/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Vehicle.name, schema: VehicleSchema },
      { name: Reservation.name, schema: ReservationSchema }
    ])
  ],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes({ path: 'register', method: RequestMethod.POST });
  }
}
