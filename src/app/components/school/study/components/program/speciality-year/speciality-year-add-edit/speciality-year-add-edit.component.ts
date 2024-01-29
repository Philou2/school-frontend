import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {SchoolYearService} from 'src/app/components/school/schooling/services/configuration/school-year.service';
import {SpecialityService} from 'src/app/components/school/schooling/services/configuration/speciality.service';
import {SpecialityYearService} from '../../../../services/speciality-year.service';

@Component({
  selector: 'app-speciality-year-add-edit',
  templateUrl: './speciality-year-add-edit.component.html',
  styleUrls: ['./speciality-year-add-edit.component.scss']
})
export class SpecialityYearAddEditComponent {

  specialityYearForm: FormGroup;
  years: any[] = [];
  specialities: any[] = [];
  yearSelected: number | undefined;
  specialitySelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private specialityYearService: SpecialityYearService,
              private specialityService: SpecialityService,
              private schoolYearService: SchoolYearService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.specialityYearForm = this.fb.group({
      year: ['', [Validators.required]],
      speciality: ['', [Validators.required]],
      minannualquota: '',
      maxannualquota: '',
      minmonthlyquota: '',
      maxmonthlyquota: '',
      minweeklyquota: '',
      maxweeklyquota: '',

    });

  }

  ngOnInit() {
    this.specialityYearForm.patchValue(this.data);
    if (this.data){
      this.yearSelected = this.data.year['@id'];
      this.specialitySelected = this.data.speciality['@id'];
    }
    this.findAllYear();
    this.findAllSpeciality();
  }

  get fc(): any {
    return this.specialityYearForm.controls;
  }


  onFormSubmit(): any {
  if (this.specialityYearForm.value.minannualquota === '') {
      this.specialityYearForm.patchValue({minannualquota: 0});
  }
  if (this.specialityYearForm.value.maxannualquota === '') {
      this.specialityYearForm.patchValue({maxannualquota: 0});
  }
  if (this.specialityYearForm.value.minmonthlyquota === '') {
      this.specialityYearForm.patchValue({minmonthlyquota: 0});
  }
  if (this.specialityYearForm.value.maxmonthlyquota === '') {
      this.specialityYearForm.patchValue({maxmonthlyquota: 0});
  }
  if (this.specialityYearForm.value.minweeklyquota === '') {
      this.specialityYearForm.patchValue({minweeklyquota: 0});
  }
  if (this.specialityYearForm.value.maxweeklyquota === '') {
      this.specialityYearForm.patchValue({maxweeklyquota: 0});
  }
  this.isSubmitted = true;
  if (this.specialityYearForm.valid){
      this.saving = true;
      if (this.data){
        this.specialityYearService.put(this.data.id, this.specialityYearForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Speciality Year edited successfully !', 'Success');
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
                this.specialityYearForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      else {
        this.specialityYearService.post(this.specialityYearForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Speciality Year created successfully !', 'Success');
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
                this.specialityYearForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;
            });
          }
        });


      }

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


}
