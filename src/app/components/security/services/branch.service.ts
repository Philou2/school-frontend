import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Branch} from '../interface/branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  addBranch(data: any): Observable<any>{
    return this.http.post<Branch>(`${this.baseUrl}/create/branch`, data);
  }

  updateBranch(id: number, data: Branch): Observable<any>{
    return this.http.put<Branch>(`${this.baseUrl}/edit/branch/${id}`, data);
  }

  getBranchList(): Observable<Branch[]>{
    return this.http.get<Branch[]>(`${this.baseUrl}/get/branches`);
  }

  getBranchId(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/get/branch/${id}`);
  }

  deleteBranch(id: number): Observable<Branch>{
    return this.http.delete<Branch>(`${this.baseUrl}/delete/branch/` + id);
  }

  deleteMultipleBranches(ids: number[]): Observable<Branch[]>{
    const options = {body: ids};
    return this.http.delete<Branch[]>(`${this.baseUrl}/delete/selected/branches`, options);
  }
}
