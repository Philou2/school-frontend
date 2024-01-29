import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {Diploma} from '../../interface/configuration/diploma';

@Injectable({
    providedIn: 'root'
})
export class DiplomaService {

    private baseUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient) { }

    post(data: Diploma): Observable<any>{
        return this.http.post<Diploma>(`${this.baseUrl}/diploma/create`, data);
    }

    getCollection(): Observable<Diploma[]>{
        return this.http.get<Diploma[]>(`${this.baseUrl}/diploma/get`);
    }

    put(id: number, data: Diploma): Observable<any>{
        return this.http.put<Diploma>(`${this.baseUrl}/diploma/edit/${id}`, data);
    }

    delete(id: number): Observable<Diploma>{
        return this.http.delete<Diploma>(`${this.baseUrl}/diploma/delete/` + id);
    }

    deleteMultiple(ids: number[]): Observable<Diploma[]>{
        const options = {body: ids};
        return this.http.delete<Diploma[]>(`${this.baseUrl}/diplomas/delete`, options);
    }
}
