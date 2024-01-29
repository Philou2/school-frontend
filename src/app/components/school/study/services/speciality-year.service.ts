import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {SpecialityYear} from '../interface/speciality-year';

@Injectable({
  providedIn: 'root'
})
export class SpecialityYearService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: SpecialityYear): Observable<any>{
    return this.http.post(`${this.baseUrl}/speciality-year/create`, data);
  }

  getCollection(): Observable<SpecialityYear[]> {
    return this.http.get<SpecialityYear[]>(`${this.baseUrl}/speciality-year/get`);
  }

  put(id: number, data: SpecialityYear): Observable<any>{
    return this.http.put(`${this.baseUrl}/speciality-year/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/speciality-year/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<SpecialityYear[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/speciality-year/states`, options);

  }
}

