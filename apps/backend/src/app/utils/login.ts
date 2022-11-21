import { RegisterUser } from '@demo-nx/interfaces';
import { User } from '../entities/User';
import { validate } from 'class-validator';
import { AppDataSource } from '../../main';

export async function userRegister(userObj: RegisterUser) {
  const returnObj: any = {
    status: false,
    data: '',
  };
  const user = new User();
  user.password = userObj.password;
  user.role = userObj.role;
  user.firstName = userObj.firstName;
  user.lastName = userObj.lastName;
  user.userName = userObj.userName;
  user.permissions = userObj.permissions;
  user.isDeleted = 0;

  //Validade if the parameters are ok
  const errors = await validate(user);
  console.log('errors', errors);
  if (errors.length > 0) {
    returnObj.data = errors[0].value;
    return returnObj;
  }

  user.hashPassword();
  const userRepository = await AppDataSource.getRepository(User);
  try {
    await userRepository.save(user);
    returnObj.status = true;
    returnObj.data = user;
  } catch (e) {
    returnObj.data = 'Something went wrong.';
    return returnObj;
  }
  return returnObj;
}
