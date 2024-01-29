import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public signinForm: FormGroup;
  public show = false;
  public errorMessage: any;
  public alertMessage = '';
  public login = false;
  public isSubmitted = false;

  locales = [
    { code: 'en-US', name: 'English' },
    { code: 'fr-CA', name: 'French' }
  ];

  constructor(
      public fb: FormBuilder,
      public authService: AuthService,
      public router: Router,
      public toastr: ToastrService,
      @Inject(LOCALE_ID) public activeLocale: string
  ) {
    this.signinForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {}

  change(): void {
    console.log(this.router.url);
    window.location.href = this.router.url + `/${this.activeLocale}`;
  }

  // tslint:disable-next-line:typedef
  loginUser() {
    // if (this.loginForm.value["email"] == "Test@gmail.com" && this.loginForm.value["password"] == "test123") {
    //   let user = {
    //     email: "Test@gmail.com",
    //     password: "test123",
    //     name: "test user",
    //   };
    //   localStorage.setItem("user", JSON.stringify(user));
    //   this.router.navigate(["/dashboard/default"]);
    // }

    this.isSubmitted = true;
    if (this.signinForm.valid){
      this.login = true;
      this.authService.signIn(this.signinForm.value).subscribe({
        next: (res: any) =>
        {
          console.log(res.user);

          localStorage.setItem('user_token', res.token);

          const currenUserFirstname = res.user.firstname;
          const currentUserLastname = res.user.lastname;

          this.login = false;

          if (res.user.maintenance === true){
            localStorage.setItem('user', JSON.stringify(res.user));
            console.log(res.user.maintenance)
            console.log('hello...')
            this.router.navigate(['/maintenance']);
          }
          else {
            if (res.user.isIsStudentSystem || res.user.isIsTeacherSystem){

              if (res.user.twoAuthMode === true){
                this.router.navigate(['auth/login/opt']);
                localStorage.setItem('id', res.user.id);
                localStorage.setItem('mode', res.user.twoAuthMode);
                localStorage.setItem('transport', res.user.twoAuthTransport);

              }
              else {
                localStorage.setItem('user', JSON.stringify(res.user));

                localStorage.setItem('moduleId', res.user.moduleId);

                if (res.user.moduleId && res.user.modulePath){
                  const queryParams = { layout: res.user.moduleLayout };
                  this.router.navigate([res.user.modulePath], { queryParams });
                }
                else {
                  this.router.navigate(['/dashboard/default']);
                }

                this.alertMessage =
                    'Succesful auhentification, welcome ' + currenUserFirstname + ' ' + currentUserLastname;

                this.toastr.info(this.alertMessage, 'Info');

              }

            }
            else {

              if (res.user.twoAuthMode === true){
                this.router.navigate(['auth/login/opt']);
                localStorage.setItem('id', res.user.id);
                localStorage.setItem('mode', res.user.twoAuthMode);
                localStorage.setItem('transport', res.user.twoAuthTransport);

              }else {

                localStorage.setItem('user', JSON.stringify(res.user));

                localStorage.setItem('moduleId', res.user.moduleId);

                const queryParams = { layout: 'Singapore' };
                this.router.navigate(['/dashboard/loading-module'], { queryParams });

                this.alertMessage =
                    'Succesful auhentification, welcome ' + currenUserFirstname + ' ' + currentUserLastname;

                this.toastr.info(this.alertMessage, 'Info');

              }

            }
          }



          // this.router.navigate(['/dashboard/loading-module']);
          // this.router.navigate(['/dashboard/default']);
          // window.location.href = '/dashboard/default';

        },
        error: (err: any) =>
        {
          this.login = false;
          console.log(err);
          // this.alertCode = err.error.code;

          this.alertMessage = err.message;

          this.toastr.warning(this.alertMessage, 'Warning');

          // console.log(err['error']['message']);
        }

      });
    }

  }

  // tslint:disable-next-line:typedef
  showPassword(){
    this.show = !this.show;
  }
}
