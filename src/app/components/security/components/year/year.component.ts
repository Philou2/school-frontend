import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {YearService} from '../../services/year.service';
import {Year} from '../../interface/Year';
import {Router} from '@angular/router';
import {HeaderComponent} from '../../../../shared/components/header/header.component';

@Component({
  selector: 'app-school-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.scss']
})
export class YearComponent implements OnInit {

  public years!: Year[];
  temp = [];
  selected = [];
  public closeResult: string;
  public getDismissReason: string;
  public isButtonVisible = false;

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(public yearService: YearService, config: NgbModalConfig, public router: Router,
              private toastr: ToastrService, private modalService: NgbModal,
              private changeDetectorRef: ChangeDetectorRef) {
    this.getYearList();

    config.backdrop = 'static';
    config.keyboard = false;
  }

  getYearList(): any {
    this.yearService.getCollection().subscribe({
      next: (res: any) => {
        this.years = res['hydra:member'];

        console.log(this.years);

        // cache our list
        this.temp = [...res['hydra:member']];

        this.rows = this.years;

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

  onSelect({selected}): void{
    console.log('Select Event', selected, this.selected);
    console.log(this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

    this.isButtonVisible = this.selected.length > 0;

  }

  onActivate(event): void {
    console.log('Activate Event', event);
  }

  remove(): void {
    this.selected = [];
  }

  toggleExpandRow(row): void {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event): void {
    console.log('Detail Toggled', event);
  }

  setCurrentUserYear(id: number): any {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, set it!'
    }).then((result: any): void => {
      if (result.isConfirmed) {
        this.loadingIndicator = true;
        this.yearService.setCurrentUserYear(id).subscribe({
          next: (res: any): void => {
            console.log(res);
            const userLocal = JSON.parse(localStorage.getItem('user'));
            userLocal.currentYear = res;
            localStorage.setItem('user', JSON.stringify(userLocal));

            this.toastr.success('Year successful set for this user', 'Success');
            this.getYearList();

            this.router.navigateByUrl('/HeaderComponent', {skipLocationChange: true}).then(() => {
              this.router.navigate(['YearComponent']);
            });
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });

  }

  deleteYear(id: number): any {
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
        this.yearService.delete(id).subscribe({
          next: (res) => {
            this.toastr.success('Speciality successful deleted', 'Success');
            this.getYearList();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });

  }

  deleteSelectedYearRows(): void {
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
        this.yearService.deleteMultiple(ids).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success(`Speciality's deleted !`, 'Success');
            this.getYearList();
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
