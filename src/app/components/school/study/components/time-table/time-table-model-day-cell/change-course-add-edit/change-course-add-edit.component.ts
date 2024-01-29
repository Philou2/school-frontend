import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {ClassProgramService} from '../../../../services/class-program.service';
import {TimeTableModelDayCellService} from '../../../../services/time-table-model-day-cell.service';

@Component({
  selector: 'app-change-course-add-edit',
  templateUrl: './change-course-add-edit.component.html',
  styleUrls: ['./change-course-add-edit.component.scss']
})
export class ChangeCourseAddEditComponent {

  changeCourseForm: FormGroup;

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
              private timetableModelDayCellService: TimeTableModelDayCellService,
              private classProgramService: ClassProgramService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router,
              private datePipe: DatePipe
  ) {
    this.changeCourseForm = this.fb.group({
      course: '',

    });
  }

  ngOnInit(): void {
    this.changeCourseForm.patchValue(this.data);
    if (this.data){
      this.courseSelected = this.data.course['@id'];

    }
    this.findAllCourse();
  }
  get fc(): any {
    return this.changeCourseForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.changeCourseForm.valid) {
      this.saving = true;
      if (this.data) {
        this.timetableModelDayCellService.putGeneral(this.data.id, this.changeCourseForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Course edited successfully !', 'Success');
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
        this.timetableModelDayCellService.post(this.changeCourseForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Course created successfully !', 'Success');
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

  findAllCourse(): any{
    this.classProgramService.getCollection().subscribe((data: any) => {
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
