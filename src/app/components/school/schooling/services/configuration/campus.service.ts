import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {Campus} from '../../interface/configuration/Campus';

@Injectable({
  providedIn: 'root'
})
export class CampusService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  post(data: Campus): Observable<any>{
    return this.http.post<Campus>(`${this.baseUrl}/campus/create`, data);
  }

  getCollection(): Observable<Campus[]>{
    return this.http.get<Campus[]>(`${this.baseUrl}/campus/get`);
  }

  put(id: number, data: Campus): Observable<any>{
    return this.http.put<Campus>(`${this.baseUrl}/campus/edit/${id}`, data);
  }

  delete(id: number): Observable<Campus>{
    return this.http.delete<Campus>(`${this.baseUrl}/campus/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<Campus[]>{
    const options = {body: ids};
    return this.http.delete<Campus[]>(`${this.baseUrl}/delete/selected/campuses`, options);
  }
}
