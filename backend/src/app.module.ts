import { Inject, Module } from '@nestjs/common';
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
import { SearchController } from './controllers/search/search.controller';
import { SearchModule } from './controllers/search/search.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    VehiclesModule,
    MongooseModule.forRoot(process.env.DATABASE_URI),
    ReservationModule,
    SearchModule
  ],
  controllers: [UsersController, VehiclesController, ReservationController, SearchController],
  providers: [HttpExceptionValidationFilter, { provide: APP_GUARD, useClass: RolesGuard }]
})
export class AppModule {
  @Inject(ConfigService)
  public config: ConfigService;
}
