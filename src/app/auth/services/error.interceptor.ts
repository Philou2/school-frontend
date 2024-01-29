import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    // tslint:disable-next-line:variable-name
    constructor(private _router: Router, private _authenticationService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
                console.log(err);
                // if ([401, 403].indexOf(err.status)) {
                //     console.log('expiration de token');
                //     // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                //     // this._router.navigate(['/auth/login']);
                //     this._router.navigateByUrl('auth/login');
                //
                //     // ? Can also logout and reload if needed
                //     // this._authenticationService.logout();
                //     // location.reload(true);
                // }

                if (err.status === 401) {
                    console.log('auto logout if 401 Unauthorized');
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    this._authenticationService.doLogout();
                }
                // throwError
                // Trop precis ce qui rend le retour d'erreur dans les autres parties moins explicite
                // const error = err.error.message || err.statusText;

                const error = err.error || err;
                return throwError(error);
            })
        );
    }
}
