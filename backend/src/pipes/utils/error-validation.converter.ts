import { ValidationError } from 'class-validator';
import { ConvertedValidationError } from './validation-types';

export function errorsConverter(errors: ValidationError[]): Array<ConvertedValidationError> {
  const result: Array<ConvertedValidationError> = [];

  errors.map((error) => {
    if (!error.children.length) {
      result.push({ property: error.property, constraints: error.constraints });
    } else {
      errorsConverter(error.children);
    }
  });
  return result;
}
