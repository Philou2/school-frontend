import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {PensionBracket} from '../../interface/configuration/PensionBracket';

@Injectable({
    providedIn: 'root'
})
export class PensionBracketService {

    private baseUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient) { }

    post(data: PensionBracket): Observable<any>{
        return this.http.post<PensionBracket>(`${this.baseUrl}/pension-bracket/create`, data);
    }

    getCollection(): Observable<PensionBracket[]>{
        return this.http.get<PensionBracket[]>(`${this.baseUrl}/pension-bracket/get`);
    }

    put(id: number, data: PensionBracket): Observable<any>{
        return this.http.put<PensionBracket>(`${this.baseUrl}/pension-bracket/edit/${id}`, data);
    }

    delete(id: number): Observable<PensionBracket>{
        return this.http.delete<PensionBracket>(`${this.baseUrl}/pension-bracket/delete/` + id);
    }

    deleteMultiple(ids: number[]): Observable<PensionBracket[]>{
        const options = {body: ids};
        return this.http.delete<PensionBracket[]>(`${this.baseUrl}/delete/selected/pension-brackets`, options);
    }
}
