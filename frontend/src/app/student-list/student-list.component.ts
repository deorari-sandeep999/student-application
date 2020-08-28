import { Component, OnInit } from '@angular/core';
import { StudentService } from '../_services/student.service';
import { Router } from '@angular/router';
import { SharedService } from '../_services/shared.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  allStudents: any;
  deleteSubjectData: any;
  name: any;
  searchData: any;
  filterData: any;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getStudentList();
  }

  getStudentList() {
    this.studentService.listStudent()
      .subscribe(response => {
        if (response['status'] === 'success' && response['code'] === 200) {
          this.allStudents = response['data']; 
        }
      });
  }

  editStudent(student: any, subject: any) {
    this.sharedService.setstudentId(student._id);
    this.sharedService.setsubjectId(subject._id);
    this.sharedService.setstudentFirstName(student.first_name);
    this.sharedService.setstudentLastName(student.last_name);
    this.sharedService.setstudentClass(student.class);
    this.sharedService.setsubject(subject.subject);
    this.sharedService.setmarks(subject.marks);
    this.router.navigate(['/edit-student']);
  }

  deleteStudent(studentId: any, subjectId: any) {
    this.deleteSubjectData = { student_id: studentId, subject_id: subjectId };
    this.studentService.deleteSubject(this.deleteSubjectData)
      .subscribe(response => {
        console.log(response);
        alert(response.message);
        if (response['status'] === 'success' && response['code'] === 200) {
          this.getStudentList();
        }
      });
  }

  searchStudent(name) {
    this.searchData = { name: name };
    this.studentService.searchStudent(this.searchData)
      .subscribe(response => {
        console.log(response);
        if (response['status'] === 'success' && response['code'] === 200) {
          this.allStudents = response['data'];
        }
      });
  }

  selectChangeHandler(event) {
    this.filterData = { filter: event.target.value };
    this.studentService.filterStudent(this.filterData)
      .subscribe(response => {
        console.log(response);
        if (response['status'] === 'success' && response['code'] === 200) {
          this.allStudents = response['data'];
        }
      });
    }
}
