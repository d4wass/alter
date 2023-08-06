import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './controllers/users/users.controller';
import { VehiclesController } from './controllers/vehicles/vehicles.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpExceptionValidationFilter } from './filters/http-exception.filter';
import { ReservationController } from './controllers/reservations/reservation.controller';
import { ReservationModule } from './controllers/reservations/reservation.module';
import { UsersModule } from './controllers/users/users.module';
import { VehiclesModule } from './controllers/vehicles/vehicles.module';
import { AuthModule } from './services/auth/auth.module';

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
  providers: [AppService, HttpExceptionValidationFilter]
})
export class AppModule {
  @Inject(ConfigService)
  public config: ConfigService;
}
