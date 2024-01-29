import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {ClassYear} from '../interface/class-year';

@Injectable({
  providedIn: 'root'
})
export class ClassYearService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: ClassYear): Observable<any>{
    return this.http.post(`${this.baseUrl}/class-year/create`, data);
  }

  getCollection(): Observable<ClassYear[]> {
    return this.http.get<ClassYear[]>(`${this.baseUrl}/class-year/get`);
  }

  put(id: number, data: ClassYear): Observable<any>{
    return this.http.put(`${this.baseUrl}/class-year/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/class-year/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<ClassYear[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/class-year/states`, options);

  }
}

