import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Family} from '../../interface/registration/family';
import {environment} from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: Family): Observable<any>{
    return this.http.post(`${this.baseUrl}/family/create`, data);
  }

  getCollection(): Observable<Family[]> {
    return this.http.get<Family[]>(`${this.baseUrl}/family/get`);
  }

  put(id: number, data: Family): Observable<any>{
    return this.http.put(`${this.baseUrl}/family/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/family/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<Family[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/family/states`, options);

  }
}

