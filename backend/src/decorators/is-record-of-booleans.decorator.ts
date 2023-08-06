import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsRecordOfBooleans<T>(validationOptions?: ValidationOptions) {
  return function (object: T, propertyName: string) {
    registerDecorator({
      name: 'isRecordOfBooleans',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: T, args: ValidationArguments) {
          // check if value is an object
          if (typeof value !== 'object' || value === null) {
            return false;
          }
          // check if every key is a string and every value is a boolean
          for (const [key, val] of Object.entries(value)) {
            if (typeof key !== 'string' || typeof val !== 'boolean') {
              return false;
            }
          }
          // return true if all checks pass
          return true;
        }
      }
    });
  };
}
