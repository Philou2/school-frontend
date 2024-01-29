import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Sex} from '../../interface/person/sex';

@Injectable({
  providedIn: 'root'
})
export class SexService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  post(data: Sex): Observable<any>{
    return this.http.post<Sex>(`${this.baseUrl}/sex/create`, data);
  }

  getCollection(): Observable<Sex[]>{
    return this.http.get<Sex[]>(`${this.baseUrl}/sex/get`);
  }

  put(id: number, data: Sex): Observable<any>{
    return this.http.put<Sex>(`${this.baseUrl}/sex/edit/${id}`, data);
  }

  delete(id: number): Observable<Sex>{
    return this.http.delete<Sex>(`${this.baseUrl}/sex/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<Sex[]>{
    const options = {body: ids};
    return this.http.delete<Sex[]>(`${this.baseUrl}/sex/delete`, options);
  }
}
