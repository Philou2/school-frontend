import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../../../auth/services/auth.service';

@Component({
  selector: 'app-user-password-update',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.scss']
})
export class UserChangePasswordComponent implements OnInit{

  userForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;
  val: any | null;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.userForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(3)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(3)]],
    });

  }

  ngOnInit(): void {
    // this.userForm.patchValue(this.data);
    console.log(this.data);

  }

  get fc(): any {
    return this.userForm.controls;
  }

  onFormSubmit(): void{
    this.isSubmitted = true;
    if (this.userForm.valid){
      this.saving = true;
      if (this.data){
        this.authService.changePassword(this.userForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Password updated with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {
            console.log(err);
            this.toastr.warning(err['message'], 'Warning');
            this.saving = false;
            // const errors: any[] = err.error.violations;
            //
            // errors.forEach((v) =>
            // {
            //   if (v.propertyPath === 'oldPassword'){
            //     this.userForm.get('oldPassword')?.setErrors({serverError: v.message});
            //   }
            //   if (v.propertyPath === 'password'){
            //     this.userForm.get('password')?.setErrors({serverError: v.message});
            //   }
            //   if (v.propertyPath === 'newPassword'){
            //     this.userForm.get('newPassword')?.setErrors({serverError: v.message});
            //   }
            //   this.saving = false;
            //
            // });
          }
        });
      }

    }
  }


}
