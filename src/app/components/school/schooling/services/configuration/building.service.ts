import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Building} from '../../interface/configuration/Building';
import {environment} from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: Building): Observable<any>{
    return this.http.post(`${this.baseUrl}/building/create`, data);
  }

  getCollection(): Observable<Building[]> {
    return this.http.get<Building[]>(`${this.baseUrl}/building/get`);
  }

  put(id: number, data: Building): Observable<any>{
    return this.http.put(`${this.baseUrl}/building/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/building/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<Building[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/selected/buildings`, options);

  }
}

