import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TimeTablePeriod} from 'src/app/components/school/study/interface/time-table-period';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeTablePeriodService {
  private baseUrl = environment.apiBaseUrl;


  constructor(private http: HttpClient) { }

  post(data: TimeTablePeriod): Observable<any>{
    return this.http.post(`${this.baseUrl}/timetable-period/create`, data);
  }

  getCollection(): Observable<TimeTablePeriod[]> {
    return this.http.get<TimeTablePeriod[]>(`${this.baseUrl}/timetable-period/get`);
  }

  put(id: number, data: TimeTablePeriod): Observable<any>{
    return this.http.put(`${this.baseUrl}/timetable-period/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/timetable-period/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<TimeTablePeriod[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/timetable-period/states`, options);

  }
}

