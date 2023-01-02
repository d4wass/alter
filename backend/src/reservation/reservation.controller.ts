import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReservationDto } from 'src/models/reservation.model';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('/create-reservation')
  async addReservation(@Body('reservation') reservation: ReservationDto) {
    const createdReservation = await this.reservationService.create(reservation);
    return createdReservation;
  }

  @Get('/confirm-reservation/:id')
  async confirmReservation(@Param('id') reservationId: string) {
    const reservation = this.reservationService.findOne(reservationId);
    return reservation;
  }
}
