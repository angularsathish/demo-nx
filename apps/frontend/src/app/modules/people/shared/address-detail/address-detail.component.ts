import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'demo-nx-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.scss'],
})
export class AddressDetailComponent implements OnInit {
  addressDetailForm: FormGroup;
  roleName = '';
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.addressDetailForm = this.fb.group({
      emailId: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      phone: this.createPhone(),
      addresses: this.createAddress(),
    });
  }

  createAddress(): FormGroup {
    return this.fb.group({
      line1: ['', [Validators.required]],
      line2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zipcode: [null, [Validators.required]],
    });
  }

  createPhone(): FormGroup {
    return this.fb.group({
      home: [''],
      office: [''],
      mobile: ['', [Validators.required]],
      preferred: ['mobile', [Validators.required]],
    });
  }

  onSubmit() {
    console.log('submit');
  }
}
