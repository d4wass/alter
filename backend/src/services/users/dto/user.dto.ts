import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword
} from 'class-validator';
import { IsTrue, IsMatch } from 'src/decorators/custom-valid-decorators.decorator';
import { UserDataToUpdate, UserModel } from 'src/models/user.model';
import { Reservation } from 'src/schemas/reservation/reservation.schema';
import { Vehicle } from 'src/schemas/vehicle/vehicle.schema';

export class CreateUserDto implements UserModel {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsBoolean()
  @IsOptional()
  isNewsletter?: boolean;
  @IsBoolean()
  @IsTrue({ message: 'Accept terms of Alter service to create account' })
  isTerms: boolean;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(
    { minLength: 6, minUppercase: 2, minSymbols: 1, minNumbers: 1 },
    {
      message:
        'Password not meet requirements: min length 6, minimal 2 uppercase letters, one symbol and one number'
    }
  )
  password: string;
  @IsString()
  @IsNotEmpty()
  @IsMatch('password', { message: 'passwords not matched' })
  passwordConfirm: string;
}

export class UpdateUserDto extends CreateUserDto {}
