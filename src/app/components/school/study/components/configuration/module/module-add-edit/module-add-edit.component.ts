import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {ModuleCategoryService} from '../../../../services/module-category.service';
import {ModuleService} from '../../../../services/module.service';

@Component({
  selector: 'app-request-course-permutation-add-edit',
  templateUrl: './module-add-edit.component.html',
  styleUrls: ['./module-add-edit.component.scss']
})
export class ModuleAddEditComponent {

  moduleForm: FormGroup;
  moduleCategories: any[] = [];
  moduleCategorySelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private moduleService: ModuleService,
              private modulecategoryService: ModuleCategoryService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.moduleForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      position: null,
      moduleCategory: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.moduleForm.patchValue(this.data);
    if (this.data){
      this.moduleCategorySelected = this.data.moduleCategory['@id'];
    }
    this.findAllModuleCategory();
  }
  get fc(): any {
    return this.moduleForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.moduleForm.valid) {
      this.saving = true;
      if (this.data) {
        this.moduleService.put(this.data.id, this.moduleForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Module edited successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              this.saving = false;
              if (v.propertyPath === this.moduleForm.get('code')) {
                this.moduleForm.get('code')?.setErrors({serverError: v.message});
              }if (v.propertyPath === this.moduleForm.get('name')) {
                this.moduleForm.get('name')?.setErrors({serverError: v.message});
              }

            });
          }
        });
      } else {
        this.moduleService.post(this.moduleForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Module created successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            console.log(err)
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              this.saving = false;
               if (v.propertyPath === 'code') {
                this.moduleForm.get('code')?.setErrors({serverError: v.message});
              }  if (v.propertyPath === 'name') {
                this.moduleForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }
  findAllModuleCategory(): any{
    this.modulecategoryService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.moduleCategories = data['hydra:member'];
          this.moduleCategories = this.moduleCategories.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }


}
