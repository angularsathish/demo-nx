import { Role } from './enum/role';
import { Actions } from './enum/actions';
export interface User {
  username: string;
  id: number | string;
  token: string;
  role: string;
}
export interface RegisterUser {
  firstName: string;
  lastName: string;
  userName: string;
  role: Role;
  permissions: Array<Actions>;
  password: string;
}
