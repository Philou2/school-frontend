import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ContentComponent } from './shared/components/layout/content/content.component';
import { FullComponent } from './shared/components/layout/full/full.component';
import { full } from './shared/routes/full.routes';
import { content } from './shared/routes/routes';

import { AdminGuard } from './shared/guard/admin.guard';
import {LoginOptComponent} from './auth/login-opt/login-opt.component';
import {Error404Component} from './pages/error/error404/error404.component';
import {ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';
import {ForgotPasswordOtpComponent} from './auth/forgot-password-otp/forgot-password-otp.component';
import {ForgotPasswordResetComponent} from './auth/forgot-password-reset/forgot-password-reset.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/default',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/login/opt',
    component: LoginOptComponent
  },
  {
    path: 'auth/forgotten/password',
    component: ForgotPasswordComponent
  },
  {
    path: 'auth/forgotten/password/otp',
    component: ForgotPasswordOtpComponent
  },
  {
    path: 'auth/forgotten/password/reset',
    component: ForgotPasswordResetComponent
  },
  {
    path: '',
    component: ContentComponent,
    canActivate: [AdminGuard],
    children: content
  },
  {
    path: '',
    component: FullComponent,
    canActivate: [AdminGuard],
    children: full
  },
  {
    path: '**',
    //redirectTo: ''
    component: Error404Component
  }
];

@NgModule({
  imports: [[RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
})],
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
