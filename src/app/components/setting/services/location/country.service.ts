import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Country} from '../../interface/location/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  post(data: Country): Observable<any>{
    return this.http.post<Country>(`${this.baseUrl}/country/create`, data);
  }

  getCollection(): Observable<Country[]>{
    return this.http.get<Country[]>(`${this.baseUrl}/country/get`);
  }

  put(id: number, data: Country): Observable<any>{
    return this.http.put<Country>(`${this.baseUrl}/country/edit/${id}`, data);
  }

  delete(id: number): Observable<Country>{
    return this.http.delete<Country>(`${this.baseUrl}/country/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<Country[]>{
    const options = {body: ids};
    return this.http.delete<Country[]>(`${this.baseUrl}/countries/delete`, options);
  }
}
