import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {SelectionModel} from '@angular/cdk/collections';
import {Router} from '@angular/router';
import {InstitutionService} from '../../services/institution.service';
import {Institution} from '../../interface/institution';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.scss']
})
export class InstitutionComponent implements OnInit {

  public institutions!: Institution[];
  temp = [];
  selected = [];
  public closeResult: string;
  public getDismissReason: string;
  public isButtonVisible = false;

  public visibility = 0;
  selectedIds: number[] = [];
  selection = new SelectionModel<any>(true, []);

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(public institutionService: InstitutionService, config: NgbModalConfig,
              private toastr: ToastrService, private modalService: NgbModal,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef) {
    this.getInstitutionList();
    config.backdrop = 'static';
    config.keyboard = false;
  }

  getInstitutionList(): any
  {
    this.institutionService.getInstitutionList().subscribe({
      next: (res: any) => {
        this.institutions = res['hydra:member'];

        console.log(this.institutions);

        // cache our list
        this.temp = [...res['hydra:member']];

        this.rows = this.institutions;

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

  onSelect({ selected }): void {
    console.log('Select Event', selected, this.selected);
    console.log(this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

    this.isButtonVisible ? this.isButtonVisible = false  : this.isButtonVisible = true;
  }

  onSingleSelect({ selected }): void {
    console.log(selected);
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    console.log(this.visibility);

    this.visibility > 0 ? this.isButtonVisible = true  : this.isButtonVisible = false;
  }

  remove(): void {
    this.selected = [];
  }


  addInstitution(): void {
    this.router.navigate(['/security/institution/add']);
  }

  editInstitution(id: number): void {
    this.router.navigate(['/security/institution/edit', id]);
  }

  deleteInstitution(id: number): any{
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
        this.institutionService.deleteInstitution(id).subscribe({
          next: (res) => {
            this.toastr.success('Institution successful deleted', 'Success');
            this.getInstitutionList();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });

  }

  deleteSelectedInstitutionRows(): void{
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
        this.institutionService.deleteMultipleInstitutions(ids).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Institutions deleted !', 'Success');
            this.getInstitutionList();
            // this.remove();
            this.selection.clear();
            this.isButtonVisible = false;
          },
          error: (err: any) => {
            console.log(err);
          }
        });

      }
    });

  }

}
