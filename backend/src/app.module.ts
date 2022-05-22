import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { VehiclesController } from './vehicles/vehicles.controller';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    VehiclesModule,
    MongooseModule.forRoot(
      'mongodb+srv://damian:mm6uoLF17ZprMlMp@cluster0.xnysy.mongodb.net/Alter?retryWrites=true&w=majority'
    )
  ],
  controllers: [AppController, UsersController, VehiclesController],
  providers: [AppService]
})
export class AppModule {}
