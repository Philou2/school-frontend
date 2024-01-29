import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {RequestCoursePostponement} from '../interface/request-course-postponement';

@Injectable({
  providedIn: 'root'
})
export class RequestCoursePostponementService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  post(data: RequestCoursePostponement): Observable<any>{
    return this.http.post<RequestCoursePostponement>(`${this.baseUrl}/request-course-postponement/create`, data);
  }

  putValidate(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/request-course-postponement-validate/edit/${id}`);
  }

  putReject(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/request-course-postponement-reject/edit/${id}`);
  }

  getCollection(): Observable<RequestCoursePostponement[]>{
    return this.http.get<RequestCoursePostponement[]>(`${this.baseUrl}/request-course-postponement/get`);
  }

  put(id: number, data: RequestCoursePostponement): Observable<any>{
    return this.http.put<RequestCoursePostponement>(`${this.baseUrl}/request-course-postponement/edit/${id}`, data);
  }

  delete(id: number): Observable<RequestCoursePostponement>{
    return this.http.delete<RequestCoursePostponement>(`${this.baseUrl}/request-course-postponement/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<RequestCoursePostponement[]>{
    const options = {body: ids};
    return this.http.delete<RequestCoursePostponement[]>(`${this.baseUrl}/request-course-postponement/delete`, options);
  }
}
