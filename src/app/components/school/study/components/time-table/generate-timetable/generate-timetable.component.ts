import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';
import {GenerateTimeTable} from '../../../interface/generate-time-table';
import {GenerateTimeTableService} from '../../../services/generate-time-table.service';
import {TimeTableModelService} from '../../../services/time-table-model.service';

@Component({
  selector: 'app-generate-timetable',
  templateUrl: './generate-timetable.component.html',
  styleUrls: ['./generate-timetable.component.scss']
})
export class GenerateTimetableComponent implements OnInit {

  public generateTimeTables!: GenerateTimeTable[];
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

  constructor(public generateTimeTableService: GenerateTimeTableService,
              private toastr: ToastrService, public timeTableModelService: TimeTableModelService,
              private changeDetectorRef: ChangeDetectorRef, private router: Router,
            ) {
    this.getGenerateTimeTableList();

  }

  getGenerateTimeTableList(): any {
    this.timeTableModelService.getCollection().subscribe({
      next: (res: any) => {
        this.generateTimeTables = res['hydra:member'];

        console.log(this.generateTimeTables);

        // cache our list
        this.temp = [...res['hydra:member']];

        this.rows = this.generateTimeTables;

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

  displayCalendar(id: number) {
    this.router.navigate(['/school/study/timetable-model/calendar/', id]);
  }

  addGenerateTimeTable() {
    this.router.navigate(['/school/study/add-edit-generate-timetable']);
  }

  editGenerateTimeTable(options: any) {
    console.log(options);
    this.generateTimeTableService.changeGenerateTimeTable(options);
    console.log(options);
    this.router.navigate(['/school/study/add-edit-generate-timetable']);
  }

  deleteGenerateTimeTable(id: number): any {
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
        this.generateTimeTableService.delete(id).subscribe({
          next: (res) => {
            this.toastr.success('Time Table Model successfully deleted', 'Success');
            this.getGenerateTimeTableList();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });

  }

  putValidate(id: number): any {
    Swal.fire({
      title: 'Are you sure you want to validate?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Validate it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingIndicator = true;
        this.timeTableModelService.putValidate(id).subscribe({
          next: (res) => {
            this.toastr.success('Status validated successfully', 'Success');
            this.getGenerateTimeTableList();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });

  }
  putInValidate(id: number): any {
    Swal.fire({
      title: 'Are you sure you want to un-validate?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Un-validate it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingIndicator = true;
        this.timeTableModelService.putInValidate(id).subscribe({
          next: (res) => {
            this.toastr.success('Status Un validated successfully', 'Success');
            this.getGenerateTimeTableList();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });

  }
  putPublish(id: number): any {
    Swal.fire({
      title: 'Are you sure you want to publish?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, publish it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingIndicator = true;
        this.timeTableModelService.putPublish(id).subscribe({
          next: (res) => {
            this.toastr.success('Time Table Model Published successfully', 'Success');
            this.getGenerateTimeTableList();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });
  }

  putUnPublish(id: number): any {
    Swal.fire({
      title: 'Are you sure you want to un-publish?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Un-Publish it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingIndicator = true;
        this.timeTableModelService.putUnPublish(id).subscribe({
          next: (res) => {
            this.toastr.success('Time Table Model Un-Published successfully', 'Success');
            this.getGenerateTimeTableList();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });
  }
  duplicateTimeTableModel(id: number): any {
    Swal.fire({
      title: 'Are you sure you want to duplicate?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Duplicate it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingIndicator = true;
        this.timeTableModelService.putDuplicate(id).subscribe({
          next: (res) => {
            this.toastr.success('Time Table Model Duplicated successfully', 'Success');
            this.getGenerateTimeTableList();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });
  }

  deleteSelectedTimeTableModelRows() {
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
        this.generateTimeTableService.deleteMultiple(ids).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Time Table Model deleted !', 'Success');
            this.getGenerateTimeTableList();
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
