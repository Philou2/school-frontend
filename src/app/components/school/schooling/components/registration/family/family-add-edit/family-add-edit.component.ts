import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {FamilyService} from '../../../../services/registration/family.service';

@Component({
  selector: 'app-list-of-student-courses-add-edit',
  templateUrl: './family-add-edit.component.html',
  styleUrls: ['./family-add-edit.component.scss']
})
export class FamilyAddEditComponent {

  familyForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private familyService: FamilyService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.familyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      address: '',
      phone: '',
      email: '',
      fatherName: '',
      fatherPhone: '',
      fatherProfession: '',
      motherName: '',
      motherPhone: '',
      motherProfession: '',
      issmssubscription: '',
      isemailsubscription: '',
    });

  }

  ngOnInit() {
    this.familyForm.patchValue(this.data);
  }

  get fc(): any {
    return this.familyForm.controls;
  }


  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.familyForm.valid){
      this.saving = true;
      if (this.data){
        this.familyForm.get('issmssubscription')?.setValue(this.familyForm.get('issmssubscription')?.value === '1');
        this.familyForm.get('isemailsubscription')?.setValue(this.familyForm.get('isemailsubscription')?.value === '1');
        this.familyService.put(this.data.id, this.familyForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Family edited successfully !', 'Success');
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
              if (v.propertyPath === 'name'){
                this.familyForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      else {
        this.familyForm.get('issmssubscription')?.setValue(this.familyForm.get('issmssubscription')?.value === '1');
        this.familyForm.get('isemailsubscription')?.setValue(this.familyForm.get('isemailsubscription')?.value === '1');
        this.familyService.post(this.familyForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Family created successfully !', 'Success');
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
              if (v.propertyPath === 'name'){
                this.familyForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;
            });
          }
        });


      }

    }
  }


}
