import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {ReligionService} from '../../../../services/person/religion.service';

@Component({
  selector: 'app-religion-add-edit',
  templateUrl: './religion-add-edit.component.html',
  styleUrls: ['./religion-add-edit.component.scss']
})
export class ReligionAddEditComponent {

  religionForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private religionService: ReligionService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.religionForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.religionForm.patchValue(this.data);
  }

  get fc(): any {
    return this.religionForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.religionForm.valid) {
      this.saving = true;
      if (this.data) {
        this.religionService.put(this.data.id, this.religionForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Religion edit with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              this.saving = false;
              if (v.propertyPath === this.religionForm.get('code')) {
                this.religionForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === this.religionForm.get('name')) {
                this.religionForm.get('name')?.setErrors({serverError: v.message});
              }

            });
          }
        });
      } else {
        this.religionService.post(this.religionForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Religion create with success !', 'Success');
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
                this.religionForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }


}
