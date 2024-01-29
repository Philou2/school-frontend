import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {RepeatingService} from '../../../../services/school/repeating.service';

@Component({
  selector: 'app-repeating-add-edit',
  templateUrl: './repeating-add-edit.component.html',
  styleUrls: ['./repeating-add-edit.component.scss']
})
export class RepeatingAddEditComponent {

  repeatingForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private repeatingService: RepeatingService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.repeatingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.repeatingForm.patchValue(this.data);
  }

  get fc(): any {
    return this.repeatingForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.repeatingForm.valid) {
      this.saving = true;
      if (this.data) {
        this.repeatingService.put(this.data.id, this.repeatingForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Repeating edited successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              if (v.propertyPath === this.repeatingForm.get('name')) {
                this.repeatingForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      } else {
        this.repeatingService.post(this.repeatingForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Repeating created successfully !', 'Success');
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
                this.repeatingForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }


}
