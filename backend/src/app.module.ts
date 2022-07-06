import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { VehiclesController } from './vehicles/vehicles.controller';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReservationController } from './reservation/reservation.controller';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    VehiclesModule,
    MongooseModule.forRoot(process.env.DATABASE_URI),
    ReservationModule
  ],
  controllers: [AppController, UsersController, VehiclesController, ReservationController],
  providers: [AppService]
})
export class AppModule {
  @Inject(ConfigService)
  public config: ConfigService;
}
