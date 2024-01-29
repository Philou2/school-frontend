import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {TimeTableModelDayCellService} from '../../../../services/time-table-model-day-cell.service';
import {ClassProgramService} from '../../../../services/class-program.service';

@Component({
  selector: 'app-swap-cell-add-edit',
  templateUrl: './swap-cell-add-edit.component.html',
  styleUrls: ['./swap-cell-add-edit.component.scss']
})
export class SwapCellAddEditComponent {

  swapCellForm: FormGroup;

  courses: any[] = [];
  rooms: any[] = [];
  teachers: any[] = [];
  teacherSelected: number | undefined;
  roomSelected: number | undefined;
  courseSelected: number | undefined;
  saving = false;

  public data: any;
  public timeTableModelDayCells: any;

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
    this.swapCellForm = this.fb.group({
      course: '',
      room: '',
      teacher: '',
    });
  }

  ngOnInit(): void {
    this.swapCellForm.patchValue(this.data);
    if (this.data){
      this.courseSelected = this.data.id;
      this.roomSelected = this.data.room['@id'];
      // this.teacherSelected = this.data.teacher['@id'];
    }
    this.findAllCourse();
  }
  get fc(): any {
    return this.swapCellForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.swapCellForm.valid) {
      this.saving = true;
      if (this.data) {
        this.timetableModelDayCellService.put(this.data.id, this.courseSelected).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Swap Cell edited successfully !', 'Success');
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
        this.timetableModelDayCellService.post(this.swapCellForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Swap Cell created successfully !', 'Success');
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

    findAllCourse(): any {
      if (!this.timeTableModelDayCells) {
        this.timetableModelDayCellService.getCollection().subscribe((data: any) => {
              console.log(data);
              this.courses = data['hydra:member'];
              this.courses = this.courses.map((v) => {
                // Check if the course object exists in the current item
                if (v.course) {
                  // Add the nameuvc property to the current item
                  v.nameuvc = v.course.nameuvc;
                }
                return v;
              });
              // Filter the all-totalCourses array to only include items with a nameuvc property
              this.courses = this.courses.filter((v) => v.nameuvc);
              console.log(this.courses); // This will now log the filtered all-totalCourses array
            },
            error => console.log(error)
        );
      } else {
        this.courses = this.timeTableModelDayCells.filter((v) => v.modelDay.model.id === this.data.modelDay.model.id );
        this.courses = this.courses.map((v) => {
            v.nameuvc = `${v.modelDay.day} - ${v.course.nameuvc}`;
            return v;
        });
      }
    }
}
