import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {StudCourseRegistration} from '../../interface/registration/stud-course-registration';
import {environment} from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudCourseRegistrationService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getList(studentMatricule?: string): Observable<StudCourseRegistration[]>{
    return this.http.get<StudCourseRegistration[]>(`${this.baseUrl}/stud-course-reg-admin/get${studentMatricule ? '/' + studentMatricule : ''}`);
  }

  getStudentList(): Observable<StudCourseRegistration[]>{
    return this.http.get<StudCourseRegistration[]>(`${this.baseUrl}/stud-course-reg-student/get`);
  }

  getCourseStudentRegList(id: number): Observable<StudCourseRegistration[]>{
    return this.http.get<StudCourseRegistration[]>(`${this.baseUrl}/course-stud-reg/get/${id}`);
  }
  getOpeningClosingList(): Observable<StudCourseRegistration[]>{
    return this.http.get<StudCourseRegistration[]>(`${this.baseUrl}/stud-course-reg/get/opening-closing`);
  }

  create(data: StudCourseRegistration): Observable<any>{
    return this.http.post<StudCourseRegistration>(`${this.baseUrl}/stud-course-reg/create`, data);
  }

  edit(id: number, data: StudCourseRegistration): Observable<any>{
    return this.http.put<StudCourseRegistration>(`${this.baseUrl}/stud-course-reg/edit/${id}`, data);
  }

  chooseCourses(schoolClasses: any): Observable<any>{
    return this.http.get<any>(`http://localhost:8000/stud-course-reg/chooseCourses/${JSON.stringify(schoolClasses)}`);
  }

  openOrCloseCoursesChoice(studCourseRegistrations: any): Observable<any>{
    console.log(JSON.stringify(studCourseRegistrations));
    return this.http.get<any>(`http://localhost:8000/stud-course-reg/openOrCloseCoursesChoice/${JSON.stringify(studCourseRegistrations)}`);
  }

  delete(id: number): Observable<StudCourseRegistration>{
    return this.http.delete<StudCourseRegistration>(`${this.baseUrl}/stud-course-reg/delete/` + id);
  }
}
