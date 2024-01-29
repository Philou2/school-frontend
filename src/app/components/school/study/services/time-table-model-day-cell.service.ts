import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {TimeTableModelDayCell} from "../interface/time-table-model-day-cell";


@Injectable({
  providedIn: 'root'
})
export class TimeTableModelDayCellService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: TimeTableModelDayCell): Observable<any>{
    return this.http.post(`${this.baseUrl}/timetable-model-day-cell/create`, data);
  }

  getCollection(): Observable<TimeTableModelDayCell[]> {
    return this.http.get<TimeTableModelDayCell[]>(`${this.baseUrl}/timetable-model-day-cell/get`);
  }
  getCollectionCurrentTeacher(): Observable<TimeTableModelDayCell[]> {
    return this.http.get<TimeTableModelDayCell[]>(`${this.baseUrl}/current-teacher-course-registration/get`);
  }
  putGeneral(id: number, data: TimeTableModelDayCell): Observable<any>{
    return this.http.put(`${this.baseUrl}/timetable-model-day-cell/edit/${id}`, data);
  }
  put(id: number, id2: number): Observable<any>{
    const reqData: any = {
      daycell1: id,
      daycell2: id2
    };
    return this.http.post(`${this.baseUrl}/timetable-model-swap/permute`, reqData);
  }
  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/timetable-model-day-cell/delete/${id}`);
  }

  getCalendar(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/calender/get/${id}`);
  }

  getCalendarCurrentUser(): Observable<any>{
    return this.http.get(`${this.baseUrl}/calender-current-user/get`);
  }
  getCalendarCurrentCourses(): Observable<any>{
    return this.http.get(`${this.baseUrl}/current-teacher-today-courses/get`);
  }

  putValidate(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/teacher-course-validate/edit/${id}`);
  }
  putInValidate(id: number): Observable<any>{
        return this.http.delete(`${this.baseUrl}/teacher-course-invalidate/edit/${id}`);
    }
    putStartCourse(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/teacher-course-start-time/edit/${id}`);
  }

  putEndCourse(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/teacher-course-end-time/edit/${id}`);
  }
  deleteMultiple(ids: number[]): Observable<TimeTableModelDayCell[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/timetable-model-day-cell/states`, options);

  }
}

