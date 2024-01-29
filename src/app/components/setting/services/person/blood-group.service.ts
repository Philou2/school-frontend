import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {BloodGroup} from '../../interface/person/blood-group';

@Injectable({
    providedIn: 'root'
})
export class BloodGroupService {
    private baseUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    post(data: BloodGroup): Observable<any>{
        return this.http.post(`${this.baseUrl}/blood-group/create`, data);
    }

    getCollection(): Observable<BloodGroup[]> {
        return this.http.get<BloodGroup[]>(`${this.baseUrl}/blood-group/get`);
    }

    put(id: number, data: BloodGroup): Observable<any>{
        return this.http.put(`${this.baseUrl}/blood-group/edit/${id}`, data);
    }

    delete(id: number): Observable<any>{
        return this.http.delete(`${this.baseUrl}/blood-group/delete/${id}`);
    }

    deleteMultiple(ids: number[]): Observable<BloodGroup[]>{
        const options = {body: ids};
        return this.http.delete<any>(`${this.baseUrl}/delete/blood-group/states`, options);

    }
}

