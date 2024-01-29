import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();

    let role = localStorage.getItem('role');
    let id = JSON.parse(localStorage.getItem('id'));

    console.log(req.url)
    if (req.url.includes('betterpay'))
    {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer Bearer 10|NbQJQJjoTgBITIBMf65IdMay9Sos17Axy0wirDVi'
        }
      });
    }
    else if(req.url.includes('/api/user/phone/verification')){
        req = req.clone({
          setHeaders: {
            'Content-Type': 'application/json',
          }
        });
    }
    else if(req.url.includes(`/api/user/${id}/otp/verification/role/${role}`)){
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
        }
      });
    }

    else if(req.url.includes(`api/resend/otp/user/${id}/two/factor/auth/role/${role}`)){
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
        }
      });
    }
    else if(req.url.includes(`/api/user/${id}/reset/password`)){
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
        }
      });
    }

    else if(req.url.includes(`/api/resend/otp/user/${id}/two/factor/auth/role/${role}`)){
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
        }
      });
    }

    else {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + authToken
        }
      });
    }

    // Ajouter cette ligne pour exclure l'endpoint /api/user/phone/verification
    if (req.url.includes('/api/user/phone/verification')) {
      return next.handle(req);
    }


    return next.handle(req);
  }



}
