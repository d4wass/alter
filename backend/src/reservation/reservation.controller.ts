import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('user/addReservation')
  async addReservation(
    @Body('hostId') hostId: string,
    @Body('hostId') userId: string,
    @Body('hostId') vehicleId: string,
    @Body('hostId') fromDate: Date,
    @Body('hostId') fromHour: string,
    @Body('hostId') endDate: Date,
    @Body('hostId') endHour: string
  ) {
    await this,
      this.reservationService.addReservation({
        hostId,
        userId,
        vehicleId,
        fromDate,
        fromHour,
        endDate,
        endHour
      });
  }

  @Get('user/reservations/:id')
  async getReservation(@Param('id') id: string) {
    const reservation = this.reservationService.getReservation(id);
    return reservation;
  }
}
