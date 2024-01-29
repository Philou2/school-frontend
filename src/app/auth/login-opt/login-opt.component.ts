import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login-opt',
  templateUrl: './login-opt.component.html',
  styleUrls: ['./login-opt.component.scss'],
})
export class LoginOptComponent implements OnInit {
  public otpVerificationForm: FormGroup;
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
    this.otpVerificationForm = this.fb.group({
      opt: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  // tslint:disable-next-line:typedef
  loginUser() {

    this.isSubmitted = true;
    if (this.otpVerificationForm.valid){
      this.login = true;
      let role = '';
      let id = JSON.parse(localStorage.getItem('id'));
      let transport = JSON.parse(localStorage.getItem('transport'));
      console.log(role);

      if (transport == true){
        role = 'SMS-TWOFACTOR'
      }else {
        role = 'EMAIL-TWOFACTOR'
      }

      this.authService.otpVerification(id, role, this.otpVerificationForm.value).subscribe({
        next: (res: any) =>
        {
          // localStorage.setItem('user_token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));

          console.log(res);

          const currenUserFirstname = res.user.firstname;
          const currentUserLastname = res.user.lastname;

          this.login = false;

          this.alertMessage =
              'Succesfull auhentificate, welcome ' + currenUserFirstname + ' ' + currentUserLastname;

          this.toastr.info(this.alertMessage, 'Info');

          if (res.user.isIsStudentSystem || res.user.isIsTeacherSystem){

            if (res.user.moduleId && res.user.modulePath){
              // this.router.navigateByUrl(res.user.modulePath);
              const queryParams = { layout: res.user.moduleLayout };
              this.router.navigate([res.user.modulePath], { queryParams });
            }
            else {
              this.router.navigate(['/dashboard/default']);
            }

            localStorage.setItem('moduleId', res.user.moduleId);

          }
          else {
            const queryParams = { layout: 'Singapore' };
            this.router.navigate(['/dashboard/loading-module'], { queryParams });
          }


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

  resendOtp(): any {
    let role = '';
    let id = JSON.parse(localStorage.getItem('id'));
    let transport = JSON.parse(localStorage.getItem('transport'));

    if (transport == true){
      role = 'SMS-TWOFACTOR'
    }else {
      role = 'EMAIL-TWOFACTOR'
    }

    console.log(id)
    this.authService.resendOtp(id, role).subscribe((data: any) => {
          console.log(data);
          this.alertMessage = data.message;

          this.toastr.success(this.alertMessage, 'Success');
        },
        error => {
          this.alertMessage = error.message;

          this.toastr.warning(this.alertMessage, 'Warning');
        }
    );
  }

  showPassword(){
    this.show = !this.show;
  }
}
