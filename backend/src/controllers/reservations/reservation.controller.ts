import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes
} from '@nestjs/common';
import {
  ReservationDto,
  StatusReservationDto,
  UpdateReservationDto
} from 'src/models/reservations/reservation.dto';
import { CustomValidationPipe } from 'src/pipes/custom-validation.pipe';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ReservationService } from '../../services/reservation/reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomValidationPipe('Reservation validation failed'))
  //TODO: implement role for users in backend
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

  // @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomValidationPipe('Reservation validation failed'))
  @Put('/:id')
  //TODO: implement role for users in backend - only host should be able to confirm reservation
  async updateReservation(
    @Body() updateReservation: UpdateReservationDto,
    @Param('id') reservationId: string
  ) {
    const reservation = await this.reservationService.update(reservationId, updateReservation);
    return reservation;
  }

  // @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomValidationPipe('Reservation validation failed'))
  @Patch('/confirm/:id')
  //TODO: implement role for users in backend - only host should be able to confirm reservation
  async confirmReservation(@Body() body: StatusReservationDto, @Param('id') reservationId: string) {
    const { status } = body;
    const reservation = await this.reservationService.confirm(reservationId, status);
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
