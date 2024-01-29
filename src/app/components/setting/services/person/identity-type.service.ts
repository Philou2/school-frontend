import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {IdentityType} from '../../interface/person/identityType';

@Injectable({
  providedIn: 'root'
})
export class IdentityTypeService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  post(data: IdentityType): Observable<any>{
    return this.http.post<IdentityType>(`${this.baseUrl}/identity-type/create`, data);
  }

  getCollection(): Observable<IdentityType[]>{
    return this.http.get<IdentityType[]>(`${this.baseUrl}/identity-type/get`);
  }

  put(id: number, data: IdentityType): Observable<any>{
    return this.http.put<IdentityType>(`${this.baseUrl}/identity-type/edit/${id}`, data);
  }

  delete(id: number): Observable<IdentityType>{
    return this.http.delete<IdentityType>(`${this.baseUrl}/identity-type/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<IdentityType[]>{
    const options = {body: ids};
    return this.http.delete<IdentityType[]>(`${this.baseUrl}/identity-type/delete`, options);
  }
}
