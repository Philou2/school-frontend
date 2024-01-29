import { Injectable } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Sequence} from '../../interface/configuration/sequence';

@Injectable({
  providedIn: 'root'
})
export class SequenceService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getList(): Observable<Sequence[]>{
    return this.http.get<Sequence[]>(`${this.baseUrl}/sequence/get`);
  }

  create(data: Sequence): Observable<any>{
    return this.http.post<Sequence>(`${this.baseUrl}/sequence/create`, data);
  }

  edit(id: number, data: Sequence): Observable<any>{
    return this.http.put<Sequence>(`${this.baseUrl}/sequence/edit/${id}`, data);
  }

  delete(id: number): Observable<Sequence>{
    return this.http.delete<Sequence>(`${this.baseUrl}/sequence/delete/` + id);
  }
}
