import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {PeriodTypeService} from '../../../../services/school/period-type.service';

@Component({
  selector: 'app-subject-add-edit',
  templateUrl: './period-type-add-edit.component.html',
  styleUrls: ['./period-type-add-edit.component.scss']
})
export class PeriodTypeAddEditComponent {

  periodTypeForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private periodTypeService: PeriodTypeService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.periodTypeForm = this.fb.group({

      code: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.periodTypeForm.patchValue(this.data);
  }

  get fc(): any {
    return this.periodTypeForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.periodTypeForm.valid) {
      this.saving = true;
      if (this.data) {
        this.periodTypeService.put(this.data.id, this.periodTypeForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Period Type edited successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              if (v.propertyPath === this.periodTypeForm.get('code')) {
                this.periodTypeForm.get('code')?.setErrors({serverError: v.message});
              }  if (v.propertyPath === this.periodTypeForm.get('name')) {
                this.periodTypeForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      } else {
        this.periodTypeService.post(this.periodTypeForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Period Type created successfully !', 'Success');
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
                this.periodTypeForm.get('code')?.setErrors({serverError: v.message});
              }  if (v.propertyPath === 'name') {
                this.periodTypeForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }


}
