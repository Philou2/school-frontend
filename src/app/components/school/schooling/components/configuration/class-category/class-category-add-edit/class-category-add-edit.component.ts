import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {ClassCategoryService} from '../../../../services/configuration/class-category.service';
import { SchoolService } from '../../../../services/configuration/school.service';

@Component({
  selector: 'app-class-category-add-edit',
  templateUrl: './class-category-add-edit.component.html',
  styleUrls: ['./class-category-add-edit.component.scss']
})
export class ClassCategoryAddEditComponent {

  classCategoryForm: FormGroup;
  schools: any[] = [];
  schoolSelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private classCategoryService: ClassCategoryService,
              private schoolService: SchoolService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.classCategoryForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: '',
      school: '',
    });

  }

  ngOnInit() {
    this.classCategoryForm.patchValue(this.data);
    if (this.data){
      this.schoolSelected = this.data.school['@id'];
    }
    this.findAllSchool();
  }

  get fc(): any {
    return this.classCategoryForm.controls;
  }


  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.classCategoryForm.valid){
      this.saving = true;
      if (this.data){
        this.classCategoryService.put(this.data.id, this.classCategoryForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Class Category edited with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {
          
            const errors: any[] = err.violations;

            errors.forEach((v) =>
            {
              if (v.propertyPath === 'code'){
                this.classCategoryForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.classCategoryForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      else {
        this.classCategoryService.post(this.classCategoryForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Class Category created with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {
            const errors: any[] = err.violations;
            console.log(err);

            errors.forEach((v) =>
            {
              if (v.propertyPath === 'code'){
                this.classCategoryForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.classCategoryForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;
            });
          }
        });


      }

    }
  }

  findAllSchool(): any{
    this.schoolService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.schools = data['hydra:member'];
          this.schools = this.schools.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }


}
