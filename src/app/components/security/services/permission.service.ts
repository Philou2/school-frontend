import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Permission} from '../interface/permission';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  addPermission(data: Permission): Observable<any>{
    return this.http.post(`${this.baseUrl}/create/permission`, data);
  }

  importPermission(datas: any[]): Observable<any>{
    console.log(datas);
    const options = {data: datas};
    return this.http.post(`${this.baseUrl}/import/permission`, options);
  }

  updatePermission(id: number, data: Permission): Observable<any>{
    return this.http.put(`${this.baseUrl}/edit/permission/${id}`, data);
  }

  getPermissionList(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.baseUrl}/permissions`);
  }

  getPermissionListById(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/get/permission/${id}`);
  }

  deletePermission(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/delete/permission/${id}`);
  }

  deleteMultiplePermissions(ids: number[]): Observable<Permission[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/permission/states`, options);

  }
}
