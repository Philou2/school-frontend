import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

// // for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// // for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
// // for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { AdminGuard } from './shared/guard/admin.guard';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';

import { OverlayModule } from '@angular/cdk/overlay';
import {AuthInterceptor} from './auth/services/authconfig.interceptor';
import {ErrorInterceptor} from './auth/services/error.interceptor';
import {TreeviewModule} from '@charmedme/ngx-treeview';
import {LoginOptComponent} from './auth/login-opt/login-opt.component';
import {ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';
import {ForgotPasswordOtpComponent} from './auth/forgot-password-otp/forgot-password-otp.component';
import {ForgotPasswordResetComponent} from './auth/forgot-password-reset/forgot-password-reset.component';

export function HttpLoaderFactory(http: HttpClient) {
  // return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  return new TranslateHttpLoader(http);
  // return new TranslateHttpLoader(http, './locale/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginOptComponent,
    ForgotPasswordComponent,
    ForgotPasswordOtpComponent,
    ForgotPasswordResetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OverlayModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    TreeviewModule.forRoot(),
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),

  // for HttpClient use:
    LoadingBarHttpClientModule,
  // for Router use:
    LoadingBarRouterModule,
  // for Core use:
    LoadingBarModule
  ],
  providers: [ AdminGuard, CookieService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
