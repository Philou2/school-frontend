import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {TeacherYearAddEditComponent} from './teacher-year-add-edit/teacher-year-add-edit.component';
import {TeacherYear} from '../../../interface/teacher-year';
import {TeacherYearService} from '../../../services/teacher-year.service';

@Component({
  selector: 'app-teacher-year',
  templateUrl: './teacher-year.component.html',
  styleUrls: ['./teacher-year.component.scss']
})
export class TeacherYearComponent implements OnInit {

  public teacherYears!: TeacherYear[];
  temp = [];
  selected = [];
  public closeResult: string;
  public getDismissReason: string;
  public isButtonVisible = false;

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(public teacherYearService: TeacherYearService, config: NgbModalConfig,
              private toastr: ToastrService, private modalService: NgbModal,
              private changeDetectorRef: ChangeDetectorRef) {
    this.getTeacherYearList();
    config.backdrop = 'static';
    config.keyboard = false;
  }

  getTeacherYearList(): any {
    this.teacherYearService.getCollection().subscribe({
      next: (res: any) => {
        this.teacherYears = res['hydra:member'];

        console.log(this.teacherYears);

        // cache our list
        this.temp = [...res['hydra:member']];

        this.rows = this.teacherYears;

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

  addTeacherYear() {
    const modalRef = this.modalService.open(TeacherYearAddEditComponent, {
      centered: true,
    });

    modalRef.result.then(() => {
      setTimeout(() => {
        this.loadingIndicator = true;
        this.changeDetectorRef.detectChanges();
        this.getTeacherYearList();
      }, 5);
    });
  }

  editTeacherYear(data: any) {
    console.log(data);
    const modalRef = this.modalService.open(TeacherYearAddEditComponent,
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
        this.getTeacherYearList();
      }, 5);
    });
  }

  deleteTeacherYear(id: number): any {
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
        this.teacherYearService.delete(id).subscribe({
          next: (res) => {
            this.toastr.success('Teacher Year successfully deleted', 'Success');
            this.getTeacherYearList();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });

  }

  deleteSelectedTeacherYearRows() {
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
        this.teacherYearService.deleteMultiple(ids).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Teacher Year deleted !', 'Success');
            this.getTeacherYearList();
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
