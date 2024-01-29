import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {TimeTableModelDay} from "../interface/time-table-model-day";
import {SubjectType} from "../interface/subject-type";

@Injectable({
  providedIn: 'root'
})
export class TimeTableModelDayService {
  private baseUrl = environment.apiBaseUrl;

  private modelDaySource = new BehaviorSubject<any>(null);
  currentModelDay = this.modelDaySource.asObservable();

  constructor(private http: HttpClient) { }

/*  post(data: TimeTableModelDay): Observable<any>{
    return this.http.post(`${this.baseUrl}/timetable-model-day/create`, data);
  }*/

  post(data: TimeTableModelDay): Observable<any>{
    return this.http.post<TimeTableModelDay>(`${this.baseUrl}/timetable-model-day/create`, data);
  }

  getCollection(): Observable<TimeTableModelDay[]> {
    return this.http.get<TimeTableModelDay[]>(`${this.baseUrl}/timetable-model-day/get`);
  }

  put(id: number, data: TimeTableModelDay): Observable<any>{
    return this.http.put(`${this.baseUrl}/timetable-model-day/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/timetable-model-day/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<TimeTableModelDay[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/timetable-model-day/states`, options);
  }

  changeModelDay(modelDay: any) {
    this.modelDaySource.next(modelDay);
  }
}

