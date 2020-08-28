import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  saveStudent(data: any): Observable<any> {
    if (data) {
      return this.http.post(this.baseUrl + '/add-student', data);
    } else {
      return new Observable((observer: Observer<any>) => observer.error("Invalid Information"));
    }
  }

  listStudent() {
    return this.http.get(this.baseUrl + '/list-student');
  }

  deleteSubject(data: any): Observable<any> {
    if (data) {
      return this.http.post(this.baseUrl + '/delete-subject', data);
    } else {
      return new Observable((observer: Observer<any>) => observer.error("Invalid Information"));
    }
  }

  searchStudent(data: any): Observable<any> {
    if (data) {
      return this.http.post(this.baseUrl + '/search', data);
    } else {
      return new Observable((observer: Observer<any>) => observer.error("Invalid Information"));
    }
  }

  filterStudent(data: any): Observable<any> {
    if (data) {
      return this.http.post(this.baseUrl + '/filter', data);
    } else {
      return new Observable((observer: Observer<any>) => observer.error("Invalid Information"));
    }
  }

  updateStudent(data: any): Observable<any> {
    if (data) {
      return this.http.post(this.baseUrl + '/update-student', data);
    } else {
      return new Observable((observer: Observer<any>) => observer.error("Invalid Information"));
    }
  }
}
