import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {TimeTableModelDayCellService} from '../../../../services/time-table-model-day-cell.service';
import {TimeTableModelDayService} from '../../../../services/time-table-model-day.service';
import {ClassProgramService} from '../../../../services/class-program.service';


@Component({
  selector: 'app-today-teacher-course-plan-add-edit',
  templateUrl: './admin-teacher-course-plan-add-edit.component.html',
  styleUrls: ['./admin-teacher-course-plan-add-edit.component.scss']
})
export class AdminTeacherCoursePlanAddEditComponent {

  listOfTeacherCoursePlanForm: FormGroup;
  modelDays: any[] = [];
  modelDaySelected: number | undefined;
  courses: any[] = [];

  courseSelected: number | undefined;
  saving = false;

  public data: any;

  minEndDate: string;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private timeTablemodeldaycellService: TimeTableModelDayCellService,
              private modelDayService: TimeTableModelDayService,
              private courseService: ClassProgramService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router,
              private datePipe: DatePipe
  ) {
    this.listOfTeacherCoursePlanForm = this.fb.group({
      modelDay: '',
      course: '',
      startAt: '',
      endAt: '',
      isScoreValidated: '',
    });
  }

  ngOnInit(): void {
    console.log(this.data);
    this.listOfTeacherCoursePlanForm.patchValue(this.data);
    console.log(this.data);
    if (this.data){
      this.modelDaySelected = this.data.modelDay['@id'];
      console.log(this.data);

      this.courseSelected = this.data.course['@id'];

      const startAt = this.datePipe.transform(this.data.startAt, 'HH:mm');
      this.listOfTeacherCoursePlanForm.get('startAt')?.setValue(startAt);

      const endAt = this.datePipe.transform(this.data.endAt, 'HH:mm');
      this.listOfTeacherCoursePlanForm.get('endAt')?.setValue(endAt);
    }
    this.findAllModelDay();
    this.findAllCourse();
  }
  get fc(): any {
    return this.listOfTeacherCoursePlanForm.controls;
  }

  onStartDateChange(event: any) {
    this.minEndDate = event.target.value;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.listOfTeacherCoursePlanForm.valid) {
      this.saving = true;
      if (this.data) {
        this.timeTablemodeldaycellService.put(this.data.id, this.listOfTeacherCoursePlanForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('List of teacher course plan edited successfully !', 'Success');
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
      } else {
        this.timeTablemodeldaycellService.post(this.listOfTeacherCoursePlanForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('List of teacher course plan  created successfully !', 'Success');
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
      }

    }
  }
  findAllModelDay(): any{
    this.modelDayService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.modelDays = data['hydra:member'];
          this.modelDays = this.modelDays.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );


  }

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


}
