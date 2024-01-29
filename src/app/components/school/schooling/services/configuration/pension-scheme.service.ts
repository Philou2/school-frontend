import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {PensionScheme} from '../../interface/configuration/PensionScheme';

@Injectable({
    providedIn: 'root'
})
export class PensionSchemeService {

    private baseUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient) { }

    post(data: PensionScheme): Observable<any>{
        return this.http.post<PensionScheme>(`${this.baseUrl}/pension-scheme/create`, data);
    }

    getCollection(): Observable<PensionScheme[]>{
        return this.http.get<PensionScheme[]>(`${this.baseUrl}/pension-scheme/get`);
    }

    put(id: number, data: PensionScheme): Observable<any>{
        return this.http.put<PensionScheme>(`${this.baseUrl}/pension-scheme/edit/${id}`, data);
    }

    delete(id: number): Observable<PensionScheme>{
        return this.http.delete<PensionScheme>(`${this.baseUrl}/pension-scheme/delete/` + id);
    }

    deleteMultiple(ids: number[]): Observable<PensionScheme[]>{
        const options = {body: ids};
        return this.http.delete<PensionScheme[]>(`${this.baseUrl}/delete/selected/pension-schemes`, options);
    }
}
