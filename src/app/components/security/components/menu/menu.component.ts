import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {MenuAddComponent} from './menu-add/menu-add.component';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {MenuService} from '../../services/menu.service';
import {Menu} from '../../interface/menu';
import {MenuEditComponent} from './menu-edit/menu-edit.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public menus!: Menu[];
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
  constructor(public menuService: MenuService, config: NgbModalConfig,
              private toastr: ToastrService, private modalService: NgbModal,
              private changeDetectorRef: ChangeDetectorRef) {
    this.getMenuList();
    config.backdrop = 'static';
    config.keyboard = false;
  }

  getMenuList(): any
  {
    this.menuService.getMenuList().subscribe({
      next: (res: any) => {
        this.menus = res['hydra:member'];

        console.log(this.menus);

        // cache our list
        this.temp = [...res['hydra:member']];

        this.rows = this.menus;

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

  remove(): void {
    this.selected = [];
  }

  addMenu(): void {
    const modalRef = this.modalService.open(MenuAddComponent, {
      // centered: true,
      modalDialogClass: 'modal-md'
    });
    modalRef.componentInstance.name = 'World';


    modalRef.closed.subscribe({
      next: (value) => {
          this.getMenuList();
      }
    });

    modalRef.result.then(() => {
      setTimeout(() => {
        this.loadingIndicator = true;
        this.changeDetectorRef.detectChanges();
        this.getMenuList();
      }, 5);
    });
  }

  editMenu(data: any): void {
    console.log(data);
    const modalRef = this.modalService.open(MenuEditComponent , {
          modalDialogClass: 'modal-md'
          // backdrop: 'static'
        }
    );
    modalRef.componentInstance.data = data;

    modalRef.result.then(() => {
      setTimeout(() => {
        this.loadingIndicator = true;
        this.changeDetectorRef.detectChanges();
        this.getMenuList();
      }, 5);
    });
  }
  deleteMenu(id: number): any{
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
        this.menuService.deleteMenu(id).subscribe({
          next: (res) => {
            this.toastr.success('Menu successful deleted', 'Success');
            this.getMenuList();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });

  }

  deleteSelectedMenuRows(): void{
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
        this.menuService.deleteMultipleMenu(ids).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Menus deleted !', 'Success');
            this.getMenuList();
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
