import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {PermissionService} from '../../services/permission.service';
import {PermissionAddEditComponent} from './permission-add-edit/permission-add-edit.component';
import {Permission} from '../../interface/permission';
import {ImportPermissionComponent} from './permission-import/import-permission.component';
import {debounceTime} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';


interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
  type: 'success',
  message: 'This is an success alert',
},
  {
    type: 'info',
    message: 'This is an info alert',
  },
  {
    type: 'warning',
    message: 'This is a warning alert',
  },
  {
    type: 'danger',
    message: 'This is a danger alert',
  },
  {
    type: 'primary',
    message: 'This is a primary alert',
  },
  {
    type: 'secondary',
    message: 'This is a secondary alert',
  },
  {
    type: 'light',
    message: 'This is a light alert',
  },
  {
    type: 'dark',
    message: 'This is a dark alert',
  }
];
@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  public permissions!: Permission[];
  temp = [];
  selected = [];
  public closeResult: string;
  public getDismissReason: string;
  public isButtonVisible = false;

  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  alert: boolean = false;


  rows = [];
  loadingIndicator = true;
  reorderable = true;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(public permissionService: PermissionService, config: NgbModalConfig,
              private toastr: ToastrService, private modalService: NgbModal,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef) {
    this.getPermissionList();
    config.backdrop = 'static';
    config.keyboard = false;
  }

  getPermissionList(): any {
    this.permissionService.getPermissionList().subscribe({
      next: (res: any) => {
        this.permissions = res['hydra:member'];

        console.log(this.permissions);

        // cache our list
        this.temp = [...res['hydra:member']];

        this.rows = this.permissions;

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

  onSelect({selected}): void {
    console.log('Select Event', selected, this.selected);
    console.log(this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

    this.isButtonVisible = this.selected.length > 0;

  }

  remove(): void {
    this.selected = [];
  }
  addPermission(): void {
    const modalRef = this.modalService.open(PermissionAddEditComponent, {
      // centered: true,
    });

    modalRef.result.then(() => {
      setTimeout(() => {
        this.loadingIndicator = true;
        this.changeDetectorRef.detectChanges();
        this.getPermissionList();
      }, 5);
    });
  }

  importPermission(): void {
    this.router.navigateByUrl('/security/import/permission');
  }

  editPermission(data: any): void {
    console.log(data);
    const modalRef = this.modalService.open(PermissionAddEditComponent,
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
        this.getPermissionList();
      }, 5);
    });
  }

  deletePermission(id: number): any {
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
        this.permissionService.deletePermission(id).subscribe({
          next: (res): void => {
            this.toastr.success('Permission successful deleted', 'Success');
            this.getPermissionList();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });

  }

  deleteSelectedPermissionRows(): void {
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
        this.permissionService.deleteMultiplePermissions(ids).subscribe({
          next: (res): void => {
            console.log(res);
            this.toastr.success('Permissions deleted !', 'Success');
            this.getPermissionList();
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
