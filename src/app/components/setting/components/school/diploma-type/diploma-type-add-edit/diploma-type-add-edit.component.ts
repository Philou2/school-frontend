import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {DiplomaTypeService} from '../../../../services/school/diploma-type.service';

@Component({
  selector: 'app-diploma-type-add-edit',
  templateUrl: './diploma-type-add-edit.component.html',
  styleUrls: ['./diploma-type-add-edit.component.scss']
})
export class DiplomaTypeAddEditComponent {

  diplomaTypeForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private diplomaTypeService: DiplomaTypeService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.diplomaTypeForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.diplomaTypeForm.patchValue(this.data);
  }

  get fc(): any {
    return this.diplomaTypeForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.diplomaTypeForm.valid) {
      this.saving = true;
      if (this.data) {
        this.diplomaTypeService.put(this.data.id, this.diplomaTypeForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Diploma Type edit with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              this.saving = false;
              if (v.propertyPath === this.diplomaTypeForm.get('code')) {
                this.diplomaTypeForm.get('code')?.setErrors({serverError: v.message});
              }if (v.propertyPath === this.diplomaTypeForm.get('name')) {
                this.diplomaTypeForm.get('name')?.setErrors({serverError: v.message});
              }

            });
          }
        });
      } else {
        this.diplomaTypeService.post(this.diplomaTypeForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Diploma Type create with success !', 'Success');
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
                this.diplomaTypeForm.get('code')?.setErrors({serverError: v.message});
              }  if (v.propertyPath === 'name') {
                this.diplomaTypeForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }


}
