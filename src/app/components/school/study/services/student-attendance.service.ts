import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {StudentAttendance} from '../interface/student-attendance';

@Injectable({
  providedIn: 'root'
})
export class StudentAttendanceService {
  private baseUrl = environment.apiBaseUrl;
  private studentAttendanceSource = new BehaviorSubject<any>(null);

  currentStudentAttendance = this.studentAttendanceSource.asObservable();
  
  constructor(private http: HttpClient) { }
  post(attendanceids: any[], data: StudentAttendance): Observable<any>{
    console.log(data.subject)
    const options = {course: data.subject, attendanceids: attendanceids};
    return this.http.post<StudentAttendance>(`${this.baseUrl}/student-attendance/create`, options);
  }

  getCollection(): Observable<StudentAttendance[]>{
    return this.http.get<StudentAttendance[]>(`${this.baseUrl}/student-attendance/get`);
  }

  put(id: number, data: StudentAttendance): Observable<any>{
    return this.http.put<StudentAttendance>(`${this.baseUrl}/student-attendance/edit/${id}`, data);
  }

  delete(id: number): Observable<StudentAttendance>{
    return this.http.delete<StudentAttendance>(`${this.baseUrl}/student-attendance/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<StudentAttendance[]>{
    const options = {body: ids};
    return this.http.delete<StudentAttendance[]>(`${this.baseUrl}/student-attendance/delete`, options);
  }

  changeStudentAttendance(studentAttendance: any) {
    this.studentAttendanceSource.next(studentAttendance);
  }
}
