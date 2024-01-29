import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public phoneVerificationForm: FormGroup;
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
    this.phoneVerificationForm = this.fb.group({
      phone: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  userPhoneVerification() {

    this.isSubmitted = true;
    if (this.phoneVerificationForm.valid){
      this.login = true;

      this.authService.phoneVerification(this.phoneVerificationForm.value).subscribe({
        next: (res: any) =>
        {
          console.log(res);

          this.login = false;

          this.alertMessage = res.message;

          this.toastr.info(this.alertMessage, 'Info');

          localStorage.setItem('role', res.role);
          localStorage.setItem('id', res.id);

          this.router.navigate(['/auth/forgotten/password/otp']);

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


  showPassword(){
    this.show = !this.show;
  }
}
