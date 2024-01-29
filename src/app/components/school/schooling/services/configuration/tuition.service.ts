import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Tuition} from '../../interface/configuration/Tuition';
import {environment} from '../../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TuitionService {
    private baseUrl = environment.apiBaseUrl;
    private tuitionSource = new BehaviorSubject<any>(null);
    currentTuition = this.tuitionSource.asObservable();

    constructor(private http: HttpClient) { }

    post(data: Tuition): Observable<any>{
        return this.http.post(`${this.baseUrl}/tuition/create`, data);
    }

    getCollection(): Observable<Tuition[]> {
        return this.http.get<Tuition[]>(`${this.baseUrl}/tuition/get`);
    }

    put(id: number, data: Tuition): Observable<any>{
        return this.http.put(`${this.baseUrl}/tuition/edit/${id}`, data);
    }

    delete(id: number): Observable<any>{
        return this.http.delete(`${this.baseUrl}/tuition/delete/${id}`);
    }

    deleteMultiple(ids: number[]): Observable<Tuition[]>{
        const options = {body: ids};
        return this.http.delete<any>(`${this.baseUrl}/delete/selected/tuitions`, options);

    }

    changeTuition(tuition: any) {
        this.tuitionSource.next(tuition);
    }
}
