import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Religion} from '../../interface/person/religion';

@Injectable({
  providedIn: 'root'
})
export class ReligionService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  post(data: Religion): Observable<any>{
    return this.http.post<Religion>(`${this.baseUrl}/religion/create`, data);
  }

  getCollection(): Observable<Religion[]>{
    return this.http.get<Religion[]>(`${this.baseUrl}/religion/get`);
  }

  put(id: number, data: Religion): Observable<any>{
    return this.http.put<Religion>(`${this.baseUrl}/religion/edit/${id}`, data);
  }

  delete(id: number): Observable<Religion>{
    return this.http.delete<Religion>(`${this.baseUrl}/religion/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<Religion[]>{
    const options = {body: ids};
    return this.http.delete<Religion[]>(`${this.baseUrl}/religion/delete`, options);
  }
}
