import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Reservation } from 'src/models/reservation.model';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('/create-reservation')
  async addReservation(@Body('reservation') reservation: Reservation) {
    console.log(reservation);
    const createdReservation = await this.reservationService.addReservation(reservation);
    return createdReservation;
  }

  @Get('user/reservations/:id')
  async getReservation(@Param('id') id: string) {
    const reservation = this.reservationService.getReservation(id);
    return reservation;
  }
}
