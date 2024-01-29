import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {RegistrationFormService} from '../../../../services/configuration/registration-form';
import { SpecialityService } from '../../../../services/configuration/speciality.service';
import { LevelService } from '../../../../services/configuration/level.service';

@Component({
  selector: 'app-registration-form-add-edit',
  templateUrl: './registration-form-add-edit.component.html',
  styleUrls: ['./registration-form-add-edit.component.scss']
})
export class RegistrationFormAddEditComponent {

  registrationFormForm: FormGroup;
  specialities: any[] = [];
  minimumLevels: any[] = [];
  maximumLevels: any[] = [];
  specialitySelected: number | undefined;
  minimumLevelSelected: number | undefined;
  maximumLevelSelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private registrationFormService: RegistrationFormService,
              private specialityService: SpecialityService,
              private levelService: LevelService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.registrationFormForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      speciality: '',
      minimumLevel: '',
      maximumLevel: '',
      amount: '',
      isshowreceipt: '',
    });

  }

  ngOnInit() {
    this.registrationFormForm.patchValue(this.data);
    if (this.data){
      console.log(this.data);
      this.specialitySelected = this.data.speciality['@id'];
      this.minimumLevelSelected = this.data.minimumLevel['@id'];
      this.maximumLevelSelected = this.data.maximumLevel['@id'];

      this.registrationFormForm.get('isshowreceipt')?.setValue(this.data.isshowreceipt ? '1' : '0');
    }
    this.findAllSpeciality();
    this.findAllMinimumLevel();
    this.findAllMaximumLevel();
  }

  get fc(): any {
    return this.registrationFormForm.controls;
  }


  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.registrationFormForm.valid){
      this.saving = true;
      if (this.data){
        console.log(this.registrationFormForm.get('isshowreceipt'));
        if (this.registrationFormForm.get('isshowreceipt')?.value === '1')
        {
          this.registrationFormForm.get('isshowreceipt')?.setValue(true);
        }
        else{
          this.registrationFormForm.get('isshowreceipt')?.setValue(false);
        }
        this.registrationFormService.put(this.data.id, this.registrationFormForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Registration Form edited with success !', 'Success');
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
                this.registrationFormForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.registrationFormForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      else {
        if (this.registrationFormForm.get('isshowreceipt')?.value === '1')
        {
          this.registrationFormForm.get('isshowreceipt')?.setValue(true);
        }
        else{
          this.registrationFormForm.get('isshowreceipt')?.setValue(false);
        }
        this.registrationFormService.post(this.registrationFormForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Registration Form created with success !', 'Success');
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
                this.registrationFormForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.registrationFormForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;
            });
          }
        });


      }

    }
  }

  findAllSpeciality(): any{
    this.specialityService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.specialities = data['hydra:member'];
          this.specialities = this.specialities.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

  filterMaximumLevels(): any {
    const minLevelIndex = this.minimumLevels.findIndex(level => level.id === this.minimumLevelSelected);
    this.maximumLevels = this.maximumLevels.filter((level, index) => index > minLevelIndex);
  }

  findAllMinimumLevel(): any{
    this.levelService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.minimumLevels = data['hydra:member'];
          this.minimumLevels = this.minimumLevels.map((v) => {
            v.id = v['@id'];
            return v;
          });
          this.filterMaximumLevels();
        },
        error => console.log(error)
    );
  }

  findAllMaximumLevel(): any{
    this.levelService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.maximumLevels = data['hydra:member'];
          this.maximumLevels = this.maximumLevels.map((v) => {
            v.id = v['@id'];
            return v;
          });
          this.filterMaximumLevels();
        },
        error => console.log(error)
    );
  }


}
