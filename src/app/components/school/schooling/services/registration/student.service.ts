import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Student} from '../../interface/registration/student';
import {environment} from '../../../../../../environments/environment';
import {Teacher} from '../../../study/interface/teacher';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private baseUrl = environment.apiBaseUrl;
    private studentSource = new BehaviorSubject<any>(null);
    currentStudent = this.studentSource.asObservable();

    constructor(private http: HttpClient) { }

    post(id: number, data: FormData): Observable<any>{
        return this.http.post(`${this.baseUrl}/singlestudent/edit/${id}`, data);
    }

    getCollection(): Observable<Student[]> {
        return this.http.get<Student[]>(`${this.baseUrl}/student/get`);
    }

    put(id: number, data: Student): Observable<any>{
        return this.http.put(`${this.baseUrl}/student/edit/${id}`, data);
    }

    delete(id: number): Observable<any>{
        return this.http.delete(`${this.baseUrl}/http://localhost:8000/studregistration/delete/` + id);
    }

    deleteStudent(id: number): Observable<any>{
        return this.http.delete(`${this.baseUrl}/student/delete/${id}`);
    }

    deleteMultiple(ids: number[]): Observable<Student[]>{
        const options = {body: ids};
        return this.http.delete<any>(`${this.baseUrl}/delete/tuition/states`, options);
    }

    assignStudent(id: number): Observable<Student>{
        return this.http.delete<Student>(`${this.baseUrl}/assign/student/` + id);
    }

    assignStudents(ids: number[]): Observable<Student[]>{
        const options = {body: ids};
        return this.http.delete<Student[]>(`${this.baseUrl}/assign/students`, options);
    }

    changeStudent(student: any): void {
        this.studentSource.next(student);
    }
}
