import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Regime} from '../../interface/configuration/Regime';
import {environment} from '../../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RegimeService {
    private baseUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    post(data: Regime): Observable<any>{
        return this.http.post(`${this.baseUrl}/regime/create`, data);
    }

    getCollection(): Observable<Regime[]> {
        return this.http.get<Regime[]>(`${this.baseUrl}/regime/get`);
    }

    put(id: number, data: Regime): Observable<any>{
        return this.http.put(`${this.baseUrl}/regime/edit/${id}`, data);
    }

    delete(id: number): Observable<any>{
        return this.http.delete(`${this.baseUrl}/regime/delete/${id}`);
    }

    deleteMultiple(ids: number[]): Observable<Regime[]>{
        const options = {body: ids};
        return this.http.delete<any>(`${this.baseUrl}/delete/regime/states`, options);

    }
}

