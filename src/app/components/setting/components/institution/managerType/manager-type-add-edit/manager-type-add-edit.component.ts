import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {ManagerTypeService} from '../../../../services/institution/manager-type.service';

@Component({
  selector: 'app-request-course-permutation-add-edit',
  templateUrl: './manager-type-add-edit.component.html',
  styleUrls: ['./manager-type-add-edit.component.scss']
})
export class ManagerTypeAddEditComponent {

  managerTypeForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private managerTypeService: ManagerTypeService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.managerTypeForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.managerTypeForm.patchValue(this.data);
  }

  get fc(): any {
    return this.managerTypeForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.managerTypeForm.valid) {
      this.saving = true;
      if (this.data) {
        this.managerTypeService.put(this.data.id, this.managerTypeForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Manager Type edit with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              this.saving = false;
              if (v.propertyPath === this.managerTypeForm.get('code')) {
                this.managerTypeForm.get('code')?.setErrors({serverError: v.message});
              }if (v.propertyPath === this.managerTypeForm.get('name')) {
                this.managerTypeForm.get('name')?.setErrors({serverError: v.message});
              }

            });
          }
        });
      } else {
        this.managerTypeService.post(this.managerTypeForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Manager Type create with success !', 'Success');
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
                this.managerTypeForm.get('code')?.setErrors({serverError: v.message});
              }  if (v.propertyPath === 'name') {
                this.managerTypeForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }


}
