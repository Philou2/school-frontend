import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {SubjectNature} from '../../interface/school/subjectNature';

@Injectable({
  providedIn: 'root'
})
export class SubjectNatureService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: SubjectNature): Observable<any>{
    return this.http.post(`${this.baseUrl}/subject-nature/create`, data);
  }

  getCollection(): Observable<SubjectNature[]> {
    return this.http.get<SubjectNature[]>(`${this.baseUrl}/subject-nature/get`);
  }

  put(id: number, data: SubjectNature): Observable<any>{
    return this.http.put(`${this.baseUrl}/subject-nature/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/subject-nature/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<SubjectNature[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/subject-nature/states`, options);

  }
}

