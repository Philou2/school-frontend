import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {Observable} from 'rxjs';
import {EvaluationPeriod} from '../../interface/configuration/evaluation-period';

@Injectable({
  providedIn: 'root'
})
export class EvaluationPeriodService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getList(): Observable<EvaluationPeriod[]>{
    return this.http.get<EvaluationPeriod[]>(`${this.baseUrl}/evaluation-period/get`);
  }

  create(data: EvaluationPeriod): Observable<any>{
    return this.http.post<EvaluationPeriod>(`${this.baseUrl}/evaluation-period/create`, data);
  }

  edit(id: number, data: EvaluationPeriod): Observable<any>{
    return this.http.put<EvaluationPeriod>(`${this.baseUrl}/evaluation-period/edit/${id}`, data);
  }

  delete(id: number): Observable<EvaluationPeriod>{
    return this.http.delete<EvaluationPeriod>(`${this.baseUrl}/evaluation-period/delete/` + id);
  }
}
