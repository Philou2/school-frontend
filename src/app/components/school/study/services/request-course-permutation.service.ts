import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {RequestCoursePermutation} from '../interface/request-course-permutation';

@Injectable({
  providedIn: 'root'
})
export class RequestCoursePermutationService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  post(data: RequestCoursePermutation): Observable<any>{
    return this.http.post<RequestCoursePermutation>(`${this.baseUrl}/request-course-permutation/create`, data);
  }

  putValidate(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/request-course-permutation-validate/edit/${id}`);
  }

  putReject(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/request-course-permutation-reject/edit/${id}`);
  }

  getCollection(): Observable<RequestCoursePermutation[]>{
    return this.http.get<RequestCoursePermutation[]>(`${this.baseUrl}/request-course-permutation/get`);
  }

  put(id: number, data: RequestCoursePermutation): Observable<any>{
    return this.http.put<RequestCoursePermutation>(`${this.baseUrl}/request-course-permutation/edit/${id}`, data);
  }

  delete(id: number): Observable<RequestCoursePermutation>{
    return this.http.delete<RequestCoursePermutation>(`${this.baseUrl}/request-course-permutation/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<RequestCoursePermutation[]>{
    const options = {body: ids};
    return this.http.delete<RequestCoursePermutation[]>(`${this.baseUrl}/request-course-permutation/delete`, options);
  }
}
