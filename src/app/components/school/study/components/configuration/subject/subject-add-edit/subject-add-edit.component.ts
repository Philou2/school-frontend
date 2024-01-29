import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {SubjectTypeService} from '../../../../services/subject-type.service';
import {SubjectService} from '../../../../services/subject.service';
@Component({
  selector: 'app-subject-add-edit',
  templateUrl: './subject-add-edit.component.html',
  styleUrls: ['./subject-add-edit.component.scss']
})
export class SubjectAddEditComponent {

  subjectForm: FormGroup;
  subjectTypes: any[] = [];
  subjectTypeSelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private subjectService: SubjectService,
              private subjectTypeService: SubjectTypeService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.subjectForm = this.fb.group({

      code: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      subjectType: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.subjectForm.patchValue(this.data);
    if (this.data){
      this.subjectTypeSelected = this.data.subjectType['@id'];
    }
    this.findAllSubject();
  }

  get fc(): any {
    return this.subjectForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.subjectForm.valid) {
      this.saving = true;
      if (this.data) {
        this.subjectService.put(this.data.id, this.subjectForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Subject edit with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
                if (v.propertyPath === this.subjectForm.get('name')) {
                this.subjectForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      } else {
        this.subjectService.post(this.subjectForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Subject create with success !', 'Success');
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
                if (v.propertyPath === 'code') {
                this.subjectForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name') {
                this.subjectForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }

  findAllSubject(): any{
    this.subjectTypeService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.subjectTypes = data['hydra:member'];
          this.subjectTypes = this.subjectTypes.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }
}
