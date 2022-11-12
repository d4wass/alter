import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Reservation } from 'src/schemas/reservation/reservation.schema';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('/create-reservation')
  async addReservation(@Body('reservation') reservation: Reservation) {
    console.log(reservation);
    const createdReservation = await this.reservationService.addReservation(reservation);
    console.log('controller', createdReservation);
    return createdReservation;
  }

  @Get('/confirm-reservation/:id')
  async confirmReservation(@Param('id') reservationId: string) {
    const reservation = this.reservationService.getReservation(reservationId);
    return reservation;
  }
}
