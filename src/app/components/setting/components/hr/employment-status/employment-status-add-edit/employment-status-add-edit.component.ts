import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {EmploymentStatusService} from '../../../../services/hr/employment-status.service';

@Component({
  selector: 'app-employment-status-add-edit',
  templateUrl: './employment-status-add-edit.component.html',
  styleUrls: ['./employment-status-add-edit.component.scss']
})
export class EmploymentStatusAddEditComponent {

  EmploymentStatusForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private employmentStatusService: EmploymentStatusService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.EmploymentStatusForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.EmploymentStatusForm.patchValue(this.data);
  }

  get fc(): any {
    return this.EmploymentStatusForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.EmploymentStatusForm.valid) {
      this.saving = true;
      if (this.data) {
        this.employmentStatusService.put(this.data.id, this.EmploymentStatusForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Employment Status edited successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              if (v.propertyPath === 'code') {
                this.EmploymentStatusForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === this.EmploymentStatusForm.get('name')) {
                this.EmploymentStatusForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      } else {
        this.employmentStatusService.post(this.EmploymentStatusForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Employment Status created successfully !', 'Success');
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
                this.EmploymentStatusForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name') {
                this.EmploymentStatusForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }


}
