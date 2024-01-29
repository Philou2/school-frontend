import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {SelectionModel} from '@angular/cdk/collections';
import {Router} from '@angular/router';
import {BranchService} from '../../services/branch.service';
import {Branch} from '../../interface/branch';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {

  public branchs!: Branch[];
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
  constructor(public branchService: BranchService, config: NgbModalConfig,
              private toastr: ToastrService, private modalService: NgbModal,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef) {
    this.getBranchList();
    config.backdrop = 'static';
    config.keyboard = false;
  }

  getBranchList(): any
  {
    this.branchService.getBranchList().subscribe({
      next: (res: any) => {
        this.branchs = res['hydra:member'];

        console.log(this.branchs);

        // cache our list
        this.temp = [...res['hydra:member']];

        this.rows = this.branchs;

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

  remove(): void {
    this.selected = [];
  }


  addBranch(): void {
    this.router.navigate(['/security/branch/add']);
  }

  editBranch(id: number): void {
    this.router.navigate(['/security/branch/edit', id]);
  }

  deleteBranch(id: number): any{
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
        this.branchService.deleteBranch(id).subscribe({
          next: (res) => {
            this.toastr.success('Branch successful deleted', 'Success');
            this.getBranchList();
          },
          error: (res) => {
            this.loadingIndicator = false;
            this.toastr.error(res['hydra:title'], 'Error');
          }
        });
      }
    });

  }

  deleteSelectedBranchRows(): void{
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
        this.branchService.deleteMultipleBranches(ids).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Branches deleted !', 'Success');
            this.getBranchList();
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
