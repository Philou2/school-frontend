import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {SubjectTypeService} from '../../../../services/subject-type.service';
@Component({
  selector: 'app-subject-add-edit',
  templateUrl: './subject-type-add-edit.component.html',
  styleUrls: ['./subject-type-add-edit.component.scss']
})
export class SubjectTypeAddEditComponent {

  subjectTypeForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private subjectTypeService: SubjectTypeService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.subjectTypeForm = this.fb.group({

      name: ['', [Validators.required, Validators.minLength(3)]],
      description: '',
    });
  }

  ngOnInit(): void {
    this.subjectTypeForm.patchValue(this.data);
  }

  get fc(): any {
    return this.subjectTypeForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.subjectTypeForm.valid) {
      this.saving = true;
      if (this.data) {
        this.subjectTypeService.put(this.data.id, this.subjectTypeForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Subject Type edited successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
                if (v.propertyPath === this.subjectTypeForm.get('name')) {
                this.subjectTypeForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      } else {
        this.subjectTypeService.post(this.subjectTypeForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Subject Type created successfully !', 'Success');
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
                this.subjectTypeForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }


}
