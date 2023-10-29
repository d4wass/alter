import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsMatch<T>(property: string, validationOptions?: ValidationOptions) {
  return function (object: T, propertyName: string) {
    registerDecorator({
      name: 'isMatch',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: T, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue;
        }
      }
    });
  };
}

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

export function IsTrue(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isTrue',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value === true;
        }
      }
    });
  };
}

export function IsDateMatches(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsDateMatches',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const regexPattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/;
          return regexPattern.test(value) === true;
        }
      }
    });
  };
}

export function IsTimeMatches(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsTimeMatches',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const regexPattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
          return regexPattern.test(value) === true;
        }
      }
    });
  };
}
