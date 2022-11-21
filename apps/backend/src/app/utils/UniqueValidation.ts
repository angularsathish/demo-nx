import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Not } from 'typeorm';
import { AppDataSource } from '../../main';

@ValidatorConstraint({ async: true })
export class UniqueOnDatabaseExistConstraint
  implements ValidatorConstraintInterface
{
  async validate(value: any, args: ValidationArguments) {
    const entity = args.object[`class_entity_${args.property}`];
    const req_id = args.object['id'] || -1;
    console.log('req_id', req_id);
    const items = await AppDataSource.getRepository(entity).findAndCountBy({
      [args.property]: value,
      id: Not(req_id),
    });
    return !items[1];
  }
}

export function UniqueOnDatabase(entity: any, validationOptions?: any) {
  validationOptions = {
    ...{ message: '$value already exists. Choose another.' },
    ...validationOptions,
  };
  return function (object: any, propertyName: string) {
    object[`class_entity_${propertyName}`] = entity;
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueOnDatabaseExistConstraint,
    });
  };
}
