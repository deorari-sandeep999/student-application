import { Component, OnInit } from '@angular/core';
import { SharedService } from '../_services/shared.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../_services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {

  studentId: any;
  subjectId: any;
  firstName: any;
  lastName: any;
  studentClass: any;
  subject: any;
  marks: any;
  editStudentForm: FormGroup;
  submitted = false;
  data: any;

  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.editStudentForm = this.fb.group({
      student_id: [''],
      subject_id: [''],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      class: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      marks: ['', [Validators.required]],
    });

    this.sharedService.studentId.subscribe(studentId => this.studentId = studentId);
    this.sharedService.subjectId.subscribe(subjectId => this.subjectId = subjectId);
    this.sharedService.studentFirstName.subscribe(firstName => this.firstName = firstName);
    this.sharedService.studentLastName.subscribe(lastName => this.lastName = lastName);
    this.sharedService.studentClass.subscribe(studentClass => this.studentClass = studentClass);
    this.sharedService.subject.subscribe(subject => this.subject = subject);
    this.sharedService.marks.subscribe(marks => this.marks = marks);

    this.editStudentForm.patchValue({
      student_id: this.studentId,
      subject_id: this.subjectId,
      first_name: this.firstName,
      last_name: this.lastName,
      class: this.studentClass,
      subject: this.subject,
      marks: this.marks,
    });
  }

  get f() { return this.editStudentForm.controls; }

  onSubmit() {
    this.submitted = false;
    if (this.editStudentForm.invalid) {
      this.submitted = true;
      return;
    } else {
      this.data = this.editStudentForm.value;
      console.log(this.data);
      this.studentService.updateStudent(this.data)
        .subscribe(response => {
          console.log(response);
          alert(response.message);
          if (response.status === 'success' && response.code === 200) {
            this.router.navigate(['student-list']);
          }
        });
    }
  }
}
