import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Department, DepFormGroup } from '@demo-nx/interfaces';
import { UnsubscribeOnDestroyAdapter } from '@demo-nx/material';

@Component({
  selector: 'demo-nx-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateDepartmentComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  departForm: DepFormGroup;
  // myData: Department;
  submitted = false;
  // courseList: any[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.departForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      courseId: ['', [Validators.required]],
      departmentName: ['', [Validators.required]],
      departmentCode: ['', [Validators.required]],
      maxStudent: ['', [Validators.required]],
    }) as DepFormGroup;
  }

  onSubmit() {
    console.log('');
  }
}
