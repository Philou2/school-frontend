import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {RhesusService} from '../../../../services/person/rhesus.service';
import {IdentityTypeService} from '../../../../services/person/identity-type.service';

@Component({
  selector: 'app-identity-type-add-edit',
  templateUrl: './identity-type-add-edit.component.html',
  styleUrls: ['./identity-type-add-edit.component.scss']
})
export class IdentityTypeAddEditComponent {

  identityTypeForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private identityTypeService: IdentityTypeService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.identityTypeForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.identityTypeForm.patchValue(this.data);
  }

  get fc(): any {
    return this.identityTypeForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.identityTypeForm.valid) {
      this.saving = true;
      if (this.data) {
        this.identityTypeService.put(this.data.id, this.identityTypeForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('identity Type edited successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              this.saving = false;
              if (v.propertyPath === this.identityTypeForm.get('code')) {
                this.identityTypeForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === this.identityTypeForm.get('name')) {
                this.identityTypeForm.get('name')?.setErrors({serverError: v.message});
              }

            });
          }
        });
      } else {
        this.identityTypeService.post(this.identityTypeForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('identity Type created successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) => {
            console.log(err)
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              this.saving = false;
               if (v.propertyPath === 'code') {
                this.identityTypeForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name') {
                this.identityTypeForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }


}
