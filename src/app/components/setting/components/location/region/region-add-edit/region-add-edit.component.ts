import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {RegionService} from '../../../../services/location/region.service';

@Component({
  selector: 'app-region-add-edit',
  templateUrl: './region-add-edit.component.html',
  styleUrls: ['./region-add-edit.component.scss']
})
export class RegionAddEditComponent {

  regionForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private regionService: RegionService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.regionForm = this.fb.group({

      code: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],

    });
  }

  ngOnInit(): void {
    this.regionForm.patchValue(this.data);
  }

  get fc(): any {
    return this.regionForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.regionForm.valid) {
      this.saving = true;
      if (this.data) {
        this.regionService.put(this.data.id, this.regionForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('region edited successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              if (v.propertyPath === 'code') {
                this.regionForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === this.regionForm.get('name')) {
                this.regionForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      } else {
        this.regionService.post(this.regionForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('region created successfully !', 'Success');
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
                this.regionForm.get('code')?.setErrors({serverError: v.message});
              }
               if (v.propertyPath === 'name') {
                this.regionForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }


}
