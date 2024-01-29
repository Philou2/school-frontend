import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {BloodGroupService} from '../../../../services/person/blood-group.service';

@Component({
  selector: 'app-blood-group-add-edit',
  templateUrl: './blood-group-add-edit.component.html',
  styleUrls: ['./blood-group-add-edit.component.scss']
})
export class BloodGroupAddEditComponent {

  bloodGroupForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private bloodGroupService: BloodGroupService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.bloodGroupForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.bloodGroupForm.patchValue(this.data);
  }

  get fc(): any {
    return this.bloodGroupForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.bloodGroupForm.valid) {
      this.saving = true;
      if (this.data) {
        this.bloodGroupService.put(this.data.id, this.bloodGroupForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Blood group edit with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              if (v.propertyPath === this.bloodGroupForm.get('name')) {
                this.bloodGroupForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      } else {
        this.bloodGroupService.post(this.bloodGroupForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Blood group create with success !', 'Success');
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
                this.bloodGroupForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }


}
