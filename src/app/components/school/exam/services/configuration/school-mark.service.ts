import { Injectable } from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SchoolMark} from '../../interface/configuration/school-mark';
@Injectable({
  providedIn: 'root'
})
export class SchoolMarkService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getList(): Observable<SchoolMark[]>{
    return this.http.get<SchoolMark[]>(`${this.baseUrl}/school/mark/get`);
  }

  getMarkList(studentMatricule?: string): Observable<SchoolMark[]>{
    return this.http.get<SchoolMark[]>(`${this.baseUrl}/school/mark/get/mark${studentMatricule ? '/' + studentMatricule : ''}`);
  }

  openOrCloseMarkEntry(ids: any): Observable<any>{
    return this.http.post<any>(`http://localhost:8000/school/mark/openOrCloseMarkEntry/${ids}`, null);
  }

  create(data: SchoolMark): Observable<any>{
    return this.http.post<SchoolMark>(`${this.baseUrl}/school/mark/create`, data);
  }

  editMark(urlData: any): Observable<any>{
    return this.http.get<any>(`http://localhost:8000/school/mark/edit/mark/${urlData}`);
  }

  reset(schoolMarkIds: any): Observable<any>{
    return this.http.post<any>(`http://localhost:8000/school/mark/anonymity/reset`,
      schoolMarkIds
    );
  }

  generateCurrentSubjectAnonymity(anonymities: any): Observable<any>{
    return this.http.post<any>(`http://localhost:8000/school/mark/anonymity/generate`,
      anonymities
    );
  }

  delete(id: number): Observable<SchoolMark>{
    return this.http.delete<SchoolMark>(`${this.baseUrl}/school/mark/delete/` + id);
  }
}
