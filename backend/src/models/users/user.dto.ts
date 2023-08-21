import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword
} from 'class-validator';
import { IsTrue, IsMatch } from 'src/decorators/custom-valid-decorators.decorator';
import { UserModel } from 'src/models/users/user.model';

export class UserDto implements UserModel {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  firstName: string;
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
  @IsPhoneNumber()
  @IsNotEmpty()
  mobile: string;
  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateUserDto extends UserDto {
  @IsBoolean()
  @IsOptional()
  isNewsletter?: boolean;
  @IsBoolean()
  @IsTrue({ message: 'Accept terms of Alter service to create account' })
  isTerms: boolean;
  @IsString()
  @IsNotEmpty()
  @IsMatch('password', { message: 'passwords not matched' })
  passwordConfirm: string;
}

export class UpdateUserDto implements Partial<UserDto> {
  @IsEmail()
  @IsString()
  @IsOptional()
  email?: string;
  @IsString()
  @IsOptional()
  firstName?: string;
  @IsString()
  @IsOptional()
  lastName?: string;
  @IsString()
  @IsOptional()
  password?: string;
  @IsPhoneNumber()
  @IsString()
  @IsOptional()
  mobile?: string;
  @IsString()
  @IsOptional()
  description?: string;
}
