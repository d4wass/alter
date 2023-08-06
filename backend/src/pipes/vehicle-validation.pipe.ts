/* eslint-disable @typescript-eslint/ban-types */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  ValidationError,
  ValidationPipe,
  ValidationPipeOptions
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidatorOptions } from 'class-validator';

type ConvertedValidationError = {
  property: string;
  constraints: any;
  children?: { property: string; constraints: any };
};

@Injectable()
export class CreateVehicleValidationPipe extends ValidationPipe {
  // constructor(options: ValidationPipeOptions) {
  //   super(options);
  // }
  async transform(value, metadata: ArgumentMetadata) {
    const object = plainToInstance(metadata.metatype, value);
    const errors = await validate(object);

    if (!metadata.metatype || !this.toValidate(metadata)) {
      return value;
    }

    if (errors.length > 0) {
      console.log('REQUEST VALUES', value);
      // console.log('error from validation pipe', errors);
      const convertedErrors = this.errorsConverter(errors);
      throw new BadRequestException(convertedErrors, 'Validation failed');
    }
    return value;
  }

  toValidate(metadata: ArgumentMetadata): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metadata.metatype);
  }

  private errorsConverter(errors: ValidationError[]): Array<ConvertedValidationError> {
    const result: Array<ConvertedValidationError> = [];

    errors.map((error) => {
      if (!error.children.length) {
        result.push({ property: error.property, constraints: error.constraints });
      } else {
        result.push(this.errorChildren(error.children));
      }
    });
    return result;
  }

  private errorChildren(children: ValidationError[]) {
    return children.map((i) =>
      !!i.children.length
        ? {
            property: i.property,
            constraints: i.constraints,
            children: this.errorChildren(i.children)
          }
        : { property: i.property, constraints: i.constraints }
    );
  }
}
