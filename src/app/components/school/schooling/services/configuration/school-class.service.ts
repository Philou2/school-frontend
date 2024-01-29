import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {SchoolClass} from '../../interface/configuration/schoolClass';

@Injectable({
    providedIn: 'root'
})
export class SchoolClassService {

    private baseUrl = environment.apiBaseUrl;
    private schoolClassSource = new BehaviorSubject<any>(null);
    currentSchoolClass = this.schoolClassSource.asObservable();
    constructor(private http: HttpClient) { }

    post(data: SchoolClass): Observable<any>{
        return this.http.post<SchoolClass>(`${this.baseUrl}/class/create`, data);
    }

    getCollection(): Observable<SchoolClass[]>{
        return this.http.get<SchoolClass[]>(`${this.baseUrl}/class/get`);
    }

    getClassCollection(): Observable<SchoolClass[]>{
        return this.http.get<SchoolClass[]>(`${this.baseUrl}/classes/get`);
    }

    put(id: number, data: SchoolClass): Observable<any>{
        return this.http.put<SchoolClass>(`${this.baseUrl}/class/edit/${id}`, data);
    }

    delete(id: number): Observable<SchoolClass>{
        return this.http.delete<SchoolClass>(`${this.baseUrl}/class/delete/` + id);
    }

    deleteMultiple(ids: number[]): Observable<SchoolClass[]>{
        const options = {body: ids};
        return this.http.delete<SchoolClass[]>(`${this.baseUrl}/delete/selected/classes`, options);
    }
    changeSchoolClass(schoolClass: any){ this.schoolClassSource.next(schoolClass);
    }
}
