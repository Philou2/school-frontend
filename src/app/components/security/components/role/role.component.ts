import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {RoleService} from '../../services/role.service';
import {RoleAddComponent} from './role-add/role-add.component';
import {Role} from '../../interface/role';
import {Router} from '@angular/router';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  public roles!: Role[];
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

  constructor(public roleService: RoleService, config: NgbModalConfig,
              private toastr: ToastrService, private profileService: ProfileService,
              private router: Router) {
    this.getRoleList();
    config.backdrop = 'static';
    config.keyboard = false;
  }

  getRoleList(): any {
    this.profileService.getProfileList().subscribe({
      next: (res: any) => {
        this.roles = res['hydra:member'];

        console.log(res);

        // cache our list
        this.temp = [...res['hydra:member']];

        this.rows = this.roles;

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
  ngOnInit(): void {
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

  onDetailToggle(event): void {
    console.log('Detail Toggled', event);
  }

  addRole(): void {
    this.router.navigateByUrl('/security/role/add');
  }

  editRole(id: number): void {
    this.router.navigate(['/security/role/edit', id]);
  }

  deleteRole(id: number): any {
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
        this.profileService.deleteProfile(id).subscribe({
          next: (res) => {
            this.toastr.success('Profile successful deleted', 'Success');
            this.getRoleList();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });

  }

  remove(): void {
    this.selected = [];
  }

  deleteSelectedProfileRows(): void {
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
        this.profileService.deleteMultipleProfile(ids).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Profile (s) deleted !', 'Success');
            this.getRoleList();
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
