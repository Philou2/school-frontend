import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {MaritalStatusService} from '../../../../services/person/marital-status.service';

@Component({
  selector: 'app-marital-status-add-edit',
  templateUrl: './marital-status-add-edit.component.html',
  styleUrls: ['./marital-status-add-edit.component.scss']
})
export class MaritalStatusAddEditComponent {

  maritalStatusForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private maritalStatusService: MaritalStatusService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.maritalStatusForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.maritalStatusForm.patchValue(this.data);
  }

  get fc(): any {
    return this.maritalStatusForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.maritalStatusForm.valid) {
      this.saving = true;
      if (this.data) {
        this.maritalStatusService.put(this.data.id, this.maritalStatusForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Marital Status edited successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              if (v.propertyPath === 'code') {
                this.maritalStatusForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === this.maritalStatusForm.get('name')) {
                this.maritalStatusForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      } else {
        this.maritalStatusService.post(this.maritalStatusForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Marital Status created successfully !', 'Success');
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
                this.maritalStatusForm.get('code')?.setErrors({serverError: v.message});
              }
               if (v.propertyPath === 'name') {
                this.maritalStatusForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }


}
