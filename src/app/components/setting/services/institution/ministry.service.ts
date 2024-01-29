import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Ministry} from '../../interface/institution/Ministry';

@Injectable({
  providedIn: 'root'
})
export class MinistryService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: Ministry): Observable<any>{
    return this.http.post(`${this.baseUrl}/ministry/create`, data);
  }

  getCollection(): Observable<Ministry[]> {
    return this.http.get<Ministry[]>(`${this.baseUrl}/ministry/get`);
  }

  put(id: number, data: Ministry): Observable<any>{
    return this.http.put(`${this.baseUrl}/ministry/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/ministry/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<Ministry[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/ministry/states`, options);

  }
}

