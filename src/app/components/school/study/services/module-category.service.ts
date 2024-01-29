import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {ModuleCategory} from '../interface/module-category';

@Injectable({
  providedIn: 'root'
})
export class ModuleCategoryService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  post(data: ModuleCategory): Observable<any>{
    return this.http.post<ModuleCategory>(`${this.baseUrl}/module-category/create`, data);
  }

  getCollection(): Observable<ModuleCategory[]>{
    return this.http.get<ModuleCategory[]>(`${this.baseUrl}/module-category/get`);
  }

  put(id: number, data: ModuleCategory): Observable<any>{
    return this.http.put<ModuleCategory>(`${this.baseUrl}/module-category/edit/${id}`, data);
  }

  delete(id: number): Observable<ModuleCategory>{
    return this.http.delete<ModuleCategory>(`${this.baseUrl}/module-category/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<ModuleCategory[]>{
    const options = {body: ids};
    return this.http.delete<ModuleCategory[]>(`${this.baseUrl}/module-category/delete`, options);
  }
}
