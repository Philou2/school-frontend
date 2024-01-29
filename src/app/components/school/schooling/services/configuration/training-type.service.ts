import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {TrainingType} from '../../interface/configuration/TrainingType';

@Injectable({
    providedIn: 'root'
})
export class TrainingTypeService {

    private baseUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient) { }

    post(data: TrainingType): Observable<any>{
        return this.http.post<TrainingType>(`${this.baseUrl}/training-type/create`, data);
    }

    getCollection(): Observable<TrainingType[]>{
        return this.http.get<TrainingType[]>(`${this.baseUrl}/training-type/get`);
    }

    put(id: number, data: TrainingType): Observable<any>{
        return this.http.put<TrainingType>(`${this.baseUrl}/training-type/edit/${id}`, data);
    }

    delete(id: number): Observable<TrainingType>{
        return this.http.delete<TrainingType>(`${this.baseUrl}/training-type/delete/` + id);
    }

    deleteMultiple(ids: number[]): Observable<TrainingType[]>{
        const options = {body: ids};
        return this.http.delete<TrainingType[]>(`${this.baseUrl}/delete/selected/training-types`, options);
    }
}
