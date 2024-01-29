import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {LeaveRequest} from '../interface/leave-request';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestServiceService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  post(data: LeaveRequest): Observable<any>{
    return this.http.post<LeaveRequest>(`${this.baseUrl}/leave-request/create`, data);
  }

  getCollection(): Observable<LeaveRequest[]>{
    return this.http.get<LeaveRequest[]>(`${this.baseUrl}/leave-request/get`);
  }

  put(id: number, data: LeaveRequest): Observable<any>{
    return this.http.put<LeaveRequest>(`${this.baseUrl}/leave-request/edit/${id}`, data);
  }

  delete(id: number): Observable<LeaveRequest>{
    return this.http.delete<LeaveRequest>(`${this.baseUrl}/leave-request/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<LeaveRequest[]>{
    const options = {body: ids};
    return this.http.delete<LeaveRequest[]>(`${this.baseUrl}/leave-request/delete`, options);
  }
}
