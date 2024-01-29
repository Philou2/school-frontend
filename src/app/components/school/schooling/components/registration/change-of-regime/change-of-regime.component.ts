import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {StudentService} from '../../../services/registration/student.service';
import {StudRegistrationService} from '../../../services/registration/stud-registration.service';
import {StudRegistration} from '../../../interface/registration/studRegistration';
import { Router } from '@angular/router';
import {ChangeOfRegimeAddEditComponent} from './change-of-regime-add-edit/change-of-regime-add-edit.component';

@Component({
  selector: 'app-change-of-regime',
  templateUrl: './change-of-regime.component.html',
  styleUrls: ['./change-of-regime.component.scss']
})
export class ChangeOfRegimeComponent implements OnInit {

  public studRegistrations!: StudRegistration[];
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

  constructor(public studentService: StudentService, public studRegistrationService: StudRegistrationService,
              private toastr: ToastrService, private modalService: NgbModal,
              private changeDetectorRef: ChangeDetectorRef, private router: Router,
  ) {
    this.getStudRegistrationList();
    // config.backdrop = 'static';
    // config.keyboard = false;
  }

  getStudRegistrationList(): any {
    this.studRegistrationService.getCollection().subscribe({
      next: (res: any) => {
        console.log(res);
        this.studRegistrations = res['hydra:member'][0].studregistration;

        console.log(this.studRegistrations);
        console.log(res);

        // cache our list
        this.temp = [...res['hydra:member']];

        this.rows = this.studRegistrations;

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

  editRegime(data: any) {
    console.log(data);
    const modalRef = this.modalService.open(ChangeOfRegimeAddEditComponent,
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
        this.getStudRegistrationList();
      }, 5);
    });
  }

}
