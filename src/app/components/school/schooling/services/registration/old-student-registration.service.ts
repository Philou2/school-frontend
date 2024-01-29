import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {OldStudentRegistration} from '../../interface/registration/oldStudentRegistration';
import {environment} from '../../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OldStudentRegistrationService {
    private baseUrl = environment.apiBaseUrl;
    private oldStudentRegistrationSource = new BehaviorSubject<any>(null);
    currentOldStudentRegistration = this.oldStudentRegistrationSource.asObservable();

    constructor(private http: HttpClient) { }

    post(data: OldStudentRegistration): Observable<any>{
        return this.http.post(`${this.baseUrl}/oldstudregistration/create`, data);
    }

    getCollection(): Observable<OldStudentRegistration[]> {
        return this.http.get<OldStudentRegistration[]>(`${this.baseUrl}/get/registrations`);
    }

    put(id: number, data: OldStudentRegistration): Observable<any>{
        return this.http.put(`${this.baseUrl}/oldstudregistration/edit/${id}`, data);
    }

    delete(id: number): Observable<any>{
        return this.http.delete(`http://localhost:8000/studregistration/delete/` + id);
    }

    deleteMultiple(ids: number[]): Observable<OldStudentRegistration[]>{
        const options = {body: ids};
        return this.http.delete<any>(`${this.baseUrl}/delete/oldstudregistration/states`, options);
    }

    getStudoldregistrationList(): Observable<OldStudentRegistration[]>{
        return this.http.get<OldStudentRegistration[]>(`${this.baseUrl}/studregistration/get`);
    }

    changeOldStudentRegistration(oldStudentRegistration: any) {
        this.oldStudentRegistrationSource.next(oldStudentRegistration);
    }

}
