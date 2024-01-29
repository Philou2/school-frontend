import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
// import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {first} from 'rxjs';
import {environment} from '../../../../../../environments/environment';
import {InstitutionService} from '../../../services/institution.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-user-institution-update',
  templateUrl: './user-institution-update.component.html',
  styleUrls: ['./user-institution-update.component.scss']
})
export class UserInstitutionUpdateComponent implements OnInit{

  institutionForm: FormGroup;
  managerTypes: any[] = [];
  managerTypeSelected: number | undefined;

  countries: any[] = [];
  countrySelected: number | undefined;

  roleSelected: number | undefined;
  saving = false;

  loadForm = true;

  public data: any;

  id: number = JSON.parse(localStorage.getItem('user'))['instId'];
  printInstitutionCode = '';
  printInstitutionName = '';

  defaultImg: string;
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
              public route: Router,
              public router: ActivatedRoute
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
    // console.log(this.data.institution.name);

    // let user = JSON.parse(localStorage.getItem('user'));
    // this.id = user['instId'];
    // console.log(this.id)
    this.institutionForm.patchValue(this.data);
    this.findAllManagerTypes();
    this.findAllCountries();

    if (this.id){
      this.institutionService.getInstitutionId(this.id)
          .pipe(first())
          .subscribe(x => {
            console.log(x);
            console.log(x.country)
            this.institutionForm.patchValue(x);
            this.managerTypeSelected = x.managerType ? x.managerType['@id'] : null;
            this.printInstitutionCode = x.code;
            this.printInstitutionName = x.name;
            this.defaultImg = x.picture;

            this.countrySelected = x.country ? x.country['@id'] : null;

            this.loadForm = false;

          } );
    }

  }

  get fc(): any {
    return this.institutionForm.controls;
  }

  onChange(event): void{
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.fileHad = inputElement.files[0];
      this.institutionForm.patchValue({fileSource: this.fileHad});
      console.log(this.fileHad.name);
      // this.defaultImg = this.baseUploadUrl + 'uploads/' + this.fileHad.name;
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

  onFormSubmit(): void{
    this.isSubmitted = true;
    // if (this.userForm.valid && this.fileHad && this.fileHad.name){
    if (this.institutionForm.valid){
      this.saving = true;
      if (this.id){
        console.log('hello maoll');

        const formData = new FormData();
        // console.log(this.institutionForm.get('fileSource')?.value.type);
        // console.log(this.institutionForm.get('firstname')?.value);
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

        console.log(formData);

        this.institutionService.updateInstitution(this.id, formData).subscribe({
          next: (val: any) => {
            this.toastr.success('Institution edit with success !', 'Success');
            //this.route.navigate(['/security/institution']);

          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {
            const errors: any[] = err;
            console.log(errors);

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
