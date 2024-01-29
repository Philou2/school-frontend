import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {CivilityService} from '../../../../services/person/civility.service';

@Component({
  selector: 'app-civility-add-edit',
  templateUrl: './civility-add-edit.component.html',
  styleUrls: ['./civility-add-edit.component.scss']
})
export class CivilityAddEditComponent {

  civilityForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private civilityService: CivilityService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.civilityForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.civilityForm.patchValue(this.data);
  }

  get fc(): any {
    return this.civilityForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.civilityForm.valid) {
      this.saving = true;
      if (this.data) {
        this.civilityService.put(this.data.id, this.civilityForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Civility edit with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              if (v.propertyPath === this.civilityForm.get('name')) {
                this.civilityForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      } else {
        this.civilityService.post(this.civilityForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Civility create with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) => {
            console.log(err);
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              this.saving = false;
              if (v.propertyPath === 'name') {
                this.civilityForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }


}
