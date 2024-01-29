import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {InstitutionService} from '../../../services/institution.service';
import {environment} from '../../../../../../environments/environment';
import {Institution} from '../../../interface/institution';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-branch-add-edit',
  templateUrl: './institution-add.component.html',
  styleUrls: ['./institution-add.component.scss']
})
export class InstitutionAddComponent implements OnInit {

  institutionForm: FormGroup;
  managerTypes: any[] = [];
  managerTypeSelected: number | undefined;

  countries: any[] = [];
  countrySelected: number | undefined;

  printInstitutionCode = '';
  printInstitutionName = '';
  saving = false;

  public data: any;

  private baseUploadUrl = environment.apiBaseUrlUpload;
  defaultImg = this.baseUploadUrl + 'uploads/7.jpg';
  // defaultImg = this.baseUploadUrl + 'uploads/mass-corp-650867f42934e.png';

  isSubmitted = false;
  fileHad: File = null;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private institutionService: InstitutionService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public route: Router
  ) {
    this.institutionForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^((?!672)\d{9}|672\d{6})$/)]],
      address: [''],
      website: [''],
      postalCode: [''],
      city: [''],
      region: [''],
      manager: [''],
      file: null,
      fileSource: null,
      managerType: [''],
      country: [''],
    });

  }

  ngOnInit(): void {
    this.institutionForm.patchValue(this.data);
    this.findAllManagerTypes();
    this.findAllCountries();

    console.log(this.defaultImg);

  }

  get fc(): any {
    return this.institutionForm.controls;
  }

  onChange(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.fileHad = inputElement.files[0];
      this.institutionForm.patchValue({fileSource: this.fileHad});

      const reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.defaultImg = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);

    }
  }

  onKey(event: any): void {
    this.printInstitutionCode = event.target.value;
  }

  onKey2(event: any): void {
    this.printInstitutionName = event.target.value;
  }

  onFormSubmit(): void {
    this.isSubmitted = true;
    // if (this.userForm.valid && this.fileHad && this.fileHad.name){
    if (this.institutionForm.valid) {
      this.saving = true;

      const formData = new FormData();
      // console.log(this.institutionForm.get('fileSource')?.value.type);
      formData.append('code', this.institutionForm.get('code')?.value);
      formData.append('name', this.institutionForm.get('name')?.value);
      formData.append('phone', this.institutionForm.get('phone')?.value);
      formData.append('email', this.institutionForm.get('email')?.value);

      formData.append('address', this.institutionForm.get('address')?.value);
      formData.append('website', this.institutionForm.get('website')?.value);
      formData.append('postalCode', this.institutionForm.get('postalCode')?.value);
      formData.append('city', this.institutionForm.get('city')?.value);
      formData.append('region', this.institutionForm.get('region')?.value);
      formData.append('manager', this.institutionForm.get('manager')?.value);
      formData.append('managerType', this.institutionForm.get('managerType')?.value);
      formData.append('country', this.institutionForm.get('country')?.value);

      formData.append('file', this.institutionForm.get('fileSource')?.value);
      formData.append('fileName', this.institutionForm.get('fileSource')?.value?.name);
      formData.append('fileSize', this.institutionForm.get('fileSource')?.value?.size);
      formData.append('fileType', this.institutionForm.get('fileSource')?.value?.type);

      console.log(this.institutionForm.value, formData);

      this.institutionService.addInstitution(formData).subscribe({
        next: (val: any) => {
          console.log(val.link);
          this.toastr.success('Institution create with success !', 'Success');
          this.route.navigate(['/security/institution']);
        },
        complete: () => {
          this.saving = false;
        },
        error: (err: any) => {
          console.log(err);
          const errors: any[] = err.violations;
          // console.log(errors);
          if (errors){
            errors.forEach((v) => {
              if (v.propertyPath === 'code') {
                this.institutionForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name') {
                this.institutionForm.get('name')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'phone') {
                this.institutionForm.get('phone')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'email') {
                this.institutionForm.get('email')?.setErrors({serverError: v.message});
              }

              this.saving = false;
            });
          }
          else {
            this.toastr.error(err['hydra:description'], 'Error');
            this.saving = false;
          }

        }
      });

    }
  }

  findAllCountries() {
    this.institutionService.getCountryList().subscribe({
      next: (data: any) => {
        console.log(data['hydra:member']);
        this.countries = data['hydra:member'];
        if (this.countries){
          this.countries = this.countries.map((v) => {
            v.id = v['@id'];
            return v;
          });
        }
      },
      complete: () => this.findAllManagerTypes(),
      error: (error: HttpErrorResponse) => {
        this.findAllManagerTypes()
        console.log(error);
      }
    });
  }

  findAllManagerTypes() {
    this.institutionService.getManagerTypeList().subscribe({
      next: (data: any) => {
        console.log(data['hydra:member']);
        this.managerTypes = data['hydra:member'];
        if (this.managerTypes){
          this.managerTypes = this.managerTypes.map((v) => {
            v.id = v['@id'];
            return v;
          });
        }
      },
      //complete: () => this.findAllCountries(),
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

}
