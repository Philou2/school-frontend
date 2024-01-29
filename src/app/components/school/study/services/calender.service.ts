import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeTablePeriodService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  getCollection(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/calender/get`);
  }
}

