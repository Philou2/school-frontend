import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Subject} from '../interface/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  post(data: Subject): Observable<any>{
    return this.http.post<Subject>(`${this.baseUrl}/subject/create`, data);
  }

  getCollection(): Observable<Subject[]>{
    return this.http.get<Subject[]>(`${this.baseUrl}/subject/get`);
  }

  importSubject(datas: any[]): Observable<any>{
    console.log(datas);
    let options = {data: datas};
    return this.http.post(`${this.baseUrl}/import/subject`, options);
  }

  put(id: number, data: Subject): Observable<any>{
    return this.http.put<Subject>(`${this.baseUrl}/subject/edit/${id}`, data);
  }

  delete(id: number): Observable<Subject>{
    return this.http.delete<Subject>(`${this.baseUrl}/subject/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<Subject[]>{
    const options = {body: ids};
    return this.http.delete<Subject[]>(`${this.baseUrl}/subject/delete`, options);
  }
}
