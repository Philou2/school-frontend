import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Teacher} from '../interface/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseUrl = environment.apiBaseUrl;
  private teacherSource = new BehaviorSubject<any>(null);
  currentTeacher = this.teacherSource.asObservable();
  
  constructor(private http: HttpClient) { }
  post(data: Teacher): Observable<any>{
    return this.http.post<Teacher>(`${this.baseUrl}/teacher/create`, data);
  }

  getCollection(): Observable<Teacher[]>{
    return this.http.get<Teacher[]>(`${this.baseUrl}/teacher/get`);
  }

  importTeacher(datas: any[]): Observable<any>{
    console.log(datas);
    let options = {data: datas};
    return this.http.post(`${this.baseUrl}/import/teacher`, options);
  }

  put(id: number, data: Teacher): Observable<any>{
    return this.http.put<Teacher>(`${this.baseUrl}/teacher/edit/${id}`, data);
  }

  delete(id: number): Observable<Teacher>{
    return this.http.delete<Teacher>(`${this.baseUrl}/teacher/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<Teacher[]>{
    const options = {body: ids};
    return this.http.delete<Teacher[]>(`${this.baseUrl}/teacher/delete`, options);
  }

  assignTeacher(id: number): Observable<Teacher>{
    return this.http.delete<Teacher>(`${this.baseUrl}/assign/teacher/` + id);
  }
  assignTeachers(ids: number[]): Observable<Teacher[]>{
    const options = {body: ids};
    return this.http.delete<Teacher[]>(`${this.baseUrl}/assign/teachers`, options);
  }
  changeTeacher(teacher: any) {
    this.teacherSource.next(teacher);
  }
}
