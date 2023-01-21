import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ReservationDto } from 'src/models/reservation.model';
import { UsersService } from 'src/users/users.service';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly usersService: UsersService
  ) {}

  @Post('/create-reservation')
  async addReservation(@Body('reservation') reservation: ReservationDto) {
    console.log('ReservationDTO', reservation);
    const createdReservation = await this.reservationService.create(reservation);
    return createdReservation;
  }

  @Get('/:id')
  async getReservation(@Param('id') reservationId: string) {
    const reservation = await this.reservationService.findOne(reservationId);
    return reservation;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/confirm-reservation/:id')
  async confirmReservation(
    @Param('id') reservationId: string,
    @Body('userId') userId: string,
    @Body('hostId') hostId: string
  ) {
    let reservation;
    try {
      reservation = await this.reservationService.findOne(reservationId);
      if (reservation) {
        await this.usersService.updateUserReservation(userId, reservationId);
        await this.usersService.updateUserReservation(hostId, reservationId);
      }
    } catch (error) {
      console.log(error);
      throw new Error('Cannot update user resdervation reservation not exists');
    }

    return reservation;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  async cancelReservation(@Req() req) {
    const { userId, reservationId, hostId } = req.body;
    await this.reservationService.delete(reservationId);
    await this.usersService.deleteUserReservation(userId, reservationId);
    await this.usersService.deleteHostReservation(hostId, reservationId);
  }
}
