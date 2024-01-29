import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-forgot-password-reset',
  templateUrl: './forgot-password-reset.component.html',
  styleUrls: ['./forgot-password-reset.component.scss'],
})
export class ForgotPasswordResetComponent implements OnInit {
  public resetPasswordForm: FormGroup;
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
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required]],
      confirmNewPassword: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  get fc(): any {
    return this.resetPasswordForm.controls;
  }

  userPasswordReset() {

    this.isSubmitted = true;
    if (this.resetPasswordForm.valid){
      this.login = true;

      let id = JSON.parse(localStorage.getItem('id'));
      console.log(id);

      this.authService.userPassReset(id, this.resetPasswordForm.value).subscribe({
        next: (res: any) =>
        {
          console.log(res);

          this.login = false;

          this.alertMessage = res.message;

          this.toastr.success(this.alertMessage, 'Success');

          localStorage.setItem('role', res.role);

          this.router.navigate(['/auth/login']);

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
