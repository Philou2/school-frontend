import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../services/user.service';
import {User} from '../../interface/user';
import {SelectionModel} from '@angular/cdk/collections';
import {Router} from '@angular/router';
import {UserPasswordUpdateComponent} from './user-password-update/user-password-update.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public users!: User[];
  temp = [];
  selected = [];
  public closeResult: string;
  public getDismissReason: string;
  public isButtonVisible = false;

  public test = 0;
  selectedIds: number[] = [];
  selection = new SelectionModel<any>(true, []);

  rows = [];
  loadingIndicator = true;
  reorderable = true;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(public userService: UserService, config: NgbModalConfig,
              private toastr: ToastrService, private modalService: NgbModal,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef) {
    this.getUserList();
    config.backdrop = 'static';
    config.keyboard = false;
  }

  getUserList(): any
  {
    this.userService.getUserCollection().subscribe({
      next: (res: any) => {
        this.users = res['hydra:member'];

        console.log(this.users);

        // cache our list
        this.temp = [...res['hydra:member']];

        this.rows = this.users;

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
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

    this.isButtonVisible = this.selected.length > 0;

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

  remove(): void {
    this.selected = [];
  }


  addUser(): void {
    this.router.navigate(['/security/user/add']);
  }

  editUser(id: number): void {
    this.router.navigate(['/security/user/edit', id]);
  }

  updatePassword(data: any): void{
    console.log(data);
    const modalRef = this.modalService.open(UserPasswordUpdateComponent,
        {
          // centered: true,
          // backdrop: 'static'
        }
    );
    modalRef.componentInstance.data = data;

    modalRef.result.then(() => {
      setTimeout(() => {
        this.loadingIndicator = true;
        this.changeDetectorRef.detectChanges();
        this.getUserList();
      }, 5);
    });
  }

  deleteUser(id: number): any{
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
        this.userService.deleteUser(id).subscribe({
          next: (res) => {
            this.toastr.success('User successful deleted', 'Success');
            this.getUserList();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });

  }

  deleteSelectedUserRows(): void{
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
        this.userService.deleteMultipleUser(ids).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Users deleted !', 'Success');
            this.getUserList();
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
