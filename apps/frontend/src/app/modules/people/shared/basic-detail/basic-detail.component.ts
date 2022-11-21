import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Blood {
  name: string;
  value: string;
}

@Component({
  selector: 'demo-nx-basic-detail',
  templateUrl: './basic-detail.component.html',
  styleUrls: ['./basic-detail.component.scss'],
})
export class BasicDetailComponent implements OnInit {
  basicDetailForm: FormGroup;
  roleName = '';
  bloodoptions: Blood[] = [
    { name: 'a+', value: 'APOSITIVE' },
    { name: 'ab+', value: 'ABPOSITIVE' },
    { name: 'b+', value: 'BPOSITIVE' },
    { name: 'o+', value: 'OPOSITIVE' },
    { name: 'a-', value: 'ANEGATIVE' },
    { name: 'ab-', value: 'ABNEGATIVE' },
    { name: 'b-', value: 'BNEGATIVE' },
    { name: 'o-', value: 'ONEGATIVE' },
  ];
  bloodfilteredOptions: Observable<Blood[]> | undefined;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.roleName = this.router.url.split('/')[2]
      ? this.router.url.split('/')[2]
      : '';

    this.basicDetailForm = this.fb.group({
      doj: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      bloodGroup: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      religion: ['', [Validators.required]],
      caste: ['', [Validators.required]],
      language: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      userId: ['', [Validators.required]],
    });

    if (this.basicDetailForm) {
      this.bloodfilteredOptions = this.basicDetailForm
        .get('bloodGroup')
        ?.valueChanges?.pipe(
          startWith(''),
          map((value) => (typeof value === 'string' ? value : value.name)),
          map((name) => (name ? this._filter(name) : this.bloodoptions.slice()))
        );
    }
  }

  displayFn(user: Blood): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Blood[] {
    const filterValue = name.toLowerCase();

    return this.bloodoptions.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onSubmit() {
    console.log('onsubmit');
  }
}
