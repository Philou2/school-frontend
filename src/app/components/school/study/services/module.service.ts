import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Module} from '../interface/module';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  post(data: Module): Observable<any>{
    return this.http.post<Module>(`${this.baseUrl}/course-module/create`, data);
  }

  getCollection(): Observable<Module[]>{
    return this.http.get<Module[]>(`${this.baseUrl}/course-module/get`);
  }

  put(id: number, data: Module): Observable<any>{
    return this.http.put<Module>(`${this.baseUrl}/course-module/edit/${id}`, data);
  }

  delete(id: number): Observable<Module>{
    return this.http.delete<Module>(`${this.baseUrl}/course-module/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<Module[]>{
    const options = {body: ids};
    return this.http.delete<Module[]>(`${this.baseUrl}/course-module/delete`, options);
  }
}
