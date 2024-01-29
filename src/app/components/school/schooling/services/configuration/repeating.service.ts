import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {Repeating} from '../../interface/configuration/Repeating';

@Injectable({
    providedIn: 'root'
})
export class RepeatingService {

    private baseUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient) { }

    post(data: Repeating): Observable<any>{
        return this.http.post<Repeating>(`${this.baseUrl}/repeating/create`, data);
    }

    getCollection(): Observable<Repeating[]>{
        return this.http.get<Repeating[]>(`${this.baseUrl}/repeating/get`);
    }

    put(id: number, data: Repeating): Observable<any>{
        return this.http.put<Repeating>(`${this.baseUrl}/repeating/edit/${id}`, data);
    }

    delete(id: number): Observable<Repeating>{
        return this.http.delete<Repeating>(`${this.baseUrl}/repeating/delete/` + id);
    }

    deleteMultiple(ids: number[]): Observable<Repeating[]>{
        const options = {body: ids};
        return this.http.delete<Repeating[]>(`${this.baseUrl}/repeatings/delete`, options);
    }
}
