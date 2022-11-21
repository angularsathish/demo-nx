import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursesEntity } from '@demo-nx/interfaces';

@Component({
  selector: 'demo-nx-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css'],
})
export class UpdateCourseComponent implements OnInit {
  @Input() set courseData(course: CoursesEntity) {
    console.log('course ==', course);
    if (course && course.id !== '') {
      this.courseDetailForm.patchValue(course);
    }
  }
  courseDetailForm: FormGroup;
  @Output() crudStatus: EventEmitter<CoursesEntity> = new EventEmitter();

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.courseDetailForm = this.fb.group({
      courseName: ['', [Validators.required]],
      courseCode: ['', [Validators.required]],
      courseDetail: ['', [Validators.required]],
      coursePrice: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      professorDetail: ['', [Validators.required]],
      timeLength: ['', [Validators.required]],
      maxStudent: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      id: [''],
    });
  }

  onSubmit() {
    console.log('');
    this.crudStatus.emit(this.courseDetailForm.value);
  }
}
