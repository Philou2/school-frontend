import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {ManagerType} from '../../interface/institution/ManagerType';

@Injectable({
  providedIn: 'root'
})
export class ManagerTypeService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: ManagerType): Observable<any>{
    return this.http.post(`${this.baseUrl}/manager-type/create`, data);
  }

  getCollection(): Observable<ManagerType[]> {
    return this.http.get<ManagerType[]>(`${this.baseUrl}/manager-type/get`);
  }

  put(id: number, data: ManagerType): Observable<any>{
    return this.http.put(`${this.baseUrl}/manager-type/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/manager-type/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<ManagerType[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/manager-type/states`, options);

  }
}

