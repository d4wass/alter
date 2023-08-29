import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ReservationDto } from 'src/models/reservations/reservation.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ReservationService } from '../../services/reservation/reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addReservation(@Body() reservation: ReservationDto) {
    const createdReservation = await this.reservationService.create(reservation);
    return createdReservation;
  }

  @Get('/:id')
  async getReservation(@Param('id') reservationId: string) {
    const reservation = await this.reservationService.findOne(reservationId);
    return reservation;
  }

  @Get()
  async getAllReservations(@Req() { user }: any) {
    const id = user._id.toString();
    const reservations = await this.reservationService.findAll(id);
    return reservations;
  }

  @Put('/confirm-reservation/:id')
  @UseGuards(JwtAuthGuard)
  async confirmReservation(
    @Param('id') reservationId: string,
    @Body('userId') userId: string,
    @Body('hostId') hostId: string
  ) {
    let reservation;
    try {
      reservation = await this.reservationService.findOne(reservationId);
      if (reservation) {
        // await this.usersService.updateUserReservation(userId, reservationId);
        // await this.usersService.updateUserReservation(hostId, reservationId);
      }
    } catch (error) {
      throw new Error('Cannot update user resdervation reservation not exists');
    }

    return reservation;
  }

  @Delete('/:id')
  //TODO: implement here API role
  async cancelReservation(@Param('id') reservationId) {
    return await this.reservationService.delete(reservationId);
    // await this.usersService.deleteUserReservation(userId, reservationId);
    // await this.usersService.deleteHostReservation(hostId, reservationId);
  }
}
