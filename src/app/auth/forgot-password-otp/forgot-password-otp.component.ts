import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-forgot-password-opt',
  templateUrl: './forgot-password-otp.component.html',
  styleUrls: ['./forgot-password-otp.component.scss'],
})
export class ForgotPasswordOtpComponent implements OnInit {
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
      otp: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  userOtpVerification() {

    this.isSubmitted = true;
    if (this.otpVerificationForm.valid){
      this.login = true;

      let role = localStorage.getItem('role');
      let id = JSON.parse(localStorage.getItem('id'));

      this.authService.optVerification(id, role, this.otpVerificationForm.value).subscribe({
        next: (res: any) =>
        {
          console.log(res);

          this.login = false;

          this.alertMessage = res.message;

          this.toastr.info(this.alertMessage, 'Info');

          //localStorage.setItem('id', res.id);

          this.router.navigate(['/auth/forgotten/password/reset']);

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
    const role = 'SMS-TWOFACTOR';
    let id = JSON.parse(localStorage.getItem('id'));
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
