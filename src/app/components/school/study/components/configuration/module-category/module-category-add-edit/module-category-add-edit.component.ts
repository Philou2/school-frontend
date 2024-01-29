import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {ModuleCategoryService} from '../../../../services/module-category.service';

@Component({
  selector: 'app-request-course-permutation-add-edit',
  templateUrl: './module-category-add-edit.component.html',
  styleUrls: ['./module-category-add-edit.component.scss']
})
export class ModuleCategoryAddEditComponent {

  moduleCategoryForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private moduleCategoryeService: ModuleCategoryService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.moduleCategoryForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      position: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.moduleCategoryForm.patchValue(this.data);
  }

  get fc(): any {
    return this.moduleCategoryForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.moduleCategoryForm.valid) {
      this.saving = true;
      if (this.data) {
        this.moduleCategoryeService.put(this.data.id, this.moduleCategoryForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Module Category edited successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              this.saving = false;
              if (v.propertyPath === this.moduleCategoryForm.get('code')) {
                this.moduleCategoryForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === this.moduleCategoryForm.get('name')) {
                this.moduleCategoryForm.get('name')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === this.moduleCategoryForm.get('position')) {
                this.moduleCategoryForm.get('position')?.setErrors({serverError: v.message});
              }

            });
          }
        });
      } else {
        this.moduleCategoryeService.post(this.moduleCategoryForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Module Category created successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            console.log(err);
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              this.saving = false;
               if (v.propertyPath === 'code') {
                this.moduleCategoryForm.get('code')?.setErrors({serverError: v.message});
              }
               if (v.propertyPath === 'name') {
                this.moduleCategoryForm.get('name')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === this.moduleCategoryForm.get('position')) {
                this.moduleCategoryForm.get('position')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }


}
