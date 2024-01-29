import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {SchoolYear} from '../../interface/configuration/SchoolYear';

@Injectable({
    providedIn: 'root'
})
export class SchoolYearService {

    private baseUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient) { }

    post(data: SchoolYear): Observable<any>{
        return this.http.post<SchoolYear>(`${this.baseUrl}/year/create`, data);
    }

    getCollection(): Observable<SchoolYear[]>{
        return this.http.get<SchoolYear[]>(`${this.baseUrl}/year/get`);
    }

    put(id: number, data: SchoolYear): Observable<any>{
        return this.http.put<SchoolYear>(`${this.baseUrl}/year/edit/${id}`, data);
    }

    getListStudCourseReg(studentMatricule?: string): Observable<SchoolYear[]>{
        return this.http.get<SchoolYear[]>(`${this.baseUrl}/year/get/stud-course-reg${studentMatricule ? '/' + studentMatricule : ''}`);
    }

    delete(id: number): Observable<SchoolYear>{
        return this.http.delete<SchoolYear>(`${this.baseUrl}/year/delete/` + id);
    }

    setCurrentSystemYear(id: number): Observable<SchoolYear>{
        return this.http.delete<SchoolYear>(`${this.baseUrl}/year/set/current/` + id);
    }

    setCurrentUserYear(id: number): Observable<SchoolYear>{
        return this.http.delete<SchoolYear>(`${this.baseUrl}/year/set/current/user/` + id);
    }

    deleteMultiple(ids: number[]): Observable<SchoolYear[]>{
        const options = {body: ids};
        return this.http.delete<SchoolYear[]>(`${this.baseUrl}/years/delete`, options);
    }
}
