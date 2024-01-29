import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {TimeTableModelDayAddEditComponent} from './time-table-model-day-add-edit/time-table-model-day-add-edit.component';
import {TimeTableModelDay} from "../../../interface/time-table-model-day";
import {TimeTableModelDayService} from "../../../services/time-table-model-day.service";
import {
  TimeTableModelDayCellAddEditComponent
} from "../time-table-model-day-cell/time-table-model-day-cell-add-edit/time-table-model-day-cell-add-edit.component";
import {TimeTableModelDayCellService} from "../../../services/time-table-model-day-cell.service";
import {TimeTableModelDayCell} from "../../../interface/time-table-model-day-cell";
import {ModuleAddEditComponent} from "../../configuration/module/module-add-edit/module-add-edit.component";

@Component({
  selector: 'app-time-table-model-day',
  templateUrl: './time-table-model-day.component.html',
  styleUrls: ['./time-table-model-day.component.scss']
})
export class TimeTableModelDayComponent implements OnInit {

  public timeTableModelDays!: TimeTableModelDay[];
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
  constructor(public timeTablemodelDayService: TimeTableModelDayService,
              public timeTableDayCellService: TimeTableModelDayCellService,
              config: NgbModalConfig,
              private toastr: ToastrService, private modalService: NgbModal,
              private changeDetectorRef: ChangeDetectorRef) {

    this.getTimeTableModelDaylist();
 /*   this.getTimeTableModelDayCelllist();*/

    config.backdrop = 'static';
    config.keyboard = false;
  }

  getTimeTableModelDaylist(): any
  {
    this.timeTablemodelDayService.getCollection().subscribe({
      next: (res: any) => {
        console.log(res);
        this.timeTableModelDays = res['hydra:member'];

        console.log(this.timeTableModelDays);

        // cache our list
        // this.temp = [...res['hydra:member']];
        this.temp = [...res['hydra:member']];

        this.rows = this.timeTableModelDays;
        this.timeTablemodelDayService.changeModelDay(this.timeTableModelDays);

        this.loadingIndicator = false;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        console.log('Error while fetching the records');
        this.loadingIndicator = false;
      }
    });
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

  addTimeTableModelDay() {
    const modalRef = this.modalService.open(TimeTableModelDayAddEditComponent);
    modalRef.componentInstance.name = 'World';

    modalRef.result.then(() => {
      setTimeout(() => {
        this.loadingIndicator = true;
        this.changeDetectorRef.detectChanges();
        this.getTimeTableModelDaylist();
      }, 5);
    });
  }


  addTimeTableModelDayCell() {
    const modalRef = this.modalService.open(TimeTableModelDayCellAddEditComponent);
    modalRef.componentInstance.name = 'World';

    modalRef.result.then(() => {
      setTimeout(() => {
        this.loadingIndicator = true;
        this.changeDetectorRef.detectChanges();
        console.log(this.getTimeTableModelDaylist);
        this.getTimeTableModelDaylist();
        console.log(this.getTimeTableModelDaylist);

      }, 5);
    });
  }

  editTimeTableModelDay(data: any) {
      console.log(data);
      const modalRef = this.modalService.open(TimeTableModelDayAddEditComponent,
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
        }, 5);
      });
    }

/*  deleteTimeTableModelDay(id: number): any{
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
        this.timeTablemodelDayService.delete(id).subscribe({
          next: (res) => {
            this.toastr.success('Time Table model day successfully deleted', 'Success');
            this.getTimeTableModelDaylist();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });

  }*/

/*  deleteSelectedTimeTableModelDayRows() {
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
        this.timeTablemodelDayService.deleteMultiple(ids).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Time Table model day deleted !', 'Success');
            this.getTimeTableModelDaylist();
            this.remove();
          },
          error: (err: any) => {
            console.log(err);
          }
        });

      }
    });

  }*/

}
