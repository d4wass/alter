import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';
import { IsDateMatches, IsTimeMatches } from 'src/decorators/custom-valid-decorators.decorator';
import { ReservationModel, ReservationStatus } from './reservation.model';

class ReservationDate {
  @IsString()
  @IsNotEmpty()
  @IsDateMatches({ message: 'Date value of reservation has invalid value' })
  date: string;
  @IsString()
  @IsNotEmpty()
  @IsTimeMatches({ message: 'Time value of reservation has invalid value' })
  hour: string;
}
export class UpdateReservationDate extends ReservationDate {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  date: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  hour: string;
}

export class ReservationDto implements ReservationModel {
  @IsString()
  @IsNotEmpty()
  hostId: string;
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  vehicleId: string;
  @ValidateNested()
  @Type(() => ReservationDate)
  fromDate: ReservationDate = new ReservationDate();
  @ValidateNested()
  @Type(() => ReservationDate)
  endDate: ReservationDate = new ReservationDate();
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsEnum(ReservationStatus, { message: 'Wrong status value provided' })
  @IsNotEmpty()
  status: ReservationStatus;
}

export class StatusReservationDto implements Partial<ReservationDto> {
  @IsEnum(ReservationStatus, { message: 'Wrong status value provided' })
  status: ReservationStatus;
}

export class UpdateReservationDto implements Partial<ReservationDto> {
  @ValidateNested()
  @Type(() => UpdateReservationDate)
  @IsOptional()
  fromDate?: UpdateReservationDate = new UpdateReservationDate();
  @ValidateNested()
  @Type(() => UpdateReservationDate)
  @IsOptional()
  endDate?: UpdateReservationDate = new UpdateReservationDate();
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  price?: number;
  @IsEnum(ReservationStatus, { message: 'Wrong status value provided' })
  @IsOptional()
  status?: ReservationStatus;
}
