import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Institution} from '../interface/institution';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  getInstitutionList(): Observable<any>{
    return this.http.get(`${this.baseUrl}/institution/get`);
  }

  getInstitutionId(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/institution/get/by/${id}`);
  }
  addInstitution(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/institution/create`, data);
  }

  updateInstitution(id: number, data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/institution/edit/${id}`, data);
  }

  deleteInstitution(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/institution/delete/${id}`);
  }

  deleteMultipleInstitutions(ids: number[]): Observable<Institution[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/states`, options);

  }

  getManagerTypeList(): Observable<any>{
    return this.http.get(`${this.baseUrl}/manager-type/get`);
  }

  getCountryList(): Observable<any>{
    return this.http.get(`${this.baseUrl}/country/get`);
  }

}
