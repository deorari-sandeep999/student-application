import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private studentIdSource = new BehaviorSubject('');
  private subjectIdSource = new BehaviorSubject('');
  private studentFirstNameSource = new BehaviorSubject('');
  private studentLastNameSource = new BehaviorSubject('');
  private studentClassSource = new BehaviorSubject('');
  private subjectSource = new BehaviorSubject('');
  private marksSource = new BehaviorSubject('');
  
  studentFirstName = this.studentFirstNameSource.asObservable();
  studentLastName = this.studentLastNameSource.asObservable();
  studentId = this.studentIdSource.asObservable();
  subjectId = this.subjectIdSource.asObservable();
  studentClass = this.studentClassSource.asObservable();
  subject = this.subjectSource.asObservable();
  marks = this.marksSource.asObservable();
  
  constructor() { }

  setstudentFirstName(firstName: any) {
    this.studentFirstNameSource.next(firstName);
  }

  setstudentLastName(lastName: any) {
    this.studentLastNameSource.next(lastName);
  }

  setstudentId(studentId: any) {
    this.studentIdSource.next(studentId);
  }

  setsubjectId(subjectId: any) {
    this.subjectIdSource.next(subjectId);
  }

  setstudentClass(studentClass: any) {
    this.studentClassSource.next(studentClass);
  }

  setsubject(subject: any) {
    this.subjectSource.next(subject);
  }

  setmarks(marks: any) {
    this.marksSource.next(marks);
  }
}
