import { ValidationError } from '@nestjs/common';

export type ConvertedValidationError = {
  property: string;
  constraints: any;
  children?: ValidationError[];
};

export type ConstructorTypes =
  | StringConstructor
  | BooleanConstructor
  | NumberConstructor
  | ArrayConstructor
  | ObjectConstructor;
