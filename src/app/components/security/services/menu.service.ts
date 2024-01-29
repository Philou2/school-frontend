import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Menu} from '../interface/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  addMenu(data: Menu): Observable<any>{
    return this.http.post<Menu>(`${this.baseUrl}/create/menu`, data);
  }

  updateMenu(id: number, data: Menu): Observable<any>{
    return this.http.put<Menu>(`${this.baseUrl}/edit/menu/${id}`, data);
  }

  getMenuList(): Observable<Menu[]>{
    return this.http.get<Menu[]>(`${this.baseUrl}/menus`);
  }

  deleteMenu(id: number): Observable<Menu>{
    return this.http.delete<Menu>(`${this.baseUrl}/delete/menu/` + id);
  }

  deleteMultipleMenu(ids: number[]): Observable<Menu[]>{
    const options = {body: ids};
    return this.http.delete<Menu[]>(`${this.baseUrl}/delete/selected/menus`, options);
  }
}
