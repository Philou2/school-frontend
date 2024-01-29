import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {OldStudentRegistrationPerClassService} from '../../../services/registration/old-student-registration-per-class.service';
import {OldStudentRegistrationService} from '../../../services/registration/old-student-registration.service';
import {OldStudentRegistrationPerClass} from '../../../interface/registration/oldStudentRegistrationPerClass';
import { Router } from '@angular/router';

@Component({
  selector: 'app-old-student-registration-per-class',
  templateUrl: './old-student-registration-per-class.component.html',
  styleUrls: ['./old-student-registration-per-class.component.scss']
})
export class OldStudentRegistrationPerClassComponent implements OnInit {

  public oldStudentRegistrationPerClasses!: OldStudentRegistrationPerClass[];
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

  constructor(public oldStudentRegistrationPerClassService: OldStudentRegistrationPerClassService,
              public oldStudentRegistrationService: OldStudentRegistrationService,
              private toastr: ToastrService,
              private changeDetectorRef: ChangeDetectorRef, private router: Router,
  ) {
    this.getOldStudentRegistrationPerClassList();
    // config.backdrop = 'static';
    // config.keyboard = false;
  }

  getOldStudentRegistrationPerClassList(): any {
    this.oldStudentRegistrationService.getCollection().subscribe({
      next: (res: any) => {
        console.log(res);
        this.oldStudentRegistrationPerClasses = res['hydra:member'][0].studregistration;

        console.log(this.oldStudentRegistrationPerClasses);
        console.log(res);

        // cache our list
        this.temp = [...res['hydra:member']];

        this.rows = this.oldStudentRegistrationPerClasses;

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

  getIdFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1];
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

  addOldStudentRegistrationPerClass() {
    this.router.navigate(['/school/schooling/add-edit-old-student-registration-per-class']);
  }

  editOldStudentRegistrationPerClass(data: any) {
    console.log(data);
    this.oldStudentRegistrationService.changeOldStudentRegistration(data);
    this.router.navigate(['/school/schooling/add-edit-old-student-registration']);
  }


  deleteOldStudentRegistrationPerClass(id: number): any {
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
        this.oldStudentRegistrationPerClassService.delete(id).subscribe({
          next: (res) => {
            this.toastr.success('Old Student Registration Per Class successfully deleted', 'Success');
            this.getOldStudentRegistrationPerClassList();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });

  }

  deleteSelectedOldStudentRegistrationPerClassRows() {
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
        this.oldStudentRegistrationPerClassService.deleteMultiple(ids).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Old Student Registration Per Class deleted !', 'Success');
            this.getOldStudentRegistrationPerClassList();
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
