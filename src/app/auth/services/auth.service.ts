import { Injectable } from '@angular/core';
import {Observable, Subscription, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment';
import * as Module from 'module';
import {User} from '../../components/security/interface/user';
import {Branch} from '../../components/security/interface/branch';
import {Otp} from '../../components/security/interface/otp';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiBaseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, public router: Router) {}

  // Sign-in
  // tslint:disable-next-line:typedef
  signIn(user: User) {
    return this.http.post<any>(`${this.baseUrl}/login`, user);
  }

  otpVerification(id: number, role: string, data: Otp): Observable<any>{
    console.log(data.opt)
    const options = {id: id, role: role, otp: data.opt};
    return this.http.post<Otp[]>(`${this.baseUrl}/verify/user/${id}/two/factor/auth/role/${role}/otp/${data.opt}`, options);
  }

  resendOtp(id: number, role: string): Observable<any>{
    const options = {id: id, role: role};
    return this.http.post<Otp[]>(`${this.baseUrl}/resend/otp/user/${id}/two/factor/auth/role/${role}`, options);
  }

  changePassword(data: User) {
    return this.http.post<any>(`${this.baseUrl}/user/update/password`, data);
  }

  // Forget password part start
  phoneVerification(data: User) {
    return this.http.post<any>(`${this.baseUrl}/user/phone/verification`, data);
  }

  optVerification(id: number, role: string, data: User) {
    return this.http.post<any>(`${this.baseUrl}/user/${id}/otp/verification/role/${role}`, data);
  }

  userPassReset(id: number, data: User) {
    return this.http.post<any>(`${this.baseUrl}/user/${id}/reset/password`, data);
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    const api = `${this.baseUrl}/register-user`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }
  // Sign-in
  getToken(): string {
    return localStorage.getItem('user_token');
  }
  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('user_token');
    return authToken !== null;
  }

  // tslint:disable-next-line:typedef
  doLogout() {
    const removeToken = localStorage.removeItem('user_token');
    localStorage.removeItem('user');
    if (removeToken == null) {
      // this.router.navigate(['login']);
      this.router.navigateByUrl('auth/login');
    }
  }

  // User profile
  getUserProfile(id: any): Observable<any> {
    const api = `${this.baseUrl}/get/user/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // tslint:disable-next-line:typedef
  refreshToken() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(`${this.baseUrl}` + '/token/refresh', { }, httpOptions);
  }

  // tslint:disable-next-line:typedef
  revokeToken() {
    localStorage.removeItem('user_token');
  }


  // Error
  // tslint:disable-next-line:typedef
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
