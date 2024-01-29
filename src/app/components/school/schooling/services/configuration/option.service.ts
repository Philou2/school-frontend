import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Option} from '../../interface/configuration/Option';
import {environment} from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: Option): Observable<any>{
    return this.http.post(`${this.baseUrl}/option/create`, data);
  }

  getCollection(): Observable<Option[]> {
    return this.http.get<Option[]>(`${this.baseUrl}/option/get`);
  }

  importOption(datas: any[]): Observable<any>{
    console.log(datas);
    const options = {data: datas};
    return this.http.post(`${this.baseUrl}/import/option`, options);
  }

  put(id: number, data: Option): Observable<any>{
    return this.http.put(`${this.baseUrl}/option/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/option/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<Option[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/selected/options`, options);

  }
}
