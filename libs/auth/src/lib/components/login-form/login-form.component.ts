import {
  Component,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { Authenticate, AuthenticateFormGroup } from '@demo-nx/interfaces';
import { Validators, FormBuilder } from '@angular/forms';
import { UnsubscribeOnDestroyAdapter } from '@demo-nx/material';
import { Router } from '@angular/router';
@Component({
  selector: 'demo-nx-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  @Output() submitForm = new EventEmitter<Authenticate>();

  loginForm: AuthenticateFormGroup;
  myData: Authenticate;
  submitted = false;
  loading = false;
  error = '';
  hide = true;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.formInit();
  }

  get f() {
    return this.loginForm.controls;
  }

  formInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    }) as AuthenticateFormGroup;

    // retrieve your data
    this.myData = { username: 'sathish', password: '123456' };

    // fill the form with this data
    this.loginForm.patchValue(this.myData);
  }

  adminSet() {
    this.loginForm.get('username')?.setValue('sathish');
    this.loginForm.get('password')?.setValue('123456');
  }
  doctorSet() {
    this.loginForm.get('username')?.setValue('teacher');
    this.loginForm.get('password')?.setValue('123456');
  }
  patientSet() {
    this.loginForm.get('username')?.setValue('patient@hospital.org');
    this.loginForm.get('password')?.setValue('patient@123');
  }

  login() {
    this.submitForm.emit({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    } as Authenticate);
  }

  testlogin() {
    const user = this.loginForm.get('username')?.value;
    console.log('user', user);
    switch (user) {
      case 'admin':
        console.log('admin');
        this.router.navigate(['/admin/dashboard']);
        break;

      case 'teacher':
        this.router.navigate(['/teacher/dashboard']);
        break;

      case 'student':
        this.router.navigate(['/student/dashboard']);
        break;

      case 'parent':
        this.router.navigate(['/parent/dashboard']);
        break;
    }
  }
}
