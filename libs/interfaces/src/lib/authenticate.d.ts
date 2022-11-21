import { FormGroup, FormControl } from '@angular/forms';

export interface Authenticate {
  username: string;
  password: string;
}

export interface AuthenticateFormGroup extends FormGroup {
  value: Authenticate;

  // We need to add these manually again, same fields as IUser
  controls: {
    username: FormControl;
    password: FormControl;
  };
}
