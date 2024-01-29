// import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Injectable, Injector } from '@angular/core';
// import { Router } from '@angular/router';
// import { catchError, Observable, of, throwError } from 'rxjs';
// import {ToastrService} from 'ngx-toastr';
// import {AuthService} from './auth/services/auth.service';
//
//
// @Injectable()
// export class Interceptor implements HttpInterceptor{
//
//     constructor(private inject: Injector, private router: Router, private toastr: ToastrService){}
//     ctr = 0;
//
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         return next.handle(req).pipe(catchError(x => this.handleAuthError(x)));
//     }
//
//     private handleAuthError(err: HttpErrorResponse): Observable<any> {
//         // tslint:disable-next-line:triple-equals
//         if (err && err.status === 401 && this.ctr != 1){
//             this.ctr++;
//             const service = this.inject.get(AuthService);
//             service.refreshToken().subscribe({
//                 next: (x: any) => {
//                     this.toastr.info('Tokens refreshed, try again', 'Refreshing');
//                     return of('We refreshed the token now do again what u were trying to do');
//                 },
//                 // tslint:disable-next-line:no-shadowed-variable
//                 error: (err: any) => {
//                     // service.revokeToken().subscribe({
//                     //     next: (x: any) => {
//                     //         this.router.navigateByUrl('/dashboard/default');
//                     //         return of(err.message);
//                     //     }
//                     // });
//                 }
//             });
//             return of('Attempting to Refresh Tokens');
//         }
//         else{
//             this.ctr = 0;
//             return throwError(() => new Error('Non Authenticationn Error'));
//         }
//
//     }
// }
