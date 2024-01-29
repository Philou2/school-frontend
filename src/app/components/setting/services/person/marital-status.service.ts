import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {MaritalStatus} from '../../interface/person/maritalStatus';

@Injectable({
  providedIn: 'root'
})
export class MaritalStatusService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  post(data: MaritalStatus): Observable<any>{
    return this.http.post<MaritalStatus>(`${this.baseUrl}/marital-status/create`, data);
  }

  getCollection(): Observable<MaritalStatus[]>{
    return this.http.get<MaritalStatus[]>(`${this.baseUrl}/marital-status/get`);
  }

  put(id: number, data: MaritalStatus): Observable<any>{
    return this.http.put<MaritalStatus>(`${this.baseUrl}/marital-status/edit/${id}`, data);
  }

  delete(id: number): Observable<MaritalStatus>{
    return this.http.delete<MaritalStatus>(`${this.baseUrl}/marital-status/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<MaritalStatus[]>{
    const options = {body: ids};
    return this.http.delete<MaritalStatus[]>(`${this.baseUrl}/marital-status/delete`, options);
  }
}
