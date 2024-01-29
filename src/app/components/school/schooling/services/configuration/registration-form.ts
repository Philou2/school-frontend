import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {RegistrationForm} from '../../interface/configuration/RegistrationForm';

@Injectable({
    providedIn: 'root'
})
export class RegistrationFormService {

    private baseUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient) { }

    post(data: RegistrationForm): Observable<any>{
        return this.http.post<RegistrationForm>(`${this.baseUrl}/registration-form/create`, data);
    }

    getCollection(): Observable<RegistrationForm[]>{
        return this.http.get<RegistrationForm[]>(`${this.baseUrl}/registration-form/get`);
    }

    put(id: number, data: RegistrationForm): Observable<any>{
        return this.http.put<RegistrationForm>(`${this.baseUrl}/registration-form/edit/${id}`, data);
    }

    delete(id: number): Observable<RegistrationForm>{
        return this.http.delete<RegistrationForm>(`${this.baseUrl}/registration-form/delete/` + id);
    }

    deleteMultiple(ids: number[]): Observable<RegistrationForm[]>{
        const options = {body: ids};
        return this.http.delete<RegistrationForm[]>(`${this.baseUrl}/delete/selected/registration-forms`, options);
    }
}
