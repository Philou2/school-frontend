import {Component, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {InstitutionService} from '../../../../../../security/services/institution.service';
import {SchoolYearService} from '../../../../../schooling/services/configuration/school-year.service';
import {SchoolService} from '../../../../../schooling/services/configuration/school.service';
import {ClassProgramService} from '../../../../../study/services/class-program.service';
import {SequenceService} from '../../../../services/configuration/sequence.service';
import {SchoolClassService} from '../../../../../schooling/services/configuration/school-class.service';
import {SchoolMarkService} from '../../../../services/configuration/school-mark.service';
import {ClassProgram} from '../../../../../study/interface/class-program';
import {SchoolMark} from '../../../../interface/configuration/school-mark';
import {School} from '../../../../../schooling/interface/configuration/School';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-open-or-close-mark-entry',
  templateUrl: './open-or-close-mark-entry.component.html',
  styleUrls: ['./open-or-close-mark-entry.component.scss']
})
export class OpenOrCloseMarkEntryComponent {

  constructor(
    private toastr: ToastrService,
    private translateService: TranslateService,
    private institutionService: InstitutionService,
    private classProgramService: ClassProgramService,
    private schoolYearService: SchoolYearService,
    private schoolService: SchoolService,
    private sequenceService: SequenceService,
    private schoolClassService: SchoolClassService,
    private schoolMarkService: SchoolMarkService
    // ,private _noteTypeService: NoteTypeService
  ) {
  }

  selectedIds: number[] = [];
  isLoading = true;
  isButtonVisible = false;
  selection = new SelectionModel<any>(true, []);
  selectionSimple = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  schoolClassListSelect!: any;
  sequenceListSelect!: any;
  schoolYearListSelect!: any;
  institutionListSelect!: any;



  displayedColumns: string[] = [
    'select',
    'subject',
    'actions'
  ];
  dataSource!: MatTableDataSource<ClassProgram>;

  classPrograms!: ClassProgram[];
  classProgramsFiltered!: ClassProgram[];
  schoolMarks!: SchoolMark[];
  schoolMarksFiltered!: SchoolMark[];

  schoolYearListFiltered!: any[];
  sequenceListFiltered!: any[];
  schoolClassListFiltered!: any[];

  isVisuallyChecked = false;



  schoolYearList!: any[];

  public schoolList!: School[];
  public schoolListSelect!: string | undefined;

  schoolClassList!: any[];

  sequenceList!: any[];

  openAllPredicate = (row: any) => !row.isOpen;
  closeAllPredicate = (row: any) => row.isOpen;

  openAll = this.selection.selected.every(this.openAllPredicate);
  closeAll = this.selection.selected.every(this.closeAllPredicate);
  openCloseAll = !(this.openAll || this.closeAll);

  openCloseAllKey  = (this.openAll ? 'open' : (this.closeAll ? 'close' : 'open_close')) + '_all';


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.filter((row: any) => row.schoolMark).length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.filter((row: any) => row.schoolMark).forEach(row => this.selection.select(row));
  }
  selectionToggle( row: any ) {
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
  getSchoolYearList(): void{
    this.schoolYearService.getCollection().subscribe(
      {
        next: (res: any) => {
          this.schoolYearList = res['hydra:member'];   // Initialisation
          this.schoolYearListFiltered = this.schoolYearList;  // Initialisation
          // this.schoolYearListSelect = this.schoolYearListFiltered[0]['@id'];
          console.log(res);
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
        // this.schoolListSelect = this.schoolList[0]['@id']
        // this.schoolMultipleListSelect = this.schoolListSelect
      },
      complete: () => this.getSchoolClassList(),
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.log('Error while fetching the records');
        this.isLoading = false;
      }
    });
  }
  getSchoolClassList(): void{
    this.schoolClassService.getCollection().subscribe(
      {
        next: (res: any) => {
          this.schoolClassList = res['hydra:member'];  // Initiation
          this.schoolClassListFiltered = this.schoolClassList;   // Initiation
          // Selection automatique du 1er element s'il y'en a.

          // this.schoolClassListSelect = this.schoolClassList[0]['@id'];


          console.log(res);
        },
        complete: () => this.getSequenceList(),
        error: this.errorWhileFetchingTheRecords
      }
    );
  }
  getSequenceList(): void{
    this.sequenceService.getList().subscribe(
      {
        next: (res: any) => {
          this.sequenceList = res['hydra:member'];    // Initialisation
          this.sequenceListFiltered = this.sequenceList; // Initialisation
          // this.sequenceListSelect = this.sequenceListFiltered[0]['@id'];
          console.log(res);
        },
        complete: () => this.getMarkList(),
        error: this.errorWhileFetchingTheRecords
      }
    );
  }


  /*

    noteTypeList! : any[]
    getNoteTypeList(): void{
      this._noteTypeService.getNoteTypeList().subscribe(
        {
          next: (res: any) => {
            this.noteTypeList = res['hydra:member'];
            console.log(res);
          },
          complete: () => this.getList(),
          error: this.errorWhileFetchingTheRecords
        }
      )
    }
  */

  /** Function getList() */
  getMarkList() {
    this.schoolMarkService.getList().subscribe({
      next: (res: any) => {
        this.schoolMarks = res['hydra:member'];
        console.log(this.schoolMarks);
      },
      error: this.errorWhileFetchingTheRecords,
      complete: () => this.getList()
    });
  }

  getList() {
    this.classProgramService.getCollection().subscribe({
      next: (res: any) => {
        this.classPrograms = res['hydra:member'];
        this.classProgramsFiltered = this.classPrograms;
        this.classPrograms.forEach((classProgram: any) => {
          // Pour le tableau
          classProgram.subjectName = classProgram.subject.name;
        });
        console.log(this.classPrograms);


        // this.classPrograms
        this.filter(); // Appeler la méthode


        this.isLoading = false;
      },
      error: this.errorWhileFetchingTheRecords
    });
  }

  filter(isYear: boolean = false) {
    console.log('Bonjour ! ' + this.schoolClassListSelect);

    if (isYear){
    this.sequenceListFiltered = this.sequenceList.filter( (sequence: any) =>  sequence.year['@id'] === this.schoolYearListSelect  );
    this.schoolClassListFiltered = this.schoolClassList.filter( (schoolClass: any) =>  schoolClass.year['@id'] === this.schoolYearListSelect  );
    this.sequenceListSelect = undefined;
    this.schoolClassListSelect = undefined;

    }

    // if( this.schoolClassListFiltered.length > 1 ) this.schoolClassListFiltered = [ { code: this.translate('all_f') , '@id' : 'undefined' }, ...this.schoolClassList ]


    // this.sequenceListFiltered = this.sequenceList.filter( (schoolYear: any) => schoolYear.institution === this.institutionListSelect )
    // this.schoolYearListSelect = this.schoolYearListFiltered.length !== 0 ? this.schoolYearListFiltered[0]['@id'] : undefined



    this.classProgramsFiltered = this.classPrograms.filter(
      (classProgram: any) =>
        this.sequenceListSelect &&
        (classProgram.class['@id'] === this.schoolClassListSelect) &&
        (classProgram.school['@id'] === this.schoolListSelect) &&
        (classProgram.year['@id'] === this.schoolYearListSelect)
    );
    this.schoolMarksFiltered = this.schoolMarks.filter(
      (schoolMark: any) =>
        (schoolMark.class === this.schoolClassListSelect) &&
        (schoolMark.school === this.schoolListSelect) &&
        (schoolMark.schoolYear === this.schoolYearListSelect) &&
        (schoolMark.sequence === this.sequenceListSelect)
    );
    this.classProgramsFiltered.forEach( (classProgram: any) => {
      const schoolMark = this.schoolMarksFiltered.find((schoolMark: any) => schoolMark.subject['@id'] === classProgram.subject['@id']);
      classProgram.isOpen = schoolMark?.isOpen;
      classProgram.schoolMark = schoolMark;
    });
    console.log(this.schoolMarksFiltered);
    console.log(this.classProgramsFiltered);
    this.dataSource = new MatTableDataSource(this.classProgramsFiltered);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = function(classProgram: any, filter: string) {
      return classProgram.subject.name.toString().toLowerCase().includes(filter);
    };
  }

  errorWhileFetchingTheRecords() {
    return (error: HttpErrorResponse) => {
      console.log(error);
      this.toastr.error(`${this.translate('errorWhileFetchingTheRecords')}.${error.message}`, this.translate('error'));
      this.isLoading = false;
    };
  }
  openOrCloseMarkEntry(row?: any){


    const openAll = this.selection.selected.every(this.openAllPredicate);
    const closeAll = this.selection.selected.every(this.closeAllPredicate);

    const openCloseAllKey  = (openAll ? 'open' : (closeAll ? 'close' : 'open_close') ) + '_all';

    const confirmButtonKey = row ? (row.isOpen ? 'close' : 'open')  : openCloseAllKey;

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
        const lowerSpacedClassProgram = this.translate('classProgram').toLowerCase();
        const ids = row ? row.schoolMark.id : this.selection.selected.map( (row) => row.schoolMark?.id  ).join('-');
        console.log(ids);
        this.schoolMarkService.openOrCloseMarkEntry(ids).subscribe({
          next: (res: any) => {
            Swal.fire(
              this.translate('updated'), // Deleted !
              this.translate(`updated_${confirmButtonKey}`),  // Your general account range has been deleted.
              'success'
            );
            this.selection.clear();
            this.isLoading = true;
            this.getMarkList();
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
