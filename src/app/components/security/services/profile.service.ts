import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Profile} from '../interface/profile';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) { }

  addProfile(data: Profile): Observable<any>{
    return this.httpClient.post<Profile>(`${this.baseUrl}/create/profile`, data);
  }

  updateProfile(id: number, data: Profile): Observable<any>{
    return this.httpClient.put<Profile>(`${this.baseUrl}/edit/profile/${id}`, data);
  }

  getProfileList(): Observable<Profile[]>{
    return this.httpClient.get<Profile[]>(`${this.baseUrl}/profiles`);
  }

  deleteProfile(id: number): Observable<Profile>{
    return this.httpClient.delete<Profile>(`${this.baseUrl}/delete/profile/` + id);
  }

  deleteMultipleProfile(ids: number[]): Observable<Profile[]>{
    const options = {body: ids};
    return this.httpClient.delete<Profile[]>(`${this.baseUrl}/delete/selected/profiles`, options);
  }
}
