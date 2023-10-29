import { ArgumentMetadata, BadRequestException, Injectable, ValidationPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ValidationErrorConverter } from './utils/error-validation.converter';
import { ConstructorTypes, ConvertedValidationError } from './utils/validation-types';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  message: string;
  convertedErrors: Array<ConvertedValidationError> = [];
  constructor(message = 'Validation Error') {
    super();
    this.message = message;
  }
  async transform(value, metadata: ArgumentMetadata) {
    let errors: ValidationError[];

    if (metadata.type === 'body') {
      const object = plainToInstance(metadata.metatype, value);
      errors = await validate(object);
    }

    if (!metadata.metatype || !this.toValidate(metadata)) {
      return value;
    }

    if (errors.length > 0) {
      const convertedErrors = new ValidationErrorConverter(errors).convertedErrors;
      throw new BadRequestException(convertedErrors, this.message);
    }
    return value;
  }

  toValidate(metadata: ArgumentMetadata): boolean {
    const types: ConstructorTypes[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metadata.metatype as ConstructorTypes);
  }
}
