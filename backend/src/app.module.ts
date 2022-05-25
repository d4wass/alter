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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    VehiclesModule,
    MongooseModule.forRoot(process.env.DATABASE_URI)
  ],
  controllers: [AppController, UsersController, VehiclesController],
  providers: [AppService]
})
export class AppModule {
  @Inject(ConfigService)
  public config: ConfigService;
}
