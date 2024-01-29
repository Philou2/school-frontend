import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {CountryService} from 'src/app/components/setting/services/location/country.service';
import {StudentService} from 'src/app/components/school/schooling/services/registration/student.service';
import {SchoolYearService} from 'src/app/components/school/schooling/services/configuration/school-year.service';
import {SexService} from 'src/app/components/setting/services/person/sex.service';
import {StudRegistrationService} from '../../../../services/registration/stud-registration.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'change-of-matricule-add-edit',
  templateUrl: './change-of-matricule-add-edit.component.html',
  styleUrls: ['./change-of-matricule-add-edit.component.scss']
})
export class ChangeOfMatriculeAddEditComponent {

  changeMatriculeForm: FormGroup;
  years: any[] = [];
  countries: any[] = [];
  sexes: any[] = [];

  yearSelected: number | undefined;
  countrySelected: number | undefined;
  sexSelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private studentService: StudentService,
              private studRegistrationService: StudRegistrationService,
              private schoolYearService: SchoolYearService,
              private countryService: CountryService,
              private sexService: SexService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router,
              private datePipe: DatePipe
  ) {
    this.changeMatriculeForm = this.fb.group({
      year: [{value: null, disabled: true}],
      matricule: [''],
      newMatricule: [''],
      othermatricule: '',
      internalmatricule: '',
      name: [''],
      firstName: '',
      dob: [''],
      bornAround: null,
      pob: '',
      region: '',
      sex: [{value: null, disabled: true}],
      country: [{value: null, disabled: true}],
      fathername: '',
      mothername: '',
      guardianname: '',
    });

  }

  ngOnInit() {
    this.changeMatriculeForm.patchValue(this.data);
    if (this.data){
      console.log(this.data);
      console.log(this.data.year);
      const student = this.data.student;
      this.yearSelected = student.year ? student.year : null;
      this.sexSelected = this.data.sex ? this.data.sex['@id'] : null;
      this.countrySelected = this.data.country ? this.data.country['@id'] : null;

      this.changeMatriculeForm.get('matricule')?.setValue(student.matricule);
      this.changeMatriculeForm.get('othermatricule')?.setValue(student.othermatricule);
      this.changeMatriculeForm.get('internalmatricule')?.setValue(student.internalmatricule);
      this.changeMatriculeForm.get('name')?.setValue(student.name);
      this.changeMatriculeForm.get('firstName')?.setValue(student.firstName);
      this.changeMatriculeForm.get('pob')?.setValue(student.pob);
      const dob = this.datePipe.transform(student.dob, 'yyyy-MM-dd');
      this.changeMatriculeForm.get('dob')?.setValue(dob);
      const bornAround = this.datePipe.transform(student.bornAround, 'yyyy-MM-dd');
      this.changeMatriculeForm.get('bornAround')?.setValue(bornAround);
      this.changeMatriculeForm.get('region')?.setValue(student.region);
      this.changeMatriculeForm.get('fathername')?.setValue(student.fathername);
      this.changeMatriculeForm.get('mothername')?.setValue(student.mothername);
      this.changeMatriculeForm.get('guardianname')?.setValue(student.guardianname);
    }

    this.findAllYear();
    this.findAllCountry();
    this.findAllSex();

  }

  get fc(): any {
    return this.changeMatriculeForm.controls;
  }


  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.changeMatriculeForm.valid){
      this.saving = true;
      if (this.data){
        const formValue = this.changeMatriculeForm.value;
        console.log(formValue);
        const dataToSendToBackend = {
          ...formValue,
          matricule: formValue.newMatricule
        };
        console.log(dataToSendToBackend);
        this.studRegistrationService.putMatricule(this.data.id, dataToSendToBackend).subscribe({
          next: (val: any) => {
            this.toastr.success('Matricule edited successfully !', 'Success');
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
              if (v.propertyPath === 'matricule'){
                this.changeMatriculeForm.get('matricule')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      // else {
      //   this.familyService.post(this.familyForm.value).subscribe({
      //     next: (val: any) => {
      //       this.toastr.success('Family created successfully !', 'Success');
      //       this.activeModal.close();
      //     },
      //     complete: () => {
      //       this.saving = false;
      //     },
      //     error: (err: any) =>
      //     {
      //       const errors: any[] = err.violations;
      //       console.log(err);
      //
      //       errors.forEach((v) =>
      //       {
      //         if (v.propertyPath === 'name'){
      //           this.familyForm.get('name')?.setErrors({serverError: v.message});
      //         }
      //         this.saving = false;
      //       });
      //     }
      //   });
      //
      //
      // }

    }
  }

  findAllYear(): any{
    this.schoolYearService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.years = data['hydra:member'];
          this.years = this.years.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

  findAllSex(): any{
    this.sexService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.sexes = data['hydra:member'];
          this.sexes = this.sexes.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

  findAllCountry(): any{
    this.countryService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.countries = data['hydra:member'];
          this.countries = this.countries.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }


}
