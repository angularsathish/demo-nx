import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { UsernameService } from '@services/username.service';

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName).setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}

@Component({
  selector: 'demo-nx-login-detail',
  templateUrl: './login-detail.component.html',
  styleUrls: ['./login-detail.component.scss'],
})
export class LoginDetailComponent implements OnInit {
  loginDetailForm: FormGroup;
  hide1 = true;
  hide2 = true;
  roleName = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userSer: UsernameService
  ) {}

  ngOnInit(): void {
    this.roleName = this.router.url.split('/')[3]
      ? this.router.url.split('/')[3]
      : '';
    console.log('roleName', this.roleName);
    const urlName = this.roleName ? this.roleName.toUpperCase() : '';
    const strValue = this.roleName.slice(0, 2).toUpperCase();
    const getUserName = this.userSer.prefixUserName(strValue);

    this.loginDetailForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
        lastName: [''],
        userName: [{ value: getUserName, disabled: true }, Validators.required],
        role: [urlName, [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  onSubmit() {
    console.log('Form Value', this.loginDetailForm.value);
  }
}
