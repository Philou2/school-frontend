import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {EmploymentStatus} from '../../interface/hr/employmentStatus';

@Injectable({
  providedIn: 'root'
})
export class EmploymentStatusService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  post(data: EmploymentStatus): Observable<any>{
    return this.http.post<EmploymentStatus>(`${this.baseUrl}/employment-status/create`, data);
  }

  getCollection(): Observable<EmploymentStatus[]>{
    return this.http.get<EmploymentStatus[]>(`${this.baseUrl}/employment-status/get`);
  }

  put(id: number, data: EmploymentStatus): Observable<any>{
    return this.http.put<EmploymentStatus>(`${this.baseUrl}/employment-status/edit/${id}`, data);
  }

  delete(id: number): Observable<EmploymentStatus>{
    return this.http.delete<EmploymentStatus>(`${this.baseUrl}/employment-status/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<EmploymentStatus[]>{
    const options = {body: ids};
    return this.http.delete<EmploymentStatus[]>(`${this.baseUrl}/employment-status/delete`, options);
  }
}
