import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {OldStudentRegistrationPerClass} from '../../interface/registration/oldStudentRegistrationPerClass';
import {environment} from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OldStudentRegistrationPerClassService {
  private baseUrl = environment.apiBaseUrl;
  private oldStudentRegistrationPerClassSource = new BehaviorSubject<any>(null);
  currentOldStudentRegistrationPerClass = this.oldStudentRegistrationPerClassSource.asObservable();

  constructor(private http: HttpClient) { }

  post(data: OldStudentRegistrationPerClass): Observable<any>{
    return this.http.post(`${this.baseUrl}/registrationperclass/create`, data);
  }

  getCollection(): Observable<OldStudentRegistrationPerClass[]> {
    return this.http.get<OldStudentRegistrationPerClass[]>(`${this.baseUrl}/studregistrationperclass/get`);
  }

  put(id: number, data: OldStudentRegistrationPerClass): Observable<any>{
    return this.http.put(`${this.baseUrl}/oldstudregistration/edit/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`http://localhost:8000/studregistration/delete/` + id);
  }

  deleteMultiple(ids: number[]): Observable<OldStudentRegistrationPerClass[]>{
    const options = {body: ids};
    return this.http.delete<any>(`${this.baseUrl}/delete/building/states`, options);

  }

  changeOldStudentRegistrationPerClass(oldStudentRegistrationPerClass: any) {
    this.oldStudentRegistrationPerClassSource.next(oldStudentRegistrationPerClass);
  }
}

