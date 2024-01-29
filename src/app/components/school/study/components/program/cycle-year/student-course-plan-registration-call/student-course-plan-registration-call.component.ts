import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {StudentCoursePlanRegistrationCallAddEditComponent} from './student-course-plan-registration-call-add-edit/student-course-plan-registration-call-add-edit.component';
import {TeacherCourseRegistrationService} from '../../../services/teacher-course-registration.service';
import {TeacherCourseRegistration} from '../../../interface/teacher-course-registration';
import {StudentCoursePlanRegistrationCallService} from '../../../services/student-course-plan-registration-call.service';

@Component({
  selector: 'app-teacher-year',
  templateUrl: './student-course-plan-registration-call.component.html',
  styleUrls: ['./student-course-plan-registration-call.component.scss']
})
export class StudentCoursePlanRegistrationCallComponent implements OnInit {

  public teacherCourseRegistrations!: TeacherCourseRegistration[];
  temp = [];
  selected = [];
  public closeResult: string;
  public getDismissReason: string;
  public isButtonVisible = false;

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(public studentCoursePlanRegistrationCallService: StudentCoursePlanRegistrationCallService, config: NgbModalConfig,
              private toastr: ToastrService, private modalService: NgbModal,
              private changeDetectorRef: ChangeDetectorRef) {
    this.getStudentCoursePlanRegistrationCallList();
    config.backdrop = 'static';
    config.keyboard = false;
  }

  getStudentCoursePlanRegistrationCallList(): any {
    this.studentCoursePlanRegistrationCallService.getCollection().subscribe({
      next: (res: any) => {
        this.teacherCourseRegistrations = res['hydra:member'];

        console.log(this.teacherCourseRegistrations);

        // cache our list
        this.temp = [...res['hydra:member']];

        this.rows = this.teacherCourseRegistrations;

        this.loadingIndicator = false;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        console.log('Error while fetching the records');
        this.loadingIndicator = false;
      }
    });
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  // tslint:disable-next-line:typedef
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    // tslint:disable-next-line:only-arrow-functions typedef
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSelect({selected}) {
    console.log('Select Event', selected, this.selected);
    console.log(this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

    this.isButtonVisible = this.selected.length > 0;

    // this.isButtonVisible ? this.isButtonVisible = false : this.isButtonVisible = true;
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [this.rows[1], this.rows[3]];
  }

  remove() {
    this.selected = [];
  }

  displayCheck(row) {
    return row.name !== 'Ethel Price';
  }

  edit(row: any) {
    // this.router.navigateByUrl('/details/' + row.id);
  }

  delete(row: any) {

  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  addStudentCoursePlanRegistrationCall() {
    const modalRef = this.modalService.open(StudentCoursePlanRegistrationCallAddEditComponent, {
      centered: true,
    });

    modalRef.result.then(() => {
      setTimeout(() => {
        this.loadingIndicator = true;
        this.changeDetectorRef.detectChanges();
        this.getStudentCoursePlanRegistrationCallList();
      }, 5);
    });
  }

  editStudentCoursePlanRegistrationCall(data: any) {
    console.log(data);
    const modalRef = this.modalService.open(StudentCoursePlanRegistrationCallAddEditComponent,
        {
          centered: true,
          // backdrop: 'static'
        }
    );
    modalRef.componentInstance.data = data;

    modalRef.result.then(() => {
      this.loadingIndicator = true;
      setTimeout(() => {
        this.changeDetectorRef.detectChanges();
        this.getStudentCoursePlanRegistrationCallList();
      }, 5);
    });
  }

  deleteStudentCoursePlanRegistrationCall(id: number): any {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingIndicator = true;
        this.studentCoursePlanRegistrationCallService.delete(id).subscribe({
          next: (res) => {
            this.toastr.success('Student Course plan Registration successfully deleted', 'Success');
            this.getStudentCoursePlanRegistrationCallList();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });

  }

  deleteSelectedStudentCoursePlanRegistrationCallRows() {
    Swal.fire({
      title: 'Are you sure you want to delete ' + this.selected.length + ' line(s) ?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingIndicator = true;

        const obj = this.selected;
        const vals = Object.values(obj);
        const ids = vals.map(a => (a.id));
        this.studentCoursePlanRegistrationCallService.deleteMultiple(ids).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Student Course Registration deleted !', 'Success');
            this.getStudentCoursePlanRegistrationCallList();
            this.remove();
          },
          error: (err: any) => {
            console.log(err);
          }
        });

      }
    });
  }
}
