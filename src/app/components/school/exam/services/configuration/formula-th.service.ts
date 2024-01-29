import { Injectable } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormulaTh} from '../../interface/configuration/formula-th';

@Injectable({
  providedIn: 'root'
})
export class FormulaThService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getList(): Observable<FormulaTh[]>{
    return this.http.get<FormulaTh[]>(`${this.baseUrl}/formula-th/get`);
  }

  create(data: FormulaTh): Observable<any>{
    return this.http.post<FormulaTh>(`${this.baseUrl}/formula-th/create`, data);
  }

  edit(id: number, data: FormulaTh): Observable<any>{
    return this.http.put<FormulaTh>(`${this.baseUrl}/formula-th/edit/${id}`, data);
  }

  delete(id: number): Observable<FormulaTh>{
    return this.http.delete<FormulaTh>(`${this.baseUrl}/formula-th/delete/` + id);
  }
}
