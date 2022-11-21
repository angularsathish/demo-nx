import { FormGroup, FormControl } from '@angular/forms';

export interface Department {
  id: string | null;
  courseId: string;
  departmentName: string;
  departmentCode: string;
  maxStudent: string;
}

export interface DepFormGroup extends FormGroup {
  value: Department;

  // We need to add these manually again, same fields as IUser
  controls: {
    id: FormControl;
    courseId: FormControl;
    departmentName: FormControl;
    departmentCode: FormControl;
    maxStudent: FormControl;
  };
}
