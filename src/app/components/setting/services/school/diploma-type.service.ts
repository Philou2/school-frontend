import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {DiplomaType} from '../../interface/school/diplomaType';

@Injectable({
  providedIn: 'root'
})
export class DiplomaTypeService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: DiplomaType): Observable<any>{
    return this.http.post(`${this.baseUrl}/diploma-type/create`, data);
  }

  getCollection(): Observable<DiplomaType[]> {
    return this.http.get<DiplomaType[]>(`${this.baseUrl}/diploma-type/get`);
  }

  put(id: number, data: DiplomaType): Observable<any>{
    return this.http.put(`${this.baseUrl}/diploma-type/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/diploma-type/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<DiplomaType[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/diploma-type/states`, options);

  }
}

