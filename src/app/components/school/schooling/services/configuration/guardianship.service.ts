import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Guardianship} from '../../interface/configuration/Guardianship';
import {environment} from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuardianshipService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: Guardianship): Observable<any>{
    return this.http.post(`${this.baseUrl}/guardianship/create`, data);
  }

  getCollection(): Observable<Guardianship[]> {
    return this.http.get<Guardianship[]>(`${this.baseUrl}/guardianship/get`);
  }

  put(id: number, data: Guardianship): Observable<any>{
    return this.http.put(`${this.baseUrl}/guardianship/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/guardianship/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<Guardianship[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/selected/guardianships`, options);

  }
}
