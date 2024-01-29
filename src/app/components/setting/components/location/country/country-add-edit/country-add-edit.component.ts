import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {CountryService} from '../../../../services/location/country.service';

@Component({
  selector: 'app-bloodGroup-add-edit',
  templateUrl: './country-add-edit.component.html',
  styleUrls: ['./country-add-edit.component.scss']
})
export class CountryAddEditComponent {

  countryForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private countryService: CountryService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.countryForm = this.fb.group({
      alpha2: '',
      alpha3: '',
      name: ['', [Validators.required]],
      numericCode: '',
      officialName: '',
    });
  }

  ngOnInit(): void {
    this.countryForm.patchValue(this.data);
  }

  get fc(): any {
    return this.countryForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.countryForm.valid) {
      this.saving = true;
      if (this.data) {
        this.countryService.put(this.data.id, this.countryForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Country edit with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              if (v.propertyPath === this.countryForm.get('name')) {
                this.countryForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      } else {
        this.countryService.post(this.countryForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Country create with success !', 'Success');
            this.activeModal.close();

          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) => {
            console.log(err)
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              this.saving = false;
               if (v.propertyPath === 'name') {
                this.countryForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }


}
