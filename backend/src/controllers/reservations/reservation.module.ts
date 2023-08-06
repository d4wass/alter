import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from 'src/schemas/reservation/reservation.schema';
import { ReservationService } from '../../services/reservation/reservation.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }])],
  providers: [ReservationService],
  exports: [ReservationService]
})
export class ReservationModule {}
