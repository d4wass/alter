import { ArgumentMetadata, BadRequestException, Injectable, ValidationPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { errorsConverter } from './utils/error-validation.converter';
import { ConstructorTypes } from './utils/validation-types';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  message: string;
  constructor(message = 'Validation Error') {
    super();
    this.message = message;
  }
  async transform(value, metadata: ArgumentMetadata) {
    const object = plainToInstance(metadata.metatype, value);
    const errors = await validate(object);

    if (!metadata.metatype || !this.toValidate(metadata)) {
      return value;
    }

    if (errors.length > 0) {
      const convertedErrors = errorsConverter(errors);
      throw new BadRequestException(convertedErrors, this.message);
    }
    return value;
  }

  toValidate(metadata: ArgumentMetadata): boolean {
    const types: ConstructorTypes[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metadata.metatype as ConstructorTypes);
  }
}