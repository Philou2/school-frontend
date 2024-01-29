import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {LeaveRequest} from '../interface/leave-request';

@Injectable({
  providedIn: 'root'
})
export class LeaveCharacterService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  post(data: LeaveRequest): Observable<any>{
    return this.http.post<LeaveRequest>(`${this.baseUrl}/leave-character/create`, data);
  }

  getCollection(): Observable<LeaveRequest[]>{
    return this.http.get<LeaveRequest[]>(`${this.baseUrl}/leave-character/get`);
  }

  put(id: number, data: LeaveRequest): Observable<any>{
    return this.http.put<LeaveRequest>(`${this.baseUrl}/leave-character/edit/${id}`, data);
  }

  delete(id: number): Observable<LeaveRequest>{
    return this.http.delete<LeaveRequest>(`${this.baseUrl}/leave-character/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<LeaveRequest[]>{
    const options = {body: ids};
    return this.http.delete<LeaveRequest[]>(`${this.baseUrl}/leave-character/delete`, options);
  }
}
