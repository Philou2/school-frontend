import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {ClassProgramService} from '../../../services/class-program.service';
import { Router } from '@angular/router';
import {StudentAttendance} from '../../../interface/student-attendance';

@Component({
  selector: 'app-student-attendance-per-class-and-date',
  templateUrl: './student-attendance-per-class-and-date.component.html',
  styleUrls: ['./student-attendance-per-class-and-date.component.scss']
})
export class StudentAttendancePerClassAndDateComponent implements OnInit {

  public StudentAttendances!: StudentAttendance[];
  temp = [];
  selected = [];
  public closeResult: string;
  public getDismissReason: string;
  public isButtonVisible = false;

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  // rows = [{ name: 'select' }, { name: 'Name', prop: 'name', width: 400 }, { name: 'Actions', width: 200 }];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(public classProgramService: ClassProgramService,
              private toastr: ToastrService, 
              private changeDetectorRef: ChangeDetectorRef,
              private router: Router) {
    this.getStudentAttendanceList();

  }

  getStudentAttendanceList(): any
  {
    this.classProgramService.getCollection().subscribe({
      next: (res: any) => {
        console.log(res);
        this.StudentAttendances = res['hydra:member'];

        console.log(this.StudentAttendances);

        // cache our list
        // this.temp = [...res['hydra:member']];
        this.temp = [...res['hydra:member']];

        this.rows = this.StudentAttendances;

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


    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

  
    this.rows = temp;
    this.table.offset = 0;
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    console.log(this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

     this.isButtonVisible = this.selected.length > 0;

    // this.isButtonVisible ? this.isButtonVisible = false  : this.isButtonVisible = true;
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

  // addClassProgram() {
  //   const modalRef = this.modalService.open(StudentAttendancePerClassAndDateAddEditComponent, {
  //     // centered: true,
  //     modalDialogClass: 'modal-xl'
  //     // backdrop: 'static'
  //   });
  //   modalRef.componentInstance.name = 'World';

  //   modalRef.result.then(() => {
  //     setTimeout(() => {
  //       this.loadingIndicator = true;
  //       this.changeDetectorRef.detectChanges();
  //       this.getStudentAttendanceList();
  //     }, 5);
  //   });
  // }

  addStudentAttendance() {
    this.router.navigate(['/school/study/add-edit-attendance-per-classe']);
  }

  editStudentAttendance(data: any) {
    console.log(data);
    this.classProgramService.changeClassProgram(data);
    this.router.navigate(['/school/study/add-edit-attendance-per-classe']);
  }


  deleteStudentAttendance(id: number): any{
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
        this.classProgramService.delete(id).subscribe({
          next: (res) => {
            this.toastr.success('Student Attendance successful deleted', 'Success');
            this.getStudentAttendanceList();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });

  }

  deleteSelectedStudentAttendanceRows() {
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
        this.classProgramService.deleteMultiple(ids).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Student Attendances deleted !', 'Success');
            this.getStudentAttendanceList();
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
