import {Component, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {SchoolYearService} from '../../../../../../../schooling/services/configuration/school-year.service';
import {SchoolService} from '../../../../../../../schooling/services/configuration/school.service';
import {SchoolClassService} from '../../../../../../../schooling/services/configuration/school-class.service';
import {SequenceService} from '../../../../../../services/configuration/sequence.service';
import {SubjectService} from '../../../../../../../study/services/subject.service';
import {NoteTypeService} from '../../../../../../services/configuration/note-type.service';
import {ClassProgramService} from '../../../../../../../study/services/class-program.service';
import {SchoolMarkService} from '../../../../../../services/configuration/school-mark.service';
import {StudRegistrationService} from '../../../../../../../schooling/services/registration/stud-registration.service';
import {SchoolMark} from '../../../../../../interface/configuration/school-mark';
import {School} from '../../../../../../../schooling/interface/configuration/School';
import {ClassProgram} from '../../../../../../../study/interface/class-program';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-school-mark-viewing-notes-admin',
  templateUrl: './school-mark-viewing-notes-admin.component.html',
  styleUrls: ['./school-mark-viewing-notes-admin.component.scss']
})
export class SchoolMarkViewingNotesAdminComponent {

  // @ts-ignore
  constructor(
    private toastr: ToastrService,
    private translateService: TranslateService,
    private yearService: SchoolYearService,
    private schoolService: SchoolService,
    private classService: SchoolClassService,
    private sequenceService: SequenceService,
    // private _institutionService: InstitutionService,
    private schoolClassService: SchoolClassService,
    private subjectService: SubjectService,
    private noteTypeService: NoteTypeService,
    private classProgramService: ClassProgramService,
    private schoolMarkService: SchoolMarkService,
    // , private _schoolBaseService: SchoolBaseService
  ) {

  }

  selectedIds: number[] = [];
  isLoading = true;
  isButtonVisible = false;
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  sequenceListSelect!: any;    // (Propriétés/ attributs)Pour la selection par defaut et meme la transition d'une sequence en une autre.
  subjectListSelect!: any;
  noteTypeListSelect!: any;

  displayedColumns: string[] = [
    // 'anonymity',
    // 'matricule',
    'studentName',
    // 'general',
    'mark'
  ];
  dataSource!: MatTableDataSource<SchoolMark>;

  schoolMarks!: SchoolMark[];
  schoolMarksFiltered!: SchoolMark[];
  subjectListFiltered!: any[];

  base = 20;

  isSubmitted = false;
  saving = false;

  /** For the checked */
  isVisuallyChecked = false;

  yearList: any[] = [];
  yearListSelect: string | undefined;

  public schoolList!: School[];
  public schoolListSelect!: string | undefined;

  classList: any[] = [];
  classListSelect: string | undefined;

  /** Function getSequenceList() to the function getSchoolClassList() */
  sequenceList!: any[];
  sequenceListFiltered!: any[];

  /** Function getNoteTypeList() to the function getSchoolMarkList() */
  noteTypeList!: any[];

  public classPrograms!: ClassProgram[];
  public classProgramsFiltered!: ClassProgram[];
  subjectList!: any[];


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

  /** For the filter */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** For translate */
  translate(key: string): string {
    return this.translateService.instant(key);
  }


  /** We start for Sequence List */
  ngOnInit() {
    this.getSchoolYearList();
  }

  getSchoolYearList() {
    this.yearService.getListStudCourseReg().subscribe((data: any) => {
        this.yearList = data['hydra:member'];
        this.yearList = this.yearList.map((v) => {
          v.id = v['@id'];
          return v;
        });
        // this.yearListSelect = this.yearList.at(0)?.['@id']
      },
      error => console.log(error),
      () => this.getSchoolList()
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
      complete: () => this.getClassList(),
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.log('Error while fetching the records');
        this.isLoading = false;
      }
    });
  }

  getClassList() {
    this.classService.getCollection().subscribe((data: any) => {
        this.classList = data['hydra:member'];
        this.classList = this.classList.map((v) => {
          v.id = v['@id'];
          return v;
        });
        // this.classListSelect = this.classList.at(0)?.['@id']
      },
      error => console.log(error),
      () => this.getSequenceList()
    );
  }

  getSequenceList(): void {
    this.sequenceService.getList().subscribe(
      {
        next: (res: any) => {
          this.sequenceList = res['hydra:member'];
          // this.sequenceListSelect = this.sequenceList.length !== 0 ? this.sequenceList[0]['@id'] : undefined

          console.log(res);
        },
        complete: () => this.getNoteTypeList(),
        error: this.errorWhileFetchingTheRecords
      }
    );
  }

  getNoteTypeList(): void {
    this.noteTypeService.getNoteTypeList().subscribe(
      {
        next: (res: any) => {
          this.noteTypeList = res['hydra:member'];
          // this.noteTypeListSelect = this.noteTypeList.length !== 0 ? this.noteTypeList[0]['@id'] : undefined
          console.log(res);
        },
        complete: () => this.getClassProgramList(),
        error: this.errorWhileFetchingTheRecords
      }
    );
  }

  getClassProgramList() {
    this.isLoading = true;
    this.classProgramService.getListStudCourseReg().subscribe({
      next: (res: any) => {
        this.classPrograms = res['hydra:member'];
        // this.classProgramsFiltered = this.classPrograms.slice()
        console.log(this.classPrograms);
        this.subjectList = this.classPrograms.map((classProgram: any) => classProgram.subject);
      },
      complete: () => this.getMarkList(),
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.log('Error while fetching the records');
        this.isLoading = false;
      }
    });
  }

  /** Function errorWhileFetchingTheRecords */
  errorWhileFetchingTheRecords() {
    return (error: HttpErrorResponse) => {
      console.log(error);
      this.toastr.error(`${this.translate('errorWhileFetchingTheRecords')}.${error.message}`, this.translate('error'));
      this.isLoading = false;
    };
  }

  /** Function getList() */
  getMarkList() {
    this.schoolMarkService.getMarkList().subscribe({
      next: (res: any) => {
        this.schoolMarks = res['hydra:member'];
        this.schoolMarks.forEach((schoolMark: any) => {
          schoolMark.studentName = `${schoolMark.student.student.name} ${schoolMark.student.student.matricule}`;
          // schoolMark.matricule = schoolMark.student.student.matricule
        });
        console.log(this.schoolMarks);
        this.filter(true);
      },
      error: this.errorWhileFetchingTheRecords
    });
  }

  filter(isYear: boolean = false) {
    // console.log("Bonjour ! " + this.schoolClassListSelect);

    if (isYear) {
      this.sequenceListFiltered = this.sequenceList.filter((sequence: any) => (sequence.year['@id'] === this.yearListSelect));
      this.classListSelect = undefined;
      this.schoolListSelect = undefined;
      this.sequenceListSelect = undefined;
      this.noteTypeListSelect = undefined;
      this.subjectListSelect = undefined;
    }
    this.classProgramsFiltered = this.classPrograms.filter((classProgram: any) => classProgram.year['@id'] === this.yearListSelect && classProgram.school['@id'] === this.schoolListSelect
      && classProgram.class['@id'] === this.classListSelect);
    console.log(this.classProgramsFiltered);
    this.subjectListFiltered = this.classProgramsFiltered.map((classProgram: any) => classProgram.subject);

    // this.schoolClassListFiltered = this.schoolClassList.filter( (schoolClass: any) => ( ( schoolClass.institution === this.institutionListSelect ) && ( schoolClass.year['@id'] === this.schoolYearListSelect ) ) )
    // if( this.schoolClassListFiltered.length > 1 ) this.schoolClassListFiltered = [ { code: this.translate('all_f') , '@id' : 'undefined' }, ...this.schoolClassList ]


    // this.schoolClassListSelect = this.schoolClassListFiltered.length !== 0 ?  (isClass ? this.schoolClassListSelect : this.schoolClassListFiltered[0]['@id'] ) : undefined

    // this.sequenceListFiltered = this.sequenceList.filter( (schoolYear: any) => schoolYear.institution === this.institutionListSelect )
    // this.schoolYearListSelect = this.schoolYearListFiltered.length !== 0 ? this.schoolYearListFiltered[0]['@id'] : undefined

    this.schoolMarksFiltered = this.schoolMarks.filter(
      (schoolMark: any) =>
        (schoolMark.class === this.classListSelect) &&
        (schoolMark.schoolYear === this.yearListSelect) &&
        (schoolMark.school === this.schoolListSelect) &&
        (schoolMark.sequence === this.sequenceListSelect) &&
        (schoolMark.noteType === this.noteTypeListSelect) &&
        (schoolMark.subject['@id'] === this.subjectListSelect)
    );
    console.log(this.schoolMarksFiltered);
    this.dataSource = new MatTableDataSource(this.schoolMarksFiltered);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = function(schoolMark: any, filter: string) {
      return schoolMark.student.student.name.toString().toLowerCase().includes(filter) || schoolMark.student.student.matricule.toString().toLowerCase().includes(filter);
    };

    this.isLoading = false;

    /*this.dataSource.filterPredicate = function (data: SchoolMark,filter:string) {
      //schoolMark.class['@id']  === this.schoolClassListSelect };
      let data1 = data.class === 'api/school_classes/11';
      console.log(data1);
      return false;
    }*/
  }

}
