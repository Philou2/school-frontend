import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Civility} from '../../interface/person/civility';

@Injectable({
  providedIn: 'root'
})
export class CivilityService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  post(data: Civility): Observable<any>{
    return this.http.post<Civility>(`${this.baseUrl}/civility/create`, data);
  }

  getCollection(): Observable<Civility[]>{
    return this.http.get<Civility[]>(`${this.baseUrl}/civility/get`);
  }

  put(id: number, data: Civility): Observable<any>{
    return this.http.put<Civility>(`${this.baseUrl}/civility/edit/${id}`, data);
  }

  delete(id: number): Observable<Civility>{
    return this.http.delete<Civility>(`${this.baseUrl}/civility/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<Civility[]>{
    const options = {body: ids};
    return this.http.delete<Civility[]>(`${this.baseUrl}/civility/delete`, options);
  }
}
