import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {ClassProgramService} from '../../../../services/class-program.service';
import {DatePipe} from '@angular/common';
import {TimeTableModelDayCellService} from '../../../../services/time-table-model-day-cell.service';
import {RequestCoursePermutationService} from '../../../../services/request-course-permutation.service';

@Component({
  selector: 'app-request-course-permutation-add-edit',
  templateUrl: './request-course-permutation-add-edit.component.html',
  styleUrls: ['./request-course-permutation-add-edit.component.scss']
})
export class RequestCoursePermutationAddEditComponent {

  requestForm: FormGroup;
  courses: any[] = [];
  otherCourses
  courseSelected: number | undefined;
  otherCourseSelected: number | undefined;
  saving = false;

  public data: any;
  public timeTableModelDayCells: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private requestCoursePermutationService: RequestCoursePermutationService,
              private timetableModelDayCellService: TimeTableModelDayCellService,
              private classProgramService: ClassProgramService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router,
              private datePipe: DatePipe
  ) {
    this.requestForm = this.fb.group({
      course: '',
      otherCourse: '',
      // date: '',
      // startAt: '',
      // endAt: '',
      comment: '',
    });
  }

  ngOnInit(): void {
    this.requestForm.patchValue(this.data);
    if (this.data){
      this.courseSelected = this.data.course['@id'];
      this.otherCourseSelected = this.data.otherCourse['@id'];

      // const date = this.datePipe.transform(this.data.date, 'mm-dd-yyyy', 'UTC');
      // this.requestForm.get('date')?.setValue(date);
      //
      // const startAt = this.datePipe.transform(this.data.startAt, 'HH:mm', 'UTC');
      // this.requestForm.get('startAt')?.setValue(startAt);
      //
      // const endAt = this.datePipe.transform(this.data.endAt, 'HH:mm', 'UTC');
      // this.requestForm.get('endAt')?.setValue(endAt);
    }
    this.findAllCourse();
    this.findAllOtherCourse();
  }
  get fc(): any {
    return this.requestForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.requestForm.valid) {
      this.saving = true;
      if (this.data) {
        this.requestCoursePermutationService.put(this.data.id, this.requestForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Request edited successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              this.saving = false;

            });
          }
        });
      } else {
        this.requestCoursePermutationService.post(this.requestForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Request created successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            console.log(err)
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              this.saving = false;
            });
          }
        });
      }

    }
  }

  findAllCourse(): any{
    this.timetableModelDayCellService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.courses = data['hydra:member'];
          this.courses = this.courses.map((v) => {
            // Check if the course object exists in the current item
            if (v.course) {
              // Add the nameuvc property to the current item
              // v.nameuvc = v.course.nameuvc;
              v.nameuvc = `${v.course.nameuvc} - ${new Date(v.date).toISOString().slice(0,10)} - ${new Date(v.startAt).toISOString().slice(11,16)} - ${new Date(v.endAt).toISOString().slice(11,16)}`;
            }
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

  findAllOtherCourse(): any{
    this.timetableModelDayCellService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.otherCourses = data['hydra:member'];
          this.otherCourses = this.otherCourses.map((v) => {
            // Check if the course object exists in the current item
            if (v.course) {
              // Add the nameuvc property to the current item
              v.nameuvc = `${v.course.nameuvc} - ${new Date(v.date).toISOString().slice(0,10)} - ${new Date(v.startAt).toISOString().slice(11,16)} - ${new Date(v.endAt).toISOString().slice(11,16)}`;
            }
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }


  // findAllCourse(): any {
  //   if (!this.timeTableModelDayCells) {
  //     this.timetableModelDayCellService.getCollection().subscribe((data: any) => {
  //           console.log(data);
  //           this.courses = data['hydra:member'];
  //           this.courses = this.courses.map((v) => {
  //             // Check if the course object exists in the current item
  //             if (v.course) {
  //               // Add the nameuvc property to the current item
  //               v.nameuvc = v.course.nameuvc;
  //             }
  //             return v;
  //           });
  //           // Filter the all-totalCourses array to only include items with a nameuvc property
  //           this.courses = this.courses.filter((v) => v.nameuvc);
  //           console.log(this.courses); // This will now log the filtered all-totalCourses array
  //         },
  //         error => console.log(error)
  //     );
  //   } else {
  //     this.courses = this.timeTableModelDayCells.filter((v) => v.modelDay.model.id === this.data.modelDay.model.id );
  //     this.courses = this.courses.map((v) => {
  //       v.nameuvc = `${v.modelDay.day} - ${v.course.nameuvc}`;
  //       return v;
  //     });
  //   }
  // }


}
