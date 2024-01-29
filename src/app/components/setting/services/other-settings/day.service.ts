import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Day} from '../../interface/other-settings/day';

@Injectable({
  providedIn: 'root'
})
export class DayService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: Day): Observable<any>{
    return this.http.post(`${this.baseUrl}/day/create`, data);
  }

  getCollection(): Observable<Day[]> {
    return this.http.get<Day[]>(`${this.baseUrl}/day/get`);
  }

  put(id: number, data: Day): Observable<any>{
    return this.http.put(`${this.baseUrl}/day/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/day/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<Day[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/day/states`, options);

  }
}

