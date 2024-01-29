import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {SchoolClass} from '../../../interface/configuration/schoolClass';
import {SchoolClassService} from '../../../services/configuration/school-class.service';
import {ClassHourlyRateEditComponent} from './class-hourly-rate-edit/class-hourly-rate-edit.component';

@Component({
  selector: 'app-class-hourly-rate',
  templateUrl: './class-hourly-rate.component.html',
  styleUrls: ['./class-hourly-rate.component.scss']
})
export class ClassHourlyRateComponent implements OnInit {

  public rooms!: SchoolClass[];
  temp = [];
  selected = [];
  public closeResult: string;
  public getDismissReason: string;
  public isButtonVisible = false;

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(public classroomService: SchoolClassService, config: NgbModalConfig,
              private toastr: ToastrService, private modalService: NgbModal,
              private changeDetectorRef: ChangeDetectorRef) {
    this.getSchoolClassList();
    config.backdrop = 'static';
    config.keyboard = false;
  }

  getSchoolClassList(): any {
    this.classroomService.getClassCollection().subscribe({
      next: (res: any) => {
        this.rooms = res['hydra:member'];

        console.log(this.rooms);

        // cache our list
        this.temp = [...res['hydra:member']];

        this.rows = this.rooms;

        this.loadingIndicator = false;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        console.log('Error while fetching the records');
        this.loadingIndicator = false;
      }
    });
  }
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

  editclassHouurlyRate(data: any) {
    console.log(data);
    const modalRef = this.modalService.open(ClassHourlyRateEditComponent,
        {
          // centered: true,
          // backdrop: 'static'
        }
    );
    modalRef.componentInstance.data = data;

    modalRef.result.then(() => {
      this.loadingIndicator = true;
      setTimeout(() => {
        this.changeDetectorRef.detectChanges();
        this.getSchoolClassList();
      }, 5);
    });
  }


}
