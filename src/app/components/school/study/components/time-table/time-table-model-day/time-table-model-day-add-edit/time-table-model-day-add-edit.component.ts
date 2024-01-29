import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {TimeTableModelService} from "../../../../services/time-table-model.service";
import {TimeTableModelDayService} from "../../../../services/time-table-model-day.service";
import {ClassProgramService} from "../../../../services/class-program.service";

@Component({
  selector: 'app-time-table-model-day-add-edit',
  templateUrl: './time-table-model-day-add-edit.component.html',
  styleUrls: ['./time-table-model-day-add-edit.component.scss']
})
export class TimeTableModelDayAddEditComponent {

  timeTableModelDayForm: FormGroup;
/*  courses: any[] = [];

  courseSelected: number | undefined;*/
  saving = false;

  public data: any;

  minEndDate: string;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private timeTableModelDayService: TimeTableModelDayService,
              private courseService: ClassProgramService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router,
              private datePipe: DatePipe
  ) {
    this.timeTableModelDayForm = this.fb.group({
      model: '',
      day: '',
      startAt: '',
      endAt: '',
   /*   courseCell: '',
      startAtCell: '',
      endAtCell: '',*/
    });
  }

  ngOnInit(): void {
    this.timeTableModelDayForm.patchValue(this.data);
    console.log(this.data);
    if (this.data){
      /*this.courseSelected = this.data.courseCell['@id'];*/
      console.log(this.data);

      const startAt = this.datePipe.transform(this.data.startAt, 'HH:mm');
      this.timeTableModelDayForm.get('startAt')?.setValue(startAt);

      const endAt = this.datePipe.transform(this.data.endAt, 'HH:mm');
      this.timeTableModelDayForm.get('endAt')?.setValue(endAt);
    }
   /* this.findAllCourse();*/

  }
  get fc(): any {
    return this.timeTableModelDayForm.controls;
  }

  onStartDateChange(event: any) {
    this.minEndDate = event.target.value;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.timeTableModelDayForm.valid) {
      this.saving = true;
      if (this.data) {
        console.log(this.data);
/*
        this.timeTableModelDayForm.get('enable')?.setValue(this.timeTableModelDayForm.get('enable')?.value === '1');
*/
        this.timeTableModelDayService.put(this.data.id, this.timeTableModelDayForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Time Table Model Day edited successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            this.saving = false;
            const errors: any[] = err.violations;

            errors.forEach((v) => {
            });
          }
        });
      }
/*      else {
/!*
        this.timeTableModelDayForm.get('enable')?.setValue(this.timeTableModelDayForm.get('enable')?.value === '1');
*!/
        this.timeTableModelService.post(this.timeTableModelDayForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Time Table Model Day created successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            this.saving = false;
            console.log(err);
            const errors: any[] = err.violations;
            errors.forEach((v) => {
            });
          }
        });
      }*/

    }
  }
/*
  findAllCourse(): any{
    this.courseService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.courses = data['hydra:member'];
          this.courses = this.courses.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }
*/



}
