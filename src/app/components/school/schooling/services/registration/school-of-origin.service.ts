import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SchoolOfOrigin} from '../../interface/registration/schoolOfOrigin';
import {environment} from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolOfOriginService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: SchoolOfOrigin): Observable<any>{
    return this.http.post(`${this.baseUrl}/schoolorigin/create`, data);
  }

  getCollection(): Observable<SchoolOfOrigin[]> {
    return this.http.get<SchoolOfOrigin[]>(`${this.baseUrl}/schoolorigin/get`);
  }

  put(id: number, data: SchoolOfOrigin): Observable<any>{
    return this.http.put(`${this.baseUrl}/schoolorigin/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/schoolorigin/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<SchoolOfOrigin[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/schoolorigin/states`, options);

  }
}

