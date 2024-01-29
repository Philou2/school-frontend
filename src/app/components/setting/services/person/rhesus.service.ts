import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Rhesus} from '../../interface/person/rhesus';

@Injectable({
  providedIn: 'root'
})
export class RhesusService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  post(data: Rhesus): Observable<any>{
    return this.http.post<Rhesus>(`${this.baseUrl}/rhesus/create`, data);
  }

  getCollection(): Observable<Rhesus[]>{
    return this.http.get<Rhesus[]>(`${this.baseUrl}/rhesus/get`);
  }

  put(id: number, data: Rhesus): Observable<any>{
    return this.http.put<Rhesus>(`${this.baseUrl}/rhesus/edit/${id}`, data);
  }

  delete(id: number): Observable<Rhesus>{
    return this.http.delete<Rhesus>(`${this.baseUrl}/rhesus/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<Rhesus[]>{
    const options = {body: ids};
    return this.http.delete<Rhesus[]>(`${this.baseUrl}/rhesus/delete`, options);
  }
}
