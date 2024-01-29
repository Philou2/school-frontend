import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {SubjectNatureService} from '../../../../services/school/subject-nature.service';
@Component({
  selector: 'app-subject-nature-add-edit',
  templateUrl: './subject-nature-add-edit.component.html',
  styleUrls: ['./subject-nature-add-edit.component.scss']
})
export class SubjectNatureAddEditComponent {

  subjectNatureForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private subjectNatureService: SubjectNatureService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.subjectNatureForm = this.fb.group({

      code: '',
      name: '',
    });
  }

  ngOnInit(): void {
    this.subjectNatureForm.patchValue(this.data);
  }

  get fc(): any {
    return this.subjectNatureForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.subjectNatureForm.valid) {
      this.saving = true;
      if (this.data) {
        this.subjectNatureService.put(this.data.id, this.subjectNatureForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Subject Nature edited successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
                if (v.propertyPath === this.subjectNatureForm.get('name')) {
                this.subjectNatureForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      } else {
        this.subjectNatureService.post(this.subjectNatureForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Subject Nature created successfully !', 'Success');
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
                this.subjectNatureForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }


}
