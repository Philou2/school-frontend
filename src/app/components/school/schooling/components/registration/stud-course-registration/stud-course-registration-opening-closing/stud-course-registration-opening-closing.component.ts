import {Component, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {SchoolService} from '../../../../services/configuration/school.service';
import {SchoolYearService} from '../../../../services/configuration/school-year.service';
import {SchoolClassService} from '../../../../services/configuration/school-class.service';
import {StudCourseRegistrationService} from '../../../../services/registration/stud-course-registration.service';
import {School} from '../../../../interface/configuration/School';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-stud-course-registration-opening-closing',
  templateUrl: './stud-course-registration-opening-closing.component.html',
  styleUrls: ['./stud-course-registration-opening-closing.component.scss']
})
export class StudCourseRegistrationOpeningClosingComponent {

  constructor(
    private translateService: TranslateService,
    private schoolService: SchoolService,
    private schoolYearService: SchoolYearService,
    private schoolClassService: SchoolClassService,
    private studCourseRegistrationService: StudCourseRegistrationService,
    private toastr: ToastrService
  ) {
  }

  selectedIds: number[] = [];
  isLoading = true;
  isButtonVisible = false;
  selection = new SelectionModel<any>(true, []);
  selectionSimple = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  schoolYearListSelect!: any;
  institutionListSelect!: any;

  displayedColumns: string[] = [
    'select',
    'class',
    'actions'
  ];
  dataSource!: MatTableDataSource<any>;

  isVisuallyChecked = false;

  schoolYearList!: any[];
  schoolYearListFiltered!: any[];

  public schoolList!: School[];
  public schoolListSelect!: string | undefined;

  schoolClassList!: any[];
  schoolClassListFiltered!: any[];

  openAllPredicate = (row: any) => !row.isChoiceStudCourseOpen;
  closeAllPredicate = (row: any) => row.isChoiceStudCourseOpen;

  openAll = this.selection.selected.every(this.openAllPredicate);
  closeAll = this.selection.selected.every(this.closeAllPredicate);

  openCloseAll = !(this.openAll || this.closeAll);

  openCloseAllKey = (this.openAll ? 'open' : (this.closeAll ? 'close' : 'open_close')) + '_all';

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  selectionToggle(row: any) {
    this.selection.toggle(row);
    console.log(this.selection.selected);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  translate(key: string): string {
    return this.translateService.instant(key);
  }

  ngOnInit() {
    this.getSchoolYearList();
  }

  getSchoolYearList(): void {
    this.schoolYearService.getListStudCourseReg().subscribe(
      {
        next: (res: any) => {
          this.schoolYearList = res['hydra:member'];   // Initialisation
          this.schoolYearListSelect = this.schoolYearList[0]['@id'];
          console.log(this.schoolYearList);
        },
        complete: () => this.getSchoolList(),
        error: this.errorWhileFetchingTheRecords
      }
    );
  }

  getSchoolList() {
    this.schoolService.getListStudCourseReg().subscribe({
      next: (res: any) => {
        this.schoolList = res['hydra:member'];
        console.log(this.schoolList);
      },
      complete: () => this.getList(),
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.log('Error while fetching the records');
        this.isLoading = false;
      }
    });
  }

  getList(){
    this.schoolClassService.getCollection().subscribe((data: any) => {
          this.schoolClassList = data['hydra:member'];
          this.schoolClassList = this.schoolClassList.map((v) => {
            v.id = v['@id'];
            return v;
          });
          console.log(this.schoolClassList);

        },
        error => this.errorWhileFetchingTheRecords
        , () => this.filter()
    );
  }

  // schoolClassStudent
  filter() {

    // if( this.schoolClassListFiltered.length > 1 ) this.schoolClassListFiltered = [ { code: this.translate('all_f') , '@id]' : 'undefined' }, ...this.schoolClassList ]

    // this.sequenceListFiltered = this.sequenceList.filter( (schoolYear: any) => schoolYear.institution === this.institutionListSelect )
    // this.schoolYearListSelect = this.schoolYearListFiltered.length !== 0 ? this.schoolYearListFiltered[0]['@id'] : undefined


    this.schoolClassListFiltered = this.schoolClassList.filter(
        (schoolClass: any) =>  (schoolClass.year['@id'] === this.schoolYearListSelect) && schoolClass.school['@id'] === this.schoolListSelect
    );

    this.selection.clear();
    this.dataSource = new MatTableDataSource(this.schoolClassListFiltered);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (schoolClass: any, filter: string): boolean => schoolClass.code.toString().toLowerCase().includes(filter);
    this.isLoading = false;

    /*this.dataSource.filterPredicate = function (data: StudCourseRegistration,filter:string) {
      //schoolMark.class['@id']  === this.schoolClassListSelect };
      let data1 = data.class === 'api/school_classes/11';
      console.log(data1);
      return false;
    }*/
  }

  errorWhileFetchingTheRecords() {
    return (error: HttpErrorResponse) => {
      console.log(error);
      this.toastr.error(`${this.translate('errorWhileFetchingTheRecords')}.${error.message}`, this.translate('error'));
      this.isLoading = false;
    };
  }

  getIdFromApiResourceId(apiResourceId: string | undefined){
    return apiResourceId ? apiResourceId.substring(apiResourceId.lastIndexOf('/') + 1) : '';
  }

  openOrCloseCoursesChoice(row?: any) {
    const openAll = this.selection.selected.every(this.openAllPredicate);
    const closeAll = this.selection.selected.every(this.closeAllPredicate);
    const openCloseAllKey = (openAll ? 'open' : (closeAll ? 'close' : 'open_close')) + '_all';
    const confirmButtonKey = row ? (row.isChoiceStudCourseOpen ? 'close' : 'open') : openCloseAllKey;

    Swal.fire(
      {
        title: this.translate('are_you_sure'), // Are you sure ?
        // text: this.translate("you_wont_be_able_to_revert_this"), // You won't be able to revert this!
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.translate(`yes_${confirmButtonKey}`)  // 'Yes, delete it!'
      }
    ).then((result) => {
      if (result.isConfirmed) {
        const lowerSpacedStudCourseRegistration = this.translate('schoolMark').toLowerCase();
        const schoolClassesSelected = (row ? [row] : this.selection.selected).map( (schoolClass: any) => this.getIdFromApiResourceId(schoolClass.id));
        this.studCourseRegistrationService.openOrCloseCoursesChoice({
          classIds: schoolClassesSelected
        }).subscribe({
          next: (res: any) => {
            Swal.fire(
              this.translate('updated'), // Deleted !
              this.translate(`updated_${confirmButtonKey}`),  // Your general account range has been deleted.
              'success'
            );
            this.getList();
          },
          error: (res: any) => {
            Swal.fire(
              this.translate('not_updated'), // Deleted !
              this.translate(`not_updated_${confirmButtonKey}`),  // Your general account range has not been deleted.
              'error'
            );
          }
        });
      }
    });
  }
}
