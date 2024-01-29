import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Year} from '../interface/Year';

@Injectable({
    providedIn: 'root'
})
export class YearService {

    private baseUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient) { }

    post(data: Year): Observable<any>{
        return this.http.post<Year>(`${this.baseUrl}/year/create`, data);
    }

    getCollection(): Observable<Year[]>{
        return this.http.get<Year[]>(`${this.baseUrl}/year/get`);
    }

    put(id: number, data: Year): Observable<any>{
        return this.http.put<Year>(`${this.baseUrl}/year/edit/${id}`, data);
    }

    getListStudCourseReg(studentMatricule?: string): Observable<Year[]>{
        return this.http.get<Year[]>(`${this.baseUrl}/year/get/stud-course-reg${studentMatricule ? '/' + studentMatricule : ''}`);
    }

    delete(id: number): Observable<Year>{
        return this.http.delete<Year>(`${this.baseUrl}/year/delete/` + id);
    }

    setCurrentSystemYear(id: number): Observable<Year>{
        return this.http.delete<Year>(`${this.baseUrl}/year/set/current/` + id);
    }

    setCurrentUserYear(id: number): Observable<Year>{
        return this.http.get<Year>(`${this.baseUrl}/year/set/current/user/` + id);
    }

    deleteMultiple(ids: number[]): Observable<Year[]>{
        const options = {body: ids};
        return this.http.delete<Year[]>(`${this.baseUrl}/years/delete`, options);
    }
}
