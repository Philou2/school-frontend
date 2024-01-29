import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {DayService} from '../../../../services/other-settings/day.service';
@Component({
  selector: 'app-day-add-edit',
  templateUrl: './day-add-edit.component.html',
  styleUrls: ['./day-add-edit.component.scss']
})
export class DayAddEditComponent {

  dayForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private dayService: DayService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.dayForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.dayForm.patchValue(this.data);
    if (this.data){
    }
  }


  get fc(): any {
    return this.dayForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.dayForm.valid) {
      this.saving = true;
      if (this.data) {
        this.dayService.put(this.data.id, this.dayForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Day edit with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
                if (v.propertyPath === this.dayForm.get('name')) {
                this.dayForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      } else {
        this.dayService.post(this.dayForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Day create with success !', 'Success');
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
                this.dayForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }

}
