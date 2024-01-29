import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ModuleAddEditComponent} from './module-add-edit/module-add-edit.component';
import {ModuleService} from '../../services/module.service';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {Module} from '../../interface/module';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {

  public modules!: Module[];
  temp = [];
  selected = [];
  public closeResult: string;
  public getDismissReason: string;
  public isButtonVisible = false;

  public test = 0;
  rows = [];
  loadingIndicator = true;
  reorderable = true;
  // rows = [{ name: 'select' }, { name: 'Name', prop: 'name', width: 400 }, { name: 'Actions', width: 200 }];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(public moduleService: ModuleService, config: NgbModalConfig,
              private toastr: ToastrService, private modalService: NgbModal,
              private changeDetectorRef: ChangeDetectorRef) {
    this.getModulelist();
    config.backdrop = 'static';
    config.keyboard = false;
  }

  getModulelist(): any
  {
    this.moduleService.getModuleList().subscribe({
      next: (res: any) => {
        console.log(res);
        // this.modules = res['hydra:member'];
        this.modules = res['hydra:member'];

        console.log(this.modules);

        // cache our list
        // this.temp = [...res['hydra:member']];
        this.temp = [...res['hydra:member']];

        this.rows = this.modules;

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
      return d.name.toLowerCase().indexOf(val) !== -1 ||
          d.color.toLowerCase().indexOf(val) !== -1 ||
          !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSelect({selected}): void {
    console.log('Select Event', selected, this.selected);
    console.log(this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

    this.isButtonVisible = this.selected.length > 0;

  }

  onActivate(event): void {
    console.log('Activate Event', event);
  }

  add(): void {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update(): void {
    this.selected = [this.rows[1], this.rows[3]];
  }

  remove(): void {
    this.selected = [];
  }

  displayCheck(row): boolean {
    return row.name !== 'Ethel Price';
  }

  toggleExpandRow(row): void {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event): void {
    console.log('Detail Toggled', event);
  }

  addModule(): void {
    const modalRef = this.modalService.open(ModuleAddEditComponent);
    modalRef.componentInstance.name = 'World';

    modalRef.result.then(() => {
      setTimeout(() => {
        this.loadingIndicator = true;
        this.changeDetectorRef.detectChanges();
        this.getModulelist();
      }, 5);
    });
  }

  editModule(data: any): void {
    console.log(data);
    const modalRef = this.modalService.open(ModuleAddEditComponent);
    // modalRef.componentInstance.name = 'World';
    modalRef.componentInstance.data = data;

    modalRef.result.then(() => {
      setTimeout(() => {
        this.loadingIndicator = true;
        this.changeDetectorRef.detectChanges();
        this.getModulelist();
      }, 5);
    });
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
        this.loadingIndicator = true;
        this.moduleService.deleteModule(id).subscribe({
          next: (res: Module): void => {
            this.toastr.success('Module successful deleted', 'Success');
            this.getModulelist();
          },
          error: (res): void => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });

  }

  deleteSelectedModuleRows(): void{
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
        this.moduleService.deleteMultipleModule(ids).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Modules deleted !', 'Success');
            this.getModulelist();
            this.remove();
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
