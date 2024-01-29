import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';
import {Teacher} from '../../../interface/teacher';
import {TeacherService} from '../../../services/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  public teachers!: Teacher[];
  temp = [];
  selected = [];
  public closeResult: string;
  public getDismissReason: string;
  public isButtonVisible = false;

  // editingTrue: boolean;

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(public teacherService: TeacherService,
              private toastr: ToastrService,
              private changeDetectorRef: ChangeDetectorRef, private router: Router,
            ) {
    this.getTeacherList();
    // config.backdrop = 'static';
    // config.keyboard = false;
  }
  getTeacherList(): any {
    this.teacherService.getCollection().subscribe({
      next: (res: any) => {
        console.log(res);
        this.teachers = res['hydra:member'];

        console.log(this.teachers);
        console.log(res);

        // cache our list
        this.temp = [...res['hydra:member']];

        this.rows = this.teachers;

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

  // changeVal(val: boolean){
  //   console.log(val);
  //   this.editingTrue = val;
  // }

  importTeacher(): void {
    this.router.navigateByUrl('/school/study/import/teacher');
  }

  addTeacher() {
    this.router.navigate(['/school/study/add-edit-teacher']);
  }

  editTeacher(data: any) {
    console.log(data);
    this.teacherService.changeTeacher(data);
    this.router.navigate(['/school/study/add-edit-teacher']);
  }


  deleteTeacher(id: number): any {
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
        this.teacherService.delete(id).subscribe({
          next: (res) => {
            this.toastr.success('Teacher successfully deleted', 'Success');
            this.getTeacherList();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });

  }

  deleteSelectedTeacherRows(): void {
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
        this.teacherService.deleteMultiple(ids).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Teacher deleted !', 'Success');
            this.getTeacherList();
            this.remove();
          },
          error: (err: any) => {
            console.log(err);
          }
        });

      }
    });

  }

  assignTeacher(id: number): any {
    Swal.fire({
      title: 'Are you sure ? you want to assign',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, assign it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingIndicator = true;
        this.teacherService.assignTeacher(id).subscribe({
          next: (res) => {
            this.toastr.success('Teacher successful assign', 'Success');
            this.getTeacherList();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });
  }

  assignSelectedTeacherRows(): void {
    Swal.fire({
      title: 'Are you sure you want to assign ' + this.selected.length + ' line(s) ?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, assign it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingIndicator = true;

        const obj = this.selected;
        const vals = Object.values(obj);
        const ids = vals.map(a => (a.id));
        this.teacherService.assignTeachers(ids).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Teachers assign !', 'Success');
            this.getTeacherList();
            this.remove();
            this.isButtonVisible = false;
          },
          error: (err: any) => {
            console.log(err);
            this.loadingIndicator = false;
            this.toastr.error(err['hydra:title'], 'Error');
          }
        });

      }
    });

  }

}
