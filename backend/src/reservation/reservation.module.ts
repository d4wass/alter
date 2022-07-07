import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationSchema } from 'src/models/reservation.model';
import { ReservationService } from './reservation.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Reservation', schema: ReservationSchema }])],
  providers: [ReservationService],
  exports: [ReservationService]
})
export class ReservationModule {}
