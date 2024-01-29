import {Component, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {SchoolYearService} from '../../../../../../../schooling/services/configuration/school-year.service';
import {SequenceService} from '../../../../../../services/configuration/sequence.service';
import {NoteTypeService} from '../../../../../../services/configuration/note-type.service';
import {SchoolMarkService} from '../../../../../../services/configuration/school-mark.service';
import {FormBuilder} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SchoolMark} from '../../../../../../interface/configuration/school-mark';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-school-mark-viewing-notes-student',
  templateUrl: './school-mark-viewing-notes-student.component.html',
  styleUrls: ['./school-mark-viewing-notes-student.component.scss']
})
export class SchoolMarkViewingNotesStudentComponent {
// @ts-ignore
  constructor(
      private toastr: ToastrService,
      private translateService: TranslateService,
      private yearService: SchoolYearService,
      private sequenceService: SequenceService,

      private noteTypeService: NoteTypeService,
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
    'subject',
    // 'general',
    'mark'
  ];
  dataSource!: MatTableDataSource<SchoolMark>;

  schoolMarks!: SchoolMark[];
  schoolMarksFiltered!: SchoolMark[];

  base = 20;
  studentMatricule = 'IUC23E00470730';

  isSubmitted = false;
  saving = false;

  /** For the checked */
  isVisuallyChecked = false;

  yearList: any[] = [];
  yearListSelect: string | undefined;


  /** Function getSequenceList() to the function getSchoolClassList() */
  sequenceList!: any[];
  sequenceListFiltered!: any[];

  /** Function getNoteTypeList() to the function getSchoolMarkList() */
  noteTypeList!: any[];


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
  selectionToggle( row: any ) {
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
        () => this.getSequenceList()
    );
  }
  getSequenceList(): void{
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
  getNoteTypeList(): void{
    this.noteTypeService.getNoteTypeList().subscribe(
        {
          next: (res: any) => {
            this.noteTypeList = res['hydra:member'];
            // this.noteTypeListSelect = this.noteTypeList.length !== 0 ? this.noteTypeList[0]['@id'] : undefined
            console.log(res);
          },
          complete: () => this.getMarkList(),
          error: this.errorWhileFetchingTheRecords
        }
    );
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
    this.schoolMarkService.getMarkList(this.studentMatricule).subscribe({
      next: (res: any) => {
        this.schoolMarks = res['hydra:member'];
        console.log(this.schoolMarks);
        this.filter(true);
      },
      error: this.errorWhileFetchingTheRecords
    });
  }

  filter(isYear: boolean = false) {
    // console.log("Bonjour ! " + this.schoolClassListSelect);

    if (isYear){
      this.sequenceListFiltered = this.sequenceList.filter( (sequence: any) => ( sequence.year['@id'] === this.yearListSelect ) );
      this.sequenceListSelect = undefined;
      this.noteTypeListSelect = undefined;
      // this.subjectListSelect = this.subjectListFiltered.length !== 0 ? this.subjectListFiltered[0]['@id'] : undefined
    }

    // this.schoolClassListFiltered = this.schoolClassList.filter( (schoolClass: any) => ( ( schoolClass.institution === this.institutionListSelect ) && ( schoolClass.year['@id'] === this.schoolYearListSelect ) ) )
    // if( this.schoolClassListFiltered.length > 1 ) this.schoolClassListFiltered = [ { code: this.translate('all_f') , '@id' : 'undefined' }, ...this.schoolClassList ]


    // this.schoolClassListSelect = this.schoolClassListFiltered.length !== 0 ?  (isClass ? this.schoolClassListSelect : this.schoolClassListFiltered[0]['@id'] ) : undefined

    // this.sequenceListFiltered = this.sequenceList.filter( (schoolYear: any) => schoolYear.institution === this.institutionListSelect )
    // this.schoolYearListSelect = this.schoolYearListFiltered.length !== 0 ? this.schoolYearListFiltered[0]['@id'] : undefined

    this.schoolMarksFiltered = this.schoolMarks.filter(
        (schoolMark: any) =>
            (schoolMark.schoolYear === this.yearListSelect) &&
            (schoolMark.sequence === this.sequenceListSelect) &&
            (schoolMark.noteType === this.noteTypeListSelect)
    );
    console.log(this.schoolMarksFiltered);
    this.dataSource = new MatTableDataSource(this.schoolMarksFiltered);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = function(schoolMark: any, filter: string){
      return schoolMark.subject.name.toString().toLowerCase().includes(filter) || schoolMark.student.student.matricule.toString().toLowerCase().includes(filter);
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
