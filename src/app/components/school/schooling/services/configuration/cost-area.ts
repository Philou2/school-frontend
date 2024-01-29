import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {CostArea} from '../../interface/configuration/CostArea';

@Injectable({
    providedIn: 'root'
})
export class CostAreaService {

    private baseUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient) { }

    post(data: CostArea): Observable<any>{
        return this.http.post<CostArea>(`${this.baseUrl}/cost-area/create`, data);
    }

    getCollection(): Observable<CostArea[]>{
        return this.http.get<CostArea[]>(`${this.baseUrl}/cost-area/get`);
    }

    put(id: number, data: CostArea): Observable<any>{
        return this.http.put<CostArea>(`${this.baseUrl}/cost-area/edit/${id}`, data);
    }

    delete(id: number): Observable<CostArea>{
        return this.http.delete<CostArea>(`${this.baseUrl}/cost-area/delete/` + id);
    }

    deleteMultiple(ids: number[]): Observable<CostArea[]>{
        const options = {body: ids};
        return this.http.delete<CostArea[]>(`${this.baseUrl}/delete/selected/cost-areas`, options);
    }
}
