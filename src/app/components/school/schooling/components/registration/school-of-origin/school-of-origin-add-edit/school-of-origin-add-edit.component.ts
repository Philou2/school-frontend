import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {SchoolOfOriginService} from '../../../../services/registration/school-of-origin.service';
import { CountryService } from 'src/app/components/setting/services/location/country.service';

@Component({
  selector: 'app-school-of-origin-add-edit',
  templateUrl: './school-of-origin-add-edit.component.html',
  styleUrls: ['./school-of-origin-add-edit.component.scss']
})
export class SchoolOfOriginAddEditComponent {

  schoolOfOriginForm: FormGroup;
  countries: any[] = [];
  countrySelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private schoolOfOriginService: SchoolOfOriginService,
              private countryService: CountryService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.schoolOfOriginForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(1)]],
      name: ['', [Validators.required, Validators.minLength(1)]],
      country: ['', [Validators.required]],
      postcode: '',
      city: '',
      phone: [''],
      fax: '',
      email: [''],
    });

  }

  ngOnInit() {
    console.log(this.data);
    this.schoolOfOriginForm.patchValue(this.data);
    console.log(this.data);
    if (this.data){
      this.countrySelected = this.data.country['@id'];
    }
    this.findAllCountry();
  }

  get fc(): any {
    return this.schoolOfOriginForm.controls;
  }


  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.schoolOfOriginForm.valid){
      this.saving = true;
      if (this.data){
        this.schoolOfOriginService.put(this.data.id, this.schoolOfOriginForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('School of Origin edited successfully !', 'Success');
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
                this.schoolOfOriginForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.schoolOfOriginForm.get('name')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'email'){
                this.schoolOfOriginForm.get('email')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'phone'){
                this.schoolOfOriginForm.get('phone')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      else {
        this.schoolOfOriginService.post(this.schoolOfOriginForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('School of Origin created successfully !', 'Success');
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
                this.schoolOfOriginForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.schoolOfOriginForm.get('name')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'email'){
                this.schoolOfOriginForm.get('email')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'phone'){
                this.schoolOfOriginForm.get('phone')?.setErrors({serverError: v.message});
              }
              this.saving = false;
            });
          }
        });


      }

    }
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
