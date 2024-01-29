import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {User} from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  addUser(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/create/user`, data);
  }

  updateUser(id: number, data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/edit/user/${id}`, data);
  }

  getUserId(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/user/get/by/${id}`);
  }
  getUser(id: number, data: any): Observable<any>{
    return this.http.put(`${this.baseUrl}/get/user/${id}`, data);
  }

  getUserCollection(): Observable<any>{
    return this.http.get(`${this.baseUrl}/users`);
  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/delete/user/${id}`);
  }

  deleteMultipleUser(ids: number[]): Observable<User[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/states`, options);

  }

  userPasswordUpdate(id: number, data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/update/password/${id}`, data);
  }

  getInstitutionList(): Observable<any>{
    return this.http.get(`${this.baseUrl}/institution/get`);
  }

}
