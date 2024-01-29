import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {CountryService} from '../../../../services/location/country.service';
import {MinistryService} from '../../../../services/institution/ministry.service';

@Component({
  selector: 'app-bloodGroup-add-edit',
  templateUrl: './ministry-add-edit.component.html',
  styleUrls: ['./ministry-add-edit.component.scss']
})
export class MinistryAddEditComponent {

  ministryForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private ministryService: MinistryService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.ministryForm = this.fb.group({

      code: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.ministryForm.patchValue(this.data);
  }

  get fc(): any {
    return this.ministryForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.ministryForm.valid) {
      this.saving = true;
      if (this.data) {
        this.ministryService.put(this.data.id, this.ministryForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Ministry edit with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              if (v.propertyPath === this.ministryForm.get('code')) {
                this.ministryForm.get('code')?.setErrors({serverError: v.message});
              }  if (v.propertyPath === this.ministryForm.get('name')) {
                this.ministryForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      } else {
        this.ministryService.post(this.ministryForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Ministry create with success !', 'Success');
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
                this.ministryForm.get('code')?.setErrors({serverError: v.message});
              }  if (v.propertyPath === 'name') {
                this.ministryForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }


}
