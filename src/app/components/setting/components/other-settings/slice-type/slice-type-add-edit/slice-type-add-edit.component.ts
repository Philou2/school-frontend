import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {SliceTypeService} from '../../../../services/other-settings/slice-type.service';

@Component({
  selector: 'app-slice-type-add-edit',
  templateUrl: './slice-type-add-edit.component.html',
  styleUrls: ['./slice-type-add-edit.component.scss']
})
export class SliceTypeAddEditComponent {

  sliceTypeForm: FormGroup;

  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private sliceTypeservice: SliceTypeService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.sliceTypeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.sliceTypeForm.patchValue(this.data);
    if (this.data){
    }
  }


  get fc(): any {
    return this.sliceTypeForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.sliceTypeForm.valid) {
      this.saving = true;
      if (this.data) {
        this.sliceTypeservice.put(this.data.id, this.sliceTypeForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Slice Type edited successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
                if (v.propertyPath === this.sliceTypeForm.get('name')) {
                this.sliceTypeForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      } else {
        this.sliceTypeservice.post(this.sliceTypeForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Slice Type created successfully !', 'Success');
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
                this.sliceTypeForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }

}
