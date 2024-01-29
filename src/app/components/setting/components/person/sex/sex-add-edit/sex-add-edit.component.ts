import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {SexService} from '../../../../services/person/sex.service';

@Component({
  selector: 'app-sex-add-edit',
  templateUrl: './sex-add-edit.component.html',
  styleUrls: ['./sex-add-edit.component.scss']
})
export class SexAddEditComponent {

  sexForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private sexService: SexService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.sexForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.sexForm.patchValue(this.data);
  }

  get fc(): any {
    return this.sexForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.sexForm.valid) {
      this.saving = true;
      if (this.data) {
        this.sexService.put(this.data.id, this.sexForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Sex edit with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              this.saving = false;
              if (v.propertyPath === this.sexForm.get('code')) {
                this.sexForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === this.sexForm.get('name')) {
                this.sexForm.get('name')?.setErrors({serverError: v.message});
              }

            });
          }
        });
      } else {
        this.sexService.post(this.sexForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Sex create with success !', 'Success');
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
              if (v.propertyPath === 'code') {
                this.sexForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name') {
                this.sexForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }


}
