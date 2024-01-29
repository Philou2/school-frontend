import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {ClassCategory} from '../../interface/configuration/ClassCategory';

@Injectable({
    providedIn: 'root'
})
export class ClassCategoryService {

    private baseUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient) { }

    post(data: ClassCategory): Observable<any>{
        return this.http.post<ClassCategory>(`${this.baseUrl}/class-category/create`, data);
    }

    getCollection(): Observable<ClassCategory[]>{
        return this.http.get<ClassCategory[]>(`${this.baseUrl}/class-category/get`);
    }

    put(id: number, data: ClassCategory): Observable<any>{
        return this.http.put<ClassCategory>(`${this.baseUrl}/class-category/edit/${id}`, data);
    }

    delete(id: number): Observable<ClassCategory>{
        return this.http.delete<ClassCategory>(`${this.baseUrl}/class-category/delete/` + id);
    }

    deleteMultiple(ids: number[]): Observable<ClassCategory[]>{
        const options = {body: ids};
        return this.http.delete<ClassCategory[]>(`${this.baseUrl}/class-categorys/delete`, options);
    }
}
