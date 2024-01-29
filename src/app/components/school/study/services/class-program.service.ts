import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {ClassProgram} from '../interface/class-program';
@Injectable({
  providedIn: 'root'
})
export class ClassProgramService {
  private baseUrl = environment.apiBaseUrl;
  private classProgramSource = new BehaviorSubject<any>(null);
  currentClassProgram = this.classProgramSource.asObservable();
  constructor(private http: HttpClient) { }

  // post(data: ClassProgram): Observable<any>{
  //   return this.http.post<ClassProgram>(`${this.baseUrl}/class-program/create`, data);
  // }

  post(data: ClassProgram): Observable<any>{
    return this.http.post(`${this.baseUrl}/class-program/create`, data);
  }

  getCollection(): Observable<ClassProgram[]>{
    return this.http.get<ClassProgram[]>(`${this.baseUrl}/class-program/get`);
  }

  getListStudCourseReg(): Observable<ClassProgram[]>{
    return this.http.get<ClassProgram[]>(`${this.baseUrl}/class-program/get/stud-course-reg`);
  }

  put(id: number, data: ClassProgram): Observable<any>{
    return this.http.put<ClassProgram>(`${this.baseUrl}/class-program/edit/${id}`, data);
  }

  delete(id: number): Observable<ClassProgram>{
    return this.http.delete<ClassProgram>(`${this.baseUrl}/class-program/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<ClassProgram[]>{
    const options = {body: ids};
    return this.http.delete<ClassProgram[]>(`${this.baseUrl}/class-program/delete`, options);
  }

  changeClassProgram(classProgram: any) {
    this.classProgramSource.next(classProgram);
  }
}
