import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {HourlyUnit} from '../../interface/other-settings/hourly-unit';

@Injectable({
  providedIn: 'root'
})
export class HourlyUnitService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: HourlyUnit): Observable<any>{
    return this.http.post(`${this.baseUrl}/hourly-unit/create`, data);
  }

  getCollection(): Observable<HourlyUnit[]> {
    return this.http.get<HourlyUnit[]>(`${this.baseUrl}/hourly-unit/get`);
  }

  put(id: number, data: HourlyUnit): Observable<any>{
    return this.http.put(`${this.baseUrl}/hourly-unit/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/hourly-unit/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<HourlyUnit[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/hourly-unit/states`, options);

  }
}

