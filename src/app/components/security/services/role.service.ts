import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Role} from '../interface/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl = environment.apiBaseUrl;

  private roleSource = new BehaviorSubject<any>(null);
  currentRole = this.roleSource.asObservable();

  constructor(private http: HttpClient) { }

  addRole(permissionids: any[], data: Role): Observable<any>{
    const options = {name: data.name, permissionids: permissionids};
    return this.http.post<Role>(`${this.baseUrl}/create/role`, options);
  }

  updateRole(id: number, permissionids: any[], data: Role): Observable<any>{
    const options = {name: data.name, permissionids: permissionids};
    return this.http.put<Role>(`${this.baseUrl}/edit/profile/${id}`, options);
  }

  getCustomList(id: number): Observable<Role[]>{
    return this.http.get<Role[]>(`${this.baseUrl}/get/profile/` + id);
  }

  getCustomRoleList(): Observable<Role[]>{
    return this.http.get<Role[]>(`${this.baseUrl}/get/custom/roles`);
  }

  deleteRole(id: number): Observable<Role>{
    return this.http.delete<Role>(`${this.baseUrl}/delete/role/` + id);
  }

  getRoleId(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/get/role/${id}`);
  }

  deleteMultipleRoles(ids: number[]): Observable<Role[]>{
    const options = {body: ids};
    return this.http.delete<Role[]>(`${this.baseUrl}/delete/roles`, options);
  }

}
