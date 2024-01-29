import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Program} from '../../interface/configuration/Program';
import {environment} from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: Program): Observable<any>{
    return this.http.post(`${this.baseUrl}/program/create`, data);
  }

  getCollection(): Observable<Program[]> {
    return this.http.get<Program[]>(`${this.baseUrl}/program/get`);
  }

  put(id: number, data: Program): Observable<any>{
    return this.http.put(`${this.baseUrl}/program/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/program/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<Program[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/selected/programs`, options);

  }
}
