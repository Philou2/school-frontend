import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {PeriodType} from '../../interface/school/periodType';

@Injectable({
  providedIn: 'root'
})
export class PeriodTypeService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: PeriodType): Observable<any>{
    return this.http.post(`${this.baseUrl}/period-type/create`, data);
  }

  getCollection(): Observable<PeriodType[]> {
    return this.http.get<PeriodType[]>(`${this.baseUrl}/period-type/get`);
  }

  put(id: number, data: PeriodType): Observable<any>{
    return this.http.put(`${this.baseUrl}/period-type/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/period-type/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<PeriodType[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/period-type/states`, options);

  }
}

