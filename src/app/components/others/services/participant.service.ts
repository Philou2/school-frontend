import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../../../environments/environment";
import {Participant} from "../interface/participant";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  constructor(private _http: HttpClient) { }

  private baseUrl = environment.apiBaseUrl;
  private urlPay = 'http://db.betterpay.online/api/payment';

  addEmployee(data: Participant): Observable<Participant>{
    return this._http.post<Participant>(`${this.baseUrl}/create/employee`, data);
  }

  addPayment(data: any): Observable<Participant>{

    const options = {
      pay_type_code: '8171103d032647e4b3536e63f3b21535',
      client: {
        name: data.name,
        tel: data.tel,
        email: data.email,
      },
      phone_number: data.phone_number,
      amount: data.amount,
      reference: data.reference,
      callback_url: 'https://webhook.site/03dd43ab-00b1-4c56-b5b1-69d41e3850b3',
    };
    return this._http.post<Participant>(`${this.urlPay}`, options);
  }

  updateEmployee(id: number, data: Participant): Observable<Participant>{
    return this._http.put<Participant>(`${this.baseUrl}/edit/employee/${id}`, data);
  }
  getUserMenuList(): Observable<Participant[]>{
    return this._http.get<Participant[]>(`${this.baseUrl}/user/menus`);
  }
  getEmployeeList(): Observable<Participant[]>{
    return this._http.get<Participant[]>(`${this.baseUrl}/employees`);
  }

  deleteEmployee(id: number): Observable<Participant>{
    return this._http.delete<any>(`${this.baseUrl}/delete/employee/` +id);
  }

  deleteMultipleEmployee(ids: number[]): Observable<Participant[]>{
    const options = {body: ids};
    return this._http.delete<any>(`${this.baseUrl}/delete/participants`, options);

  }

}
