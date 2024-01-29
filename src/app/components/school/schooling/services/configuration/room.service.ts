import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Room} from '../../interface/configuration/Room';
import {environment} from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  post(data: Room): Observable<any>{
    return this.http.post(`${this.baseUrl}/room/create`, data);
  }

  getCollection(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/room/get`);
  }

  put(id: number, data: Room): Observable<any>{
    return this.http.put(`${this.baseUrl}/room/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/room/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<Room[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/selected/rooms`, options);

  }
}
