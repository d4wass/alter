import { ValidationError } from 'class-validator';
import { ConvertedValidationError } from './validation-types';

export class ValidationErrorConverter {
  private _convertedErrors: Array<ConvertedValidationError> = [];
  public get convertedErrors(): Array<ConvertedValidationError> {
    return this._convertedErrors;
  }
  public set convertedErrors(value: Array<ConvertedValidationError>) {
    this._convertedErrors = value;
  }
  private _errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    this._errors = errors;
    this.errorsConverter(this._errors);
  }

  errorsConverter(errors: ValidationError[]): void {
    errors.forEach((error) => {
      if (!error.children.length) {
        this._convertedErrors.push({ property: error.property, constraints: error.constraints });
      } else {
        this.errorsConverter(error.children);
      }
    });
  }
}
