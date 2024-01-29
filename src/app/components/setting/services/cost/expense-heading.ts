import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {ExpenseHeading} from '../../interface/cost/expenseHeading';

@Injectable({
    providedIn: 'root'
})
export class ExpenseHeadingService {
    private baseUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    post(data: ExpenseHeading): Observable<any>{
        return this.http.post(`${this.baseUrl}/expense-heading/create`, data);
    }

    getCollection(): Observable<ExpenseHeading[]> {
        return this.http.get<ExpenseHeading[]>(`${this.baseUrl}/expense-heading/get`);
    }

    put(id: number, data: ExpenseHeading): Observable<any>{
        return this.http.put(`${this.baseUrl}/expense-heading/edit/${id}`, data);
    }

    delete(id: number): Observable<any>{
        return this.http.delete(`${this.baseUrl}/expense-heading/delete/${id}`);
    }

    deleteMultiple(ids: number[]): Observable<ExpenseHeading[]>{
        const options = {body: ids};
        return this.http.delete<any>(`${this.baseUrl}/delete/expense-heading/states`, options);

    }
}

