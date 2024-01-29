import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Region} from '../../interface/location/region';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  post(data: Region): Observable<any>{
    return this.http.post<Region>(`${this.baseUrl}/region/create`, data);
  }

  getCollection(): Observable<Region[]>{
    return this.http.get<Region[]>(`${this.baseUrl}/region/get`);
  }

  put(id: number, data: Region): Observable<any>{
    return this.http.put<Region>(`${this.baseUrl}/region/edit/${id}`, data);
  }

  delete(id: number): Observable<Region>{
    return this.http.delete<Region>(`${this.baseUrl}/region/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<Region[]>{
    const options = {body: ids};
    return this.http.delete<Region[]>(`${this.baseUrl}/region/delete`, options);
  }
}
