import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {DepartmentService} from '../../../../services/configuration/department.service';
import { SchoolService } from '../../../../services/configuration/school.service';

@Component({
  selector: 'app-department-add-edit',
  templateUrl: './department-add-edit.component.html',
  styleUrls: ['./department-add-edit.component.scss']
})
export class DepartmentAddEditComponent {

  departmentForm: FormGroup;
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
              private departmentService: DepartmentService,
              private schoolService: SchoolService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.departmentForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(2)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: '',
      school: '',
    });

  }

  ngOnInit() {
    this.departmentForm.patchValue(this.data);
    if (this.data){
      this.schoolSelected = this.data.school['@id'];
    }
    this.findAllSchool();
  }

  get fc(): any {
    return this.departmentForm.controls;
  }


  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.departmentForm.valid){
      this.saving = true;
      if (this.data){
        this.departmentService.put(this.data.id, this.departmentForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Department edited with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {
            console.log(err);
            console.log(err.violation);
            console.log(err.error);
            const errors: any[] = err.violation;

            errors.forEach((v) =>
            {
              if (v.propertyPath === 'code'){
                this.departmentForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.departmentForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      else {
        this.departmentService.post(this.departmentForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Department created with success !', 'Success');
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
                this.departmentForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.departmentForm.get('name')?.setErrors({serverError: v.message});
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
