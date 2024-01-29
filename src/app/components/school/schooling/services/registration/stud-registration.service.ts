import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {StudRegistration} from '../../interface/registration/studRegistration';
import {environment} from '../../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudRegistrationService {
    private baseUrl = environment.apiBaseUrl;
    private studRegistrationSource = new BehaviorSubject<any>(null);
    currentStudRegistration = this.studRegistrationSource.asObservable();

    constructor(private http: HttpClient) { }

    post(data: StudRegistration): Observable<any>{
        return this.http.post(`${this.baseUrl}/studregistration/create`, data);
    }

    getCollection(): Observable<StudRegistration[]> {
        return this.http.get<StudRegistration[]>(`${this.baseUrl}/get/nullregistrations`);
    }

    importStudentRegistration(datas: any[]): Observable<any>{
        console.log(datas);
        let options = {data: datas};
        return this.http.post(`${this.baseUrl}/import/student-registration`, options);
    }

    getResignation(): Observable<StudRegistration[]> {
        return this.http.get<StudRegistration[]>(`${this.baseUrl}/get/resignations`);
    }
    getDismissal(): Observable<StudRegistration[]> {
        return this.http.get<StudRegistration[]>(`${this.baseUrl}/get/dismissals`);
    }

    getStudregistrationId(): Observable<StudRegistration[]>{
        return this.http.get<StudRegistration[]>(`${this.baseUrl}/studregistration/get`);
    }

    put(id: number, data: StudRegistration): Observable<any>{
        return this.http.put(`${this.baseUrl}/studregistration/edit/${id}`, data);
    }

    delete(id: number): Observable<any>{
        return this.http.delete(`http://localhost:8000/studregistration/delete/${id}`);
    }

    deleteMultiple(ids: number[]): Observable<StudRegistration[]>{
        const options = {body: ids};
        return this.http.delete<any>(`${this.baseUrl}/delete/studregistration/states`, options);

    }

    putMatricule(id: number, data: StudRegistration): Observable<any>{
        return this.http.put<StudRegistration>(`${this.baseUrl}/matricule/edit/${id}`, data);
    }

    putGlobal(id: number, data: StudRegistration): Observable<any>{
        return this.http.put<StudRegistration>(`${this.baseUrl}/classe/edit/${id}`, data);
    }

    postResignation(data: StudRegistration): Observable<any>{
        return this.http.post(`${this.baseUrl}/studregistration/resignation`, data);
    }

    postReadmission(data: StudRegistration): Observable<any>{
        return this.http.post(`${this.baseUrl}/studregistration/readmission`, data);
    }

    postDismissal(data: StudRegistration): Observable<any>{
        return this.http.post(`${this.baseUrl}/studregistration/dismissal`, data);
    }

    getListStudCourseReg(): Observable<StudRegistration[]>{
        return this.http.get<StudRegistration[]>(`${this.baseUrl}/studregistration/get/stud-course-reg`)
    }

    changeStudRegistration(studRegistration: any) {
        this.studRegistrationSource.next(studRegistration);
    }

}
