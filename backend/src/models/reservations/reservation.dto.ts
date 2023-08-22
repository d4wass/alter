import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ReservationModel } from './reservation.model';

class ReservationDate {
  @IsString()
  @IsNotEmpty()
  date: string;
  @IsString()
  @IsNotEmpty()
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
  @IsInt()
  @IsNotEmpty()
  price: number;
}
