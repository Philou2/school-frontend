import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {CycleYear} from '../interface/cycle-year';

@Injectable({
  providedIn: 'root'
})
export class CycleYearService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: CycleYear): Observable<any>{
    return this.http.post(`${this.baseUrl}/cycle-year/create`, data);
  }

  getCollection(): Observable<CycleYear[]> {
    return this.http.get<CycleYear[]>(`${this.baseUrl}/cycle-year/get`);
  }

  put(id: number, data: CycleYear): Observable<any>{
    return this.http.put(`${this.baseUrl}/cycle-year/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/cycle-year/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<CycleYear[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/cycle-year/states`, options);

  }
}

