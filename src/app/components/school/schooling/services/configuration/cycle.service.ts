import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Cycle} from '../../interface/configuration/Cycle';
import {environment} from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CycleService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: Cycle): Observable<any>{
    return this.http.post(`${this.baseUrl}/cycle/create`, data);
  }

  getCollection(): Observable<Cycle[]> {
    return this.http.get<Cycle[]>(`${this.baseUrl}/cycle/get`);
  }

  importCycle(datas: any[]): Observable<any>{
    console.log(datas);
    let options = {data: datas};
    return this.http.post(`${this.baseUrl}/import/cycle`, options);
  }

  put(id: number, data: Cycle): Observable<any>{
    return this.http.put(`${this.baseUrl}/cycle/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/cycle/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<Cycle[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/selected/cycles`, options);

  }
}

