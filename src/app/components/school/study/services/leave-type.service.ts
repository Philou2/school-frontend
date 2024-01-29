import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {LeaveType} from '../interface/leave-type';

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  post(data: LeaveType): Observable<any>{
    return this.http.post<LeaveType>(`${this.baseUrl}/leave-type/create`, data);
  }

  getCollection(): Observable<LeaveType[]>{
    return this.http.get<LeaveType[]>(`${this.baseUrl}/leave-type/get`);
  }

  put(id: number, data: LeaveType): Observable<any>{
    return this.http.put<LeaveType>(`${this.baseUrl}/leave-type/edit/${id}`, data);
  }

  delete(id: number): Observable<LeaveType>{
    return this.http.delete<LeaveType>(`${this.baseUrl}/leave-type/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<LeaveType[]>{
    const options = {body: ids};
    return this.http.delete<LeaveType[]>(`${this.baseUrl}/leave-type/delete`, options);
  }
}
