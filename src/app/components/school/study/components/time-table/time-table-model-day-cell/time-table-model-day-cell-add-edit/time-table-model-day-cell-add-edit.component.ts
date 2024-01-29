import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {ClassProgramService} from '../../../../services/class-program.service';
import {TimeTableModelDayService} from '../../../../services/time-table-model-day.service';
import {TimeTableModelDayCellService} from '../../../../services/time-table-model-day-cell.service';
import {TimeTableModelService} from '../../../../services/time-table-model.service';
import {TeacherService} from '../../../../services/teacher.service';

@Component({
  selector: 'app-time-table-model-day-cell-add-edit',
  templateUrl: './time-table-model-day-cell-add-edit.component.html',
  styleUrls: ['./time-table-model-day-cell-add-edit.component.scss']
})
export class TimeTableModelDayCellAddEditComponent {

  timeTableModelDayCellForm: FormGroup;
  models: any[] = [];
  modelDays: any[] = [];
  modelDaysFiltered: any[] = [];
  teachersFiltered: any[] = [];
  teachers: any[] = [];
  teacherSelected: number | undefined;
  modelSelected: number | undefined;
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
              private modelService: TimeTableModelService,
              private teacherService: TeacherService,
              private courseService: ClassProgramService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router,
              private datePipe: DatePipe
  ) {
    this.timeTableModelDayCellForm = this.fb.group({
      model: '',
      modelDay: '',
      course: '',
      teacher: '',
      startAt: '',
      endAt: '',
    });
  }

  ngOnInit(): void {
    console.log(this.data);
    this.timeTableModelDayCellForm.patchValue(this.data);
    console.log(this.data);
    if (this.data){
      this.modelSelected = this.data.model['@id'];
      this.modelDaySelected = this.data.modelDay['@id'];
      console.log(this.data);

      this.courseSelected = this.data.course['@id'];
      this.teacherSelected = this.data.teacher['@id'];

      const startAt = this.datePipe.transform(this.data.startAt, 'HH:mm');
      this.timeTableModelDayCellForm.get('startAt')?.setValue(startAt);

      const endAt = this.datePipe.transform(this.data.endAt, 'HH:mm');
      this.timeTableModelDayCellForm.get('endAt')?.setValue(endAt);
    }
    this.findAllModel();
    this.findAllModelDay();
    this.findAllCourse();
    this.findAllTeacher();
  }
  get fc(): any {
    return this.timeTableModelDayCellForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.timeTableModelDayCellForm.valid) {
      this.saving = true;
      if (this.data) {
        this.timeTablemodeldaycellService.put(this.data.id, this.timeTableModelDayCellForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Time Table Model Day Cell edited successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            this.saving = false;
            this.toastr.error(err.error['hydra:description']);
          }
        });
      } else {
        this.timeTablemodeldaycellService.post(this.timeTableModelDayCellForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Time Table Model Day Cell created successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            console.log(err['hydra:description']);
            this.saving = false;
            this.toastr.error(err['hydra:description']);
          }
        });
      }
    }
  }


  // onFormSubmit(): any {
  //   this.isSubmitted = true;
  //   if (this.timeTableModelDayCellForm.valid) {
  //     this.saving = true;
  //     if (this.data) {
  //       this.timeTablemodeldaycellService.put(this.data.id, this.timeTableModelDayCellForm.value).subscribe({
  //         next: (val: any) => {
  //           this.saving = false;
  //           this.toastr.success('Time Table Model Day Cell edited successfully !', 'Success');
  //           this.activeModal.close();
  //         },
  //         complete: () => {
  //         },
  //         error: (err: any) => {
  //           this.saving = false;
  //           const errors: any[] = err.violations;
  //           errors.forEach((v) => {
  //           });
  //         }
  //       });
  //     } else {
  //       this.timeTablemodeldaycellService.post(this.timeTableModelDayCellForm.value).subscribe({
  //         next: (val: any) => {
  //           this.saving = false;
  //           this.toastr.success('Time Table Model Day Cell created successfully !', 'Success');
  //           this.activeModal.close();
  //         },
  //         complete: () => {
  //         },
  //         error: (err: any) => {
  //           this.saving = false;
  //           console.log(err);
  //           const errors: any[] = err.violations;
  //           errors.forEach((v) => {
  //           });
  //         }
  //       });
  //     }
  //
  //   }
  // }
  findAllModel(): any{
    this.modelService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.models = data['hydra:member'];
          this.models = this.models.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

  applyModelFilter(event: any){
    console.log('BJR');
    this.modelDaysFiltered = this.modelDays.filter((modelDays: any) => modelDays.model['@id'] === this.modelSelected);
  }

  findAllModelDay(): any{
    this.modelDayService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.modelDays = data['hydra:member'];
          this.modelDays = this.modelDays.map((v) => {
            v.id = v['@id'];
            return v;
          });
          this.modelDaysFiltered = this.modelDays;
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

  applyCourseFilter(event: any){
    console.log('BJR');
    this.teachersFiltered = this.teachers.filter((teachers: any) => teachers.course['@id'] === this.courseSelected);
  }

  findAllTeacher(): any{
    this.teacherService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.teachers = data['hydra:member'];
          this.teachers = this.teachers.map((v) => {
            v.id = v['@id'];
            return v;
          });
          this.teachersFiltered = this.teachers;
        },
        error => console.log(error)
    );
  }


}
