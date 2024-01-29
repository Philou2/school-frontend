import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {Level} from '../../interface/configuration/Level';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  post(data: Level): Observable<any>{
    return this.http.post<Level>(`${this.baseUrl}/level/create`, data);
  }

  getCollection(): Observable<Level[]>{
    return this.http.get<Level[]>(`${this.baseUrl}/level/get`);
  }

  put(id: number, data: Level): Observable<any>{
    return this.http.put<Level>(`${this.baseUrl}/level/edit/${id}`, data);
  }

  delete(id: number): Observable<Level>{
    return this.http.delete<Level>(`${this.baseUrl}/level/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<Level[]>{
    const options = {body: ids};
    return this.http.delete<Level[]>(`${this.baseUrl}/delete/selected/levels`, options);
  }
}
