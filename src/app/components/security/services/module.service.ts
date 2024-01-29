import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Module} from '../interface/module';
import {environment} from '../../../../environments/environment';
import {Participant} from '../../others/interface/participant';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) { }

  addModule(data: Module): Observable<any>{
    return this.httpClient.post<Module>(`${this.baseUrl}/create/module`, data);
  }

  updateModule(id: number, data: Module): Observable<any>{
    return this.httpClient.put<Module>(`${this.baseUrl}/edit/module/${id}`, data);
  }

  getModuleList(): Observable<Module[]>{
    return this.httpClient.get<Module[]>(`${this.baseUrl}/modules`);
  }

  getUserModuleList(): Observable<Participant[]>{
    return this.httpClient.get<Participant[]>(`${this.baseUrl}/user/modules`);
  }

  deleteModule(id: number): Observable<Module>{
    return this.httpClient.delete<Module>(`${this.baseUrl}/delete/module/` + id);
  }

  deleteMultipleModule(ids: number[]): Observable<Module[]>{
    const options = {body: ids};
    return this.httpClient.delete<Module[]>(`${this.baseUrl}/delete/selected/modules`, options);
  }
}
