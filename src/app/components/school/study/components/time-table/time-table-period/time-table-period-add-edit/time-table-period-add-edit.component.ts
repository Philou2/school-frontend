import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {TimeTablePeriodService} from '../../../../services/time-table-period.service';
import {SchoolYearService} from 'src/app/components/school/schooling/services/configuration/school-year.service';
import {PeriodTypeService} from 'src/app/components/setting/services/school/period-type.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-time-table-model-day-add-edit',
  templateUrl: './time-table-period-add-edit.component.html',
  styleUrls: ['./time-table-period-add-edit.component.scss']
})
export class TimeTablePeriodAddEditComponent {

  timeTablePeriodForm: FormGroup;
  years: any[] = [];
  types: any[] = [];
  yearSelected: number | undefined;
  typeSelected: number | undefined;
  saving = false;

  public data: any;

  minEndDate: string;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private timeTablePeriodService: TimeTablePeriodService,
              private schoolYearService: SchoolYearService,
              private periodTypeService: PeriodTypeService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router,
              private datePipe: DatePipe
  ) {
    this.timeTablePeriodForm = this.fb.group({
      year: ['', [Validators.required]],
      type: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      enable: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.timeTablePeriodForm.patchValue(this.data);
    if (this.data){
      this.yearSelected = this.data.year['@id'];
      this.typeSelected = this.data.type['@id'];

      this.timeTablePeriodForm.get('enable')?.setValue(this.data.enable ? '1' : '0');
    }
    this.findAllYear();
    this.findAllType();
  }
  get fc(): any {
    return this.timeTablePeriodForm.controls;
  }

  onStartDateChange(event: any) {
    this.minEndDate = event.target.value;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.timeTablePeriodForm.valid) {
      this.saving = true;
      if (this.data) {
        this.timeTablePeriodForm.get('enable')?.setValue(this.timeTablePeriodForm.get('enable')?.value === '1');
        this.timeTablePeriodService.put(this.data.id, this.timeTablePeriodForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Time Table Period edited successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              this.saving = false;
              if (v.propertyPath === this.timeTablePeriodForm.get('code')) {
                this.timeTablePeriodForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === this.timeTablePeriodForm.get('name')) {
                this.timeTablePeriodForm.get('name')?.setErrors({serverError: v.message});
              }

            });
          }
        });
      } else {
        this.timeTablePeriodForm.get('enable')?.setValue(this.timeTablePeriodForm.get('enable')?.value === '1');
        this.timeTablePeriodService.post(this.timeTablePeriodForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Time Table Period created successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            console.log(err);
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              this.saving = false;
              if (v.propertyPath === 'code') {
                this.timeTablePeriodForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name') {
                this.timeTablePeriodForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }
  findAllYear(): any{
    this.schoolYearService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.years = data['hydra:member'];
          this.years = this.years.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

  findAllType(): any{
    this.periodTypeService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.types = data['hydra:member'];
          this.types = this.types.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }


}
