import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ParticipantAddEditComponent} from './participant-add-edit/participant-add-edit.component';
import {ParticipantService} from '../services/participant.service';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {content} from '../../../shared/routes/routes';
import {Participant} from '../interface/participant';

@Component({
  selector: 'app-sample',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {

  public participants!: Participant[];
  temp = [];
  selected = [];
  public closeResult: string;
  public getDismissReason: string;
  public isButtonVisible = false;

  public test = 0;
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(public participantService: ParticipantService, config: NgbModalConfig,
              private toastr: ToastrService, private modalService: NgbModal) {
    this.getParticipantList();
    config.backdrop = 'static';
    config.keyboard = false;
  }

  getParticipantList(): any
  {
    this.participantService.getEmployeeList().subscribe({
      next: (res: any) => {
        this.participants = res['hydra:member'];

        console.log(this.participants);

        // cache our list
        this.temp = [...res['hydra:member']];

        this.rows = this.participants;

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

    this.isButtonVisible ? this.isButtonVisible = false  : this.isButtonVisible = true;
  }

  // tslint:disable-next-line:typedef
  onSingleSelect({ selected }) {
    console.log(selected);
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    console.log(this.test);

    this.test > 0 ? this.isButtonVisible = true  : this.isButtonVisible = false;
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

  addModule() {
    const modalRef = this.modalService.open(ParticipantAddEditComponent);
    modalRef.componentInstance.name = 'World';
  }

  editModule(data: any) {
    console.log(data);
    const modalRef = this.modalService.open(ParticipantAddEditComponent ,
        {
          centered: true,
          backdrop: 'static'
        }
    );
    modalRef.componentInstance.name = 'World';
    modalRef.componentInstance.data = data;
  }
  deleteModule(id: number): any{
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
        this.participantService.deleteEmployee(id).subscribe({
          next: (res) => {
            // Swal.fire(
            //     'Deleted!',
            //     'Your file has been deleted.',
            //     'success'
            // );
            this.toastr.success('Participant successful deleted', 'Success');
            this.getParticipantList();
          },
          error: (res) => {
            console.log(res);
            Swal.fire(
                'Delete',
                'Your Item has not been deleted.',
                'error'
            );
          }
        });
      }
    });

  }

  deleteSelectedModuleRows(){
  }

}
