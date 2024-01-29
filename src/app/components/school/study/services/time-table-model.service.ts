import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {TimeTableModel} from '../interface/time-table-model';
import {TimeTableModelDay} from '../interface/time-table-model-day';

@Injectable({
  providedIn: 'root'
})
export class TimeTableModelService {
  private baseUrl = environment.apiBaseUrl;
  private timetablemodelSource = new BehaviorSubject<any>(null);
  currentTimeTableModel = this.timetablemodelSource.asObservable();

  constructor(private http: HttpClient) { }

  post(data: TimeTableModel): Observable<any>{
    const options = {code: data.code, name: data.name, isTeacherAvailable: data.isTeacherAvailable,
      isRoomAvailable: data.isRoomAvailable, isHourlyVolumeAvailable: data.isHourlyVolumeAvailable, status: data.status,
      speciality: data.speciality, level: data.level, trainingType: data.trainingType, mainRoom: data.mainRoom, cycle: data.cycle,
      timeTablePeriod: data.timeTablePeriod, campus: data.campus, days: {monday: {start: data.mondayStart, end: data.mondayEnd, status: data.monday}, tuesday: {start: data.tuesdayStart, end: data.tuesdayEnd, status: data.tuesday},
      wednesday: {start: data.wednesdayStart, end: data.wednesdayEnd, status: data.wednesday}, thursday: {start: data.thursdayStart, end: data.thursdayEnd, status: data.thursday},
      friday: {start: data.fridayStart, end: data.fridayEnd, status: data.friday}, saturday: {start: data.saturdayStart, end: data.saturdayEnd, status: data.saturday}, sunday: {start: data.sundayStart, end: data.sundayEnd, status: data.sunday}},
      mondayStart: data.mondayStart, mondayEnd: data.mondayEnd, tuesdayStart: data.tuesdayStart, tuesdayEnd: data.tuesdayEnd, wednesdayStart: data.wednesdayStart, wednesdayEnd: data.wednesdayEnd,
      thursdayStart: data.thursdayStart, thursdayEnd: data.thursdayEnd, fridayStart: data.fridayStart, fridayEnd: data.fridayEnd, saturdayStart: data.saturdayStart, saturdayEnd: data.saturdayEnd,
      sundayStart: data.sundayStart, sundayEnd: data.sundayEnd, monday: data.monday, tuesday: data.tuesday, wednesday: data.wednesday, thursday: data.thursday,
    friday: data.friday, saturday: data.saturday, sunday: data.sunday, startDate: data.startDate, endDate: data.endDate};
    return this.http.post(`${this.baseUrl}/timetable-model/create`, options);
  }

  getCollection(): Observable<TimeTableModel[]> {
    return this.http.get<TimeTableModel[]>(`${this.baseUrl}/timetable-model/get`);
  }

  put(id: number, data: TimeTableModel): Observable<any>{
    const options = {code: data.code, name: data.name, isTeacherAvailable: data.isTeacherAvailable,
      isRoomAvailable: data.isRoomAvailable, isHourlyVolumeAvailable: data.isHourlyVolumeAvailable, status: data.status,
      speciality: data.speciality, level: data.level, trainingType: data.trainingType, mainRoom: data.mainRoom, cycle: data.cycle,
      timeTablePeriod: data.timeTablePeriod, campus: data.campus, days: {monday: {start: data.mondayStart, end: data.mondayEnd, status: data.monday}, tuesday: {start: data.tuesdayStart, end: data.tuesdayEnd, status: data.tuesday},
      wednesday: {start: data.wednesdayStart, end: data.wednesdayEnd, status: data.wednesday}, thursday: {start: data.thursdayStart, end: data.thursdayEnd, status: data.thursday},
      friday: {start: data.fridayStart, end: data.fridayEnd, status: data.friday}, saturday: {start: data.saturdayStart, end: data.saturdayEnd, status: data.saturday}, sunday: {start: data.sundayStart, end: data.sundayEnd, status: data.sunday}},
      mondayStart: data.mondayStart, mondayEnd: data.mondayEnd, tuesdayStart: data.tuesdayStart, tuesdayEnd: data.tuesdayEnd, wednesdayStart: data.wednesdayStart, wednesdayEnd: data.wednesdayEnd,
      thursdayStart: data.thursdayStart, thursdayEnd: data.thursdayEnd, fridayStart: data.fridayStart, fridayEnd: data.fridayEnd, saturdayStart: data.saturdayStart, saturdayEnd: data.saturdayEnd,
      sundayStart: data.sundayStart, sundayEnd: data.sundayEnd, monday: data.monday, tuesday: data.tuesday, wednesday: data.wednesday, thursday: data.thursday,
      friday: data.friday, saturday: data.saturday, sunday: data.sunday, startDate: data.startDate, endDate: data.endDate};
    return this.http.put(`${this.baseUrl}/timetable-model/edit/${id}`, options);
  }

  putValidate(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/timetable-model-validate/edit/${id}`);
  }
  putPublish(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/timetable-model-publish/edit/${id}`);
  }
  putUnPublish(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/timetable-model-unpublish/edit/${id}`);
  }
  putDuplicate(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/timetable-model-duplicate/edit/${id}`);
  }

  putInValidate(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/timetable-model-invalidate/edit/${id}`);
  }

  postPublish(data: TimeTableModel): Observable<any>{
    return this.http.post<TimeTableModel>(`${this.baseUrl}/timetable-model-publish/create`, data);
  }


  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/timetable-model/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<TimeTableModel[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/timetable-model/states`, options);

  }
  changeTimeTableModel(timetablemodel: any) {
    this.timetablemodelSource.next(timetablemodel);
  }

}

