import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {SliceType} from '../../interface/other-settings/slice-type';

@Injectable({
  providedIn: 'root'
})
export class SliceTypeService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: SliceType): Observable<any>{
    return this.http.post(`${this.baseUrl}/slice-type/create`, data);
  }

  getCollection(): Observable<SliceType[]> {
    return this.http.get<SliceType[]>(`${this.baseUrl}/slice-type/get`);
  }

  put(id: number, data: SliceType): Observable<any>{
    return this.http.put(`${this.baseUrl}/slice-type/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/slice-type/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<SliceType[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/slice-type/states`, options);

  }
}

