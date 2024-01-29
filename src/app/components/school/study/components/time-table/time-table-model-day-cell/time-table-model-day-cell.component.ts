import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {TimeTableModelDayCellAddEditComponent} from './time-table-model-day-cell-add-edit/time-table-model-day-cell-add-edit.component';
import {TimeTableModelDayCell} from '../../../interface/time-table-model-day-cell';
import {TimeTableModelDayCellService} from '../../../services/time-table-model-day-cell.service';
import {ChangeTeacherAddEditComponent} from './change-teacher-add-edit/change-teacher-add-edit.component';
import {ChangeRoomAddEditComponent} from './change-room-add-edit/change-room-add-edit.component';
import {ChangeCourseAddEditComponent} from './change-course-add-edit/change-course-add-edit.component';
import {SwapCellAddEditComponent} from './swap-cell-add-edit/swap-cell-add-edit.component';

@Component({
  selector: 'app-time-table-model-day-cell',
  templateUrl: './time-table-model-day-cell.component.html',
  styleUrls: ['./time-table-model-day-cell.component.scss']
})
export class TimeTableModelDayCellComponent implements OnInit {

  public timeTableModelDayCells!: TimeTableModelDayCell[];
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
  constructor(public timeTableDayCellService: TimeTableModelDayCellService, config: NgbModalConfig,
              private toastr: ToastrService, private modalService: NgbModal,
              private changeDetectorRef: ChangeDetectorRef) {
    this.getTimeTableModelDayCelllist();
    config.backdrop = 'static';
    config.keyboard = false;
    console.log('toto');
  }

  getTimeTableModelDayCelllist(): any
  {
    this.timeTableDayCellService.getCollection().subscribe({
      next: (res: any) => {
        console.log(res);
        this.timeTableModelDayCells = res['hydra:member'];

        console.log(this.timeTableModelDayCells);

        // cache our list
        // this.temp = [...res['hydra:member']];
        this.temp = [...res['hydra:member']];

        this.rows = this.timeTableModelDayCells;

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
    console.log('hello');
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

  addTimeTableModelDayCell() {
    const modalRef = this.modalService.open(TimeTableModelDayCellAddEditComponent);
    modalRef.componentInstance.name = 'World';

    modalRef.result.then(() => {
      setTimeout(() => {
        this.loadingIndicator = true;
        this.changeDetectorRef.detectChanges();
        this.getTimeTableModelDayCelllist();
      }, 5);
    });
  }

  editTeacher(data: any) {
    console.log(data);
    const modalRef = this.modalService.open(ChangeTeacherAddEditComponent,
    // modalRef.componentInstance.name = 'World';
    {
          centered: true,
          // backdrop: 'static'
        }
        );

    modalRef.componentInstance.data = data;

    modalRef.result.then(() => {
      setTimeout(() => {
        this.loadingIndicator = true;
        this.changeDetectorRef.detectChanges();
        this.getTimeTableModelDayCelllist();
      }, 5);
    });
  }

  editRoom(data: any) {
    console.log(data);
    const modalRef = this.modalService.open(ChangeRoomAddEditComponent,
    // modalRef.componentInstance.name = 'World';
    {
          centered: true,
          // backdrop: 'static'
        }
        );

    modalRef.componentInstance.data = data;

    modalRef.result.then(() => {
      setTimeout(() => {
        this.loadingIndicator = true;
        this.changeDetectorRef.detectChanges();
        this.getTimeTableModelDayCelllist();
      }, 5);
    });
  }
  editSwap(data: any) {
    console.log(data);
    const modalRef = this.modalService.open(SwapCellAddEditComponent,
    // modalRef.componentInstance.name = 'World';
    {
          centered: true,
          // backdrop: 'static'
        }
        );
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.timeTableModelDayCells = this.timeTableModelDayCells;

    modalRef.result.then(() => {
      setTimeout(() => {
        this.loadingIndicator = true;
        this.changeDetectorRef.detectChanges();
        this.getTimeTableModelDayCelllist();
      }, 5);
    });
  }

  editCourse(data: any) {
    console.log(data);
    const modalRef = this.modalService.open(ChangeCourseAddEditComponent,
    // modalRef.componentInstance.name = 'World';
    {
          centered: true,
          // backdrop: 'static'
        }
        );

    modalRef.componentInstance.data = data;

    modalRef.result.then(() => {
      setTimeout(() => {
        this.loadingIndicator = true;
        this.changeDetectorRef.detectChanges();
        this.getTimeTableModelDayCelllist();
      }, 5);
    });
  }
  deleteTimeTableModelDayCell(id: number): any{
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
        this.timeTableDayCellService.delete(id).subscribe({
          next: (res) => {
            this.toastr.success('Time Table Model Day Cell successfully deleted', 'Success');
            this.getTimeTableModelDayCelllist();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });

  }

  deleteSelectedTimeTableModelDayCellRows() {
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
        this.timeTableDayCellService.deleteMultiple(ids).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Time Table Model Day Cell deleted !', 'Success');
            this.getTimeTableModelDayCelllist();
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
