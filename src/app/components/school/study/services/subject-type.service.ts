import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {SubjectType} from '../interface/subject-type';

@Injectable({
  providedIn: 'root'
})
export class SubjectTypeService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  post(data: SubjectType): Observable<any>{
    return this.http.post<SubjectType>(`${this.baseUrl}/subject-type/create`, data);
  }

  getCollection(): Observable<SubjectType[]>{
    return this.http.get<SubjectType[]>(`${this.baseUrl}/subject-type/get`);
  }

  put(id: number, data: SubjectType): Observable<any>{
    return this.http.put<SubjectType>(`${this.baseUrl}/subject-type/edit/${id}`, data);
  }

  delete(id: number): Observable<SubjectType>{
    return this.http.delete<SubjectType>(`${this.baseUrl}/subject-type/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<SubjectType[]>{
    const options = {body: ids};
    return this.http.delete<SubjectType[]>(`${this.baseUrl}/subject-type/delete`, options);
  }
}
