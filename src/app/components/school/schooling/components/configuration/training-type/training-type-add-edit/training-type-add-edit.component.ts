import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {TrainingTypeService} from '../../../../services/configuration/training-type.service';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-training-type-add-edit',
  templateUrl: './training-type-add-edit.component.html',
  styleUrls: ['./training-type-add-edit.component.scss']
})
export class TrainingTypeAddEditComponent {

  trainingTypeForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private trainingTypeService: TrainingTypeService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.trainingTypeForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(2)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
    });

  }

  ngOnInit(): void {
    this.trainingTypeForm.patchValue(this.data);
  }

  get fc(): any {
    return this.trainingTypeForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.trainingTypeForm.valid) {
      this.saving = true;
      if (this.data) {
        this.trainingTypeService.put(this.data.id, this.trainingTypeForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Training Type edit with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              if (v.propertyPath === this.trainingTypeForm.get('code')) {
                this.trainingTypeForm.get('code')?.setErrors({serverError: v.message});
              }  
              if (v.propertyPath === this.trainingTypeForm.get('name')) {
                this.trainingTypeForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      } else {
        this.trainingTypeService.post(this.trainingTypeForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Training Type create with success !', 'Success');
            this.activeModal.close();

          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) => {
            console.log(err)
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              if (v.propertyPath === 'code') {
                this.trainingTypeForm.get('code')?.setErrors({serverError: v.message});
              }
               if (v.propertyPath === 'name') {
                this.trainingTypeForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;
            });
          }
        });
      }

    }
  }


}
