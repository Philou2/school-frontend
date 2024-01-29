import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {TeacherCourseAddEditComponent} from './teacher-course-add-edit/teacher-course-add-edit.component';
import {ClassProgram} from '../../../interface/class-program';
import {ClassProgramService} from '../../../services/class-program.service';

@Component({
  selector: 'app-teacher-course',
  templateUrl: './teacher-course.component.html',
  styleUrls: ['./teacher-course.component.scss']
})
export class TeacherCourseComponent implements OnInit {

  public classPrograms!: ClassProgram[];
  temp = [];
  selected = [];
  public closeResult: string;
  public getDismissReason: string;
  public isButtonVisible = false;

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(public classProgramService: ClassProgramService, config: NgbModalConfig,
              private toastr: ToastrService, private modalService: NgbModal,
              private changeDetectorRef: ChangeDetectorRef) {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user['profile']);
    if (user['profile'] === 'Teacher'){
/*
      this.getCurrentTeacherCourseList();
*/
    }
    else{
      this.getTeacherCourseList();
    }
  }
  getTeacherCourseList(): any {
    this.classProgramService.getCollection().subscribe({
      next: (res: any) => {
        this.classPrograms = res['hydra:member'];

        console.log(this.classPrograms);

        // cache our list
        this.temp = [...res['hydra:member']];

        this.rows = this.classPrograms;

        this.loadingIndicator = false;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        console.log('Error while fetching the records');
        this.loadingIndicator = false;
      }
    });
  }

/*  getCurrentTeacherCourseList(): any {
    this.classProgramService.getCurrentTeacherSubject().subscribe({
      next: (res: any) => {
        this.classPrograms = res['hydra:member'];

        console.log(this.classPrograms);

        // cache our list
        this.temp = [...res['hydra:member']];

        this.rows = this.classPrograms;

        this.loadingIndicator = false;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        console.log('Error while fetching the records');
        this.loadingIndicator = false;
      }
    });
  }*/

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

  onSelect({selected}): void{
    console.log('Select Event', selected, this.selected);
    console.log(this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

    this.isButtonVisible = this.selected.length > 0;

    // this.isButtonVisible ? this.isButtonVisible = false : this.isButtonVisible = true;
  }
  remove(): void{
    this.selected = [];
  }

  displayCheck(row): boolean{
    return row.name !== 'Ethel Price';
  }


  toggleExpandRow(row): void {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event): void {
    console.log('Detail Toggled', event);
  }

  editTeacherCourse(data: any): void {
    console.log(data);
    const modalRef = this.modalService.open(TeacherCourseAddEditComponent,
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
        this.getTeacherCourseList();
      }, 5);
    });
  }

}
