import { Injectable } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NoteType} from '../../interface/configuration/noteType';

@Injectable({
  providedIn: 'root'
})
export class NoteTypeService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getNoteTypeList(): Observable<NoteType[]>{
    return this.http.get<NoteType[]>(`${this.baseUrl}/note-type/get`);
  }

  create(data: NoteType): Observable<any>{
    return this.http.post<NoteType>(`${this.baseUrl}/note-type/create`, data);
  }

  edit(id: number, data: NoteType): Observable<any>{
    return this.http.put<NoteType>(`${this.baseUrl}/note-type/edit/${id}`, data);
  }

  delete(id: number): Observable<NoteType>{
    return this.http.delete<NoteType>(`${this.baseUrl}/note-type/delete/` + id);
  }
}
