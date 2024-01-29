import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {CampusService} from '../../../../services/configuration/campus.service';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-campus-add-edit',
  templateUrl: './campus-add-edit.component.html',
  styleUrls: ['./campus-add-edit.component.scss']
})
export class CampusAddEditComponent {

  campusForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private campusService: CampusService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.campusForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.campusForm.patchValue(this.data);
  }

  get fc(): any {
    return this.campusForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.campusForm.valid) {
      this.saving = true;
      if (this.data) {
        this.campusService.put(this.data.id, this.campusForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Campus edit with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              if (v.propertyPath === this.campusForm.get('code')) {
                this.campusForm.get('code')?.setErrors({serverError: v.message});
              }  
              if (v.propertyPath === this.campusForm.get('name')) {
                this.campusForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      } else {
        this.campusService.post(this.campusForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Campus create with success !', 'Success');
            this.activeModal.close();

          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) => {
            console.log(err)
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              if (v.propertyPath === 'code') {
                this.campusForm.get('code')?.setErrors({serverError: v.message});
              }
               if (v.propertyPath === 'name') {
                this.campusForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;
            });
          }
        });
      }

    }
  }


}
