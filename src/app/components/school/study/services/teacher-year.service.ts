import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {TeacherYear} from '../interface/teacher-year';

@Injectable({
  providedIn: 'root'
})
export class TeacherYearService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: TeacherYear): Observable<any>{
    return this.http.post(`${this.baseUrl}/teacher-year/create`, data);
  }

  getCollection(): Observable<TeacherYear[]> {
    return this.http.get<TeacherYear[]>(`${this.baseUrl}/teacher-year/get`);
  }

  put(id: number, data: TeacherYear): Observable<any>{
    return this.http.put(`${this.baseUrl}/teacher-year/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/teacher-year/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<TeacherYear[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/teacher-year/states`, options);

  }
}

