import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {PensionSchemeService} from '../../../../services/configuration/pension-scheme.service';
import { SchoolService } from '../../../../services/configuration/school.service';
import { CampusService } from '../../../../services/configuration/campus.service';
import { CountryService } from 'src/app/components/setting/services/location/country.service';

@Component({
  selector: 'app-class-category-add-edit',
  templateUrl: './pension-scheme-add-edit.component.html',
  styleUrls: ['./pension-scheme-add-edit.component.scss']
})
export class PensionSchemeAddEditComponent {

  pensionSchemeForm: FormGroup;
  schools: any[] = [];
  campuses: any[] = [];
  countries: any[] = [];
  schoolSelected: number | undefined;
  campusSelected: number | undefined;
  countrySelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private pensionSchemeService: PensionSchemeService,
              private schoolService: SchoolService,
              private campusService: CampusService,
              private countryService: CountryService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.pensionSchemeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      remark: ['', [Validators.required, Validators.minLength(3)]],
      schools: '',
      campuses: '',
      countries: '',
    });

  }

  ngOnInit() {
    this.pensionSchemeForm.patchValue(this.data);
    if (this.data){
      this.schoolSelected = this.data.schools.map((c: any) => c['@id']);
      this.campusSelected = this.data.campuses.map((c: any) => c['@id']);
      this.countrySelected = this.data.countries.map((c: any) => c['@id']);
    }
    this.findAllSchool();
    this.findAllCampus();
    this.findAllCountry();
  }

  get fc(): any {
    return this.pensionSchemeForm.controls;
  }


  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.pensionSchemeForm.valid){
      this.saving = true;
      if (this.data){
        this.pensionSchemeService.put(this.data.id, this.pensionSchemeForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Pension Scheme edited with success !', 'Success');
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
                this.pensionSchemeForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.pensionSchemeForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      else {
        this.pensionSchemeService.post(this.pensionSchemeForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Pension Scheme created with success !', 'Success');
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
                this.pensionSchemeForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.pensionSchemeForm.get('name')?.setErrors({serverError: v.message});
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

  findAllCampus(): any{
    this.campusService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.campuses = data['hydra:member'];
          this.campuses = this.campuses.map((v) => {
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
