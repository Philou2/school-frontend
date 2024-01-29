import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {GenerateTimeTable} from '../interface/generate-time-table';

@Injectable({
  providedIn: 'root'
})
export class GenerateTimeTableService {
  private baseUrl = environment.apiBaseUrl;
  private generateTimetableSource = new BehaviorSubject<any>(null);
  currentGenerateTimeTable = this.generateTimetableSource.asObservable();

  constructor(private http: HttpClient) { }

  post(data: GenerateTimeTable): Observable<any>{
    return this.http.post<GenerateTimeTable>(`${this.baseUrl}/generate-timetable/create`, data);
  }

  getCollection(): Observable<GenerateTimeTable[]> {
    return this.http.get<GenerateTimeTable[]>(`${this.baseUrl}/generate-timetable/get`);
  }

  put(id: number, data: GenerateTimeTable): Observable<any>{
    return this.http.put<GenerateTimeTable>(`${this.baseUrl}/generate-timetable/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/generate-timetable/delete/${id}`);
  }

  deleteMultiple(ids: number[]): Observable<GenerateTimeTable[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/generate-timetable/states`, options);

  }
  changeGenerateTimeTable(generatetimetable: any) {
    this.generateTimetableSource.next(generatetimetable);
  }

}

