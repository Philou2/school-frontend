import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {School} from '../../interface/configuration/School';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  post(data: School): Observable<any>{
    return this.http.post<School>(`${this.baseUrl}/school/create`, data);
  }

  getCollection(): Observable<School[]>{
    return this.http.get<School[]>(`${this.baseUrl}/school/get`);
  }

  getListStudCourseReg(): Observable<School[]>{
    return this.http.get<School[]>(`${this.baseUrl}/school/get/stud-course-reg`);
  }

  put(id: number, data: School): Observable<any>{
    return this.http.put<School>(`${this.baseUrl}/school/edit/${id}`, data);
  }

  delete(id: number): Observable<School>{
    return this.http.delete<School>(`${this.baseUrl}/school/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<School[]>{
    const options = {body: ids};
    return this.http.delete<School[]>(`${this.baseUrl}/delete/selected/schools`, options);
  }
}
