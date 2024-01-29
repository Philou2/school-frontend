import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {TeacherCourseRegistration} from '../interface/teacher-course-registration';

@Injectable({
  providedIn: 'root'
})
export class TeacherCourseRegistrationService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: TeacherCourseRegistration): Observable<any>{
    return this.http.post(`${this.baseUrl}/teacher-course-registration/create`, data);
  }

  getCollection(): Observable<TeacherCourseRegistration[]> {
    return this.http.get<TeacherCourseRegistration[]>(`${this.baseUrl}/teacher-course-registration/get`);
  }
  getCollectioncount(): Observable<TeacherCourseRegistration[]> {
    return this.http.get<TeacherCourseRegistration[]>(`${this.baseUrl}/teacher-count-course/get`);
  }
  getCollectionCountCourseInprogress(): Observable<TeacherCourseRegistration[]> {
    return this.http.get<TeacherCourseRegistration[]>(`${this.baseUrl}/teacher-count-course-in-progress/get`);
  }
  getCollectionCountCourseCompleted(): Observable<TeacherCourseRegistration[]> {
    return this.http.get<TeacherCourseRegistration[]>(`${this.baseUrl}/teacher-count-course-completed/get`);
  }

  put(id: number, data: TeacherCourseRegistration): Observable<any>{
    return this.http.put(`${this.baseUrl}/teacher-course-registration/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/teacher-course-registration/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<TeacherCourseRegistration[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/teacher-course-registration/states`, options);

  }
}

