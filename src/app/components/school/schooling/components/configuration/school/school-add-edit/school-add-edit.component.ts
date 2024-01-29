import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {SchoolService} from '../../../../services/configuration/school.service';
import { ManagerTypeService } from 'src/app/components/setting/services/institution/manager-type.service';

@Component({
  selector: 'app-school-add-edit',
  templateUrl: './school-add-edit.component.html',
  styleUrls: ['./school-add-edit.component.scss']
})
export class SchoolAddEditComponent {

  schoolForm: FormGroup;
  managerTypes: any[] = [];
  managerTypeSelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private schoolService: SchoolService,
              private managerTypeService: ManagerTypeService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.schoolForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(1)]],
      name: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [ Validators.email]],
      phone: ['', [ Validators.pattern(/^((?!672)\d{9}|672\d{6})$/)]],
      postalCode: '',
      city: '',
      address: '',
      manager: ['', [Validators.required]],
      managerType: ['', [Validators.required]],
    });

  }

  ngOnInit() {
    this.schoolForm.patchValue(this.data);
    if (this.data){
      this.managerTypeSelected = this.data.managerType['@id'];
    }
    this.findAllManagerType();
  }

  get fc(): any {
    return this.schoolForm.controls;
  }


  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.schoolForm.valid){
      this.saving = true;
      if (this.data){
        this.schoolService.put(this.data.id, this.schoolForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('School edited with success !', 'Success');
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
                this.schoolForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.schoolForm.get('name')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'email'){
                this.schoolForm.get('email')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'phone'){
                this.schoolForm.get('phone')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'manager'){
                this.schoolForm.get('manager')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'managerType'){
                this.schoolForm.get('managerType')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      else {
        this.schoolService.post(this.schoolForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('School created with success !', 'Success');
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
                this.schoolForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.schoolForm.get('name')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'email'){
                this.schoolForm.get('email')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'phone'){
                this.schoolForm.get('phone')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'manager'){
                this.schoolForm.get('manager')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'managerType'){
                this.schoolForm.get('managerType')?.setErrors({serverError: v.message});
              }
              this.saving = false;
            });
          }
        });


      }

    }
  }

  findAllManagerType(): any{
    this.managerTypeService.getCollection().subscribe((data: any) => {
          this.managerTypes = data['hydra:member'];
          this.managerTypes = this.managerTypes.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }


}
