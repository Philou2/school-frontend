import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {RhesusService} from '../../../../services/person/rhesus.service';

@Component({
  selector: 'app-rhesus-add-edit',
  templateUrl: './rhesus-add-edit.component.html',
  styleUrls: ['./rhesus-add-edit.component.scss']
})
export class RhesusAddEditComponent {

  rhesusForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private rhesusService: RhesusService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.rhesusForm = this.fb.group({
      code: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.rhesusForm.patchValue(this.data);
  }

  get fc(): any {
    return this.rhesusForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.rhesusForm.valid) {
      this.saving = true;
      if (this.data) {
        this.rhesusService.put(this.data.id, this.rhesusForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Rhesus edit with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              this.saving = false;
              if (v.propertyPath === this.rhesusForm.get('code')) {
                this.rhesusForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === this.rhesusForm.get('name')) {
                this.rhesusForm.get('name')?.setErrors({serverError: v.message});
              }

            });
          }
        });
      } else {
        this.rhesusService.post(this.rhesusForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Rhesus create with success !', 'Success');
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
                this.rhesusForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name') {
                this.rhesusForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }


}
