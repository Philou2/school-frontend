import {Component, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {SchoolYearService} from '../../../../../schooling/services/configuration/school-year.service';
import {SchoolService} from '../../../../../schooling/services/configuration/school.service';
import {ClassProgramService} from '../../../../../study/services/class-program.service';
import {SequenceService} from '../../../../services/configuration/sequence.service';
import {SchoolClassService} from '../../../../../schooling/services/configuration/school-class.service';
import {SchoolMarkService} from '../../../../services/configuration/school-mark.service';
import {ClassProgram} from '../../../../../study/interface/class-program';
import {SchoolMark} from '../../../../interface/configuration/school-mark';
import {School} from '../../../../../schooling/interface/configuration/School';
import {SubjectService} from '../../../../../study/services/subject.service';
import {NoteTypeService} from '../../../../services/configuration/note-type.service';
import {StudRegistrationService} from '../../../../../schooling/services/registration/stud-registration.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-school-mark-anonymity',
  templateUrl: './school-mark-anonymity.component.html',
  styleUrls: ['./school-mark-anonymity.component.scss']
})
export class SchoolMarkAnonymityComponent {

  get fc() {
    return this.markFormGroup.controls;
  }

  get aifc() {
    return this.assignmentInformationFormGroup.controls;
  }

  // @ts-ignore
  constructor(
    private toastr: ToastrService,
    private translateService: TranslateService,
    private yearService: SchoolYearService,
    private schoolService: SchoolService,
    private sequenceService: SequenceService,
    // private _institutionService: InstitutionService,
    private schoolClassService: SchoolClassService,
    private subjectService: SubjectService,
    private noteTypeService: NoteTypeService,
    private classProgramService: ClassProgramService,
    private schoolMarkService: SchoolMarkService,
    private studregistrationService: StudRegistrationService,
    private formBuilder: FormBuilder
    // , private _schoolBaseService: SchoolBaseService
  ) {
    this.assignmentInformationFormGroup = this.formBuilder.group({
      base: [null, [Validators.required, Validators.min(1), Validators.max(2147483647)]],
      assignmentDate: [null, [Validators.required]],
      description: [null]
    });
    this.aifc.base.valueChanges.subscribe({
      next: (value: any) => {
        console.log(this.markFormGroup?.errors);
      }
    });
  }
  selectedIds: number[] = [];
  isLoading = true;
  isButtonVisible = false;
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  sequenceListSelect!: any;    // (Propriétés/ attributs)Pour la selection par defaut et meme la transition d'une sequence en une autre.
  schoolClassListSelect!: any;
  subjectListSelect!: any;
  noteTypeListSelect!: any;

  assignmentInformationFormGroup!: FormGroup;
  markFormGroup!: FormGroup;

  displayedColumns: string[] = [
    'studentName',
    'mark'
  ];
  dataSource!: MatTableDataSource<SchoolMark>;

  schoolMarks!: SchoolMark[];
  schoolMarksFiltered!: SchoolMark[];
  subjectListFiltered!: any[];

  base = 20;

  isSubmitted = false;
  saving = false;

  formats = [{code: 'A'}, {code: 'N'}, {code: 'C'}, ];
  lengths = [{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}];

  formatSelected = 'A';
  lengthSelected = 1;

  crushTheOldAnonymity = false;

  formatsSelected: string[] = ['A', 'A', 'A', 'A', 'A'];
  lengthsSelected: number[] = [1, 1, 1, 1, 1];

  // 48 - 57 => 0 - 10
  // 65 - 90 => A - Z
  charRangeCodes: any = {A: {min: 65, max: 90}, N: {min: 48, max: 57}};
  constantsChar: string[] = ['', '', '', '', ''];

  example: string = this.generateAnonymity();

  formatNumberPossibilities: any = {A: 26, N: 10, C: 1};

  /** For the checked */
  isVisuallyChecked = false;

  yearList: any[] = [];
  yearListSelect: string | undefined;

  /** Function getSequenceList() to the function getSchoolClassList() */
  sequenceList!: any[];
  sequenceListFiltered!: any[];

  public schoolList!: School[];
  public schoolListSelect!: string | undefined;

  /** Function getSchoolClassList() to the function getSubjectList() */
  schoolClassList!: any[];
  schoolClassListFiltered!: any[];

  public classPrograms!: ClassProgram[];
  public classProgramsFiltered!: ClassProgram[];
  subjectList!: any[];

  /** Function getNoteTypeList() to the function getSchoolMarkList() */
  noteTypeList!: any[];
  noteTypeListLength = 0;

  makeExample() {
    this.example = this.generateAnonymity();
  }

  randomIntFromInterval(min: number, max: number) {
   return  Math.floor(Math.random() * (max - min + 1) + min);
  }
  generateRandomChar(number: number): string {
    let char = '';
    for (let i = 0; i < number; i++) {
      const randomChoice = this.randomIntFromInterval(0, 1);
      const format = randomChoice === 0 ? 'A' : 'N';
      char += this.generateChar(format);
    }
    return char;
  }

  generateConstantChar(number: number, index: number): string {
    if (this.constantsChar[index].length !== number) {
      const randomChar = this.generateRandomChar(number);
      this.constantsChar[index] = randomChar;
      return randomChar;
    }
    return this.constantsChar[index];
  }

  generateChar(format: string, number: number = 1): string {
    /*if (format === 'C') {
      let randomChoice = this.randomIntFromInterval(0,1)
      format = randomChoice === 0 ? 'A':'N'
    }*/
    const min: number = this.charRangeCodes[format].min, max: number = this.charRangeCodes[format].max;
    let char = '';
    for (let i = 0; i < number; i++) {
      const randomChar = String.fromCharCode(this.randomIntFromInterval(min, max));
      char += randomChar;
    }
    return char;
  }

  generateAnonymity(): string {
    let anonymityCode = '';
    this.formatsSelected.forEach((format: string, index: number) => {
      const number = this.lengthsSelected[index];
      const char = format === 'C' ? this.generateConstantChar(number, index) : this.generateChar(format, number);
      anonymityCode += char;
    });
    return anonymityCode;
  }

  getIdFromApiResourceId(apiId: string): string {
    const lastIndexOf = apiId.lastIndexOf('/');
    const id = apiId.substring(lastIndexOf + 1);
    return id;
  }

  reset() {
    Swal.fire(
      {
        title: this.translate('are_you_sure'), // Are you sure ?
        // text: this.translate("you_wont_be_able_to_revert_this"), // You won't be able to revert this!
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.translate('yes_reinitialize') // 'Yes, delete it!'
      }
    ).then((result) => {
      if (result.isConfirmed) {
        const lowerSpacedSchoolMark = this.translate('schoolMark').toLowerCase();
        const schoolMarkIds = this.schoolMarks.filter(
            (schoolMark: any) => this.schoolMarkPredicate(schoolMark) &&
                this.subjectListSelect === schoolMark.subject['@id']
        ).map( (schoolMark: SchoolMark) => schoolMark.id);
        console.log(JSON.stringify({schoolMarkIds}));
        this.schoolMarkService.reset(schoolMarkIds).subscribe({
          next: (res: any) => {
            Swal.fire(
              this.translate('reinitialized'), // Deleted !
              `${this.translate('anonymity_has_been_reinitialized')}`,  // Your general account range has been deleted.
              'success'
            );
            this.getMarkList(true);
          },
          error: (res: any) => {
            Swal.fire(
              this.translate('not_reinitialized'), // Deleted !
              `${this.translate('anonymity_has_not_been_reinitialized')}`,  // Your general account range has been deleted.
              'error'
            );
          }
        });
      }
    });
  }

  generateAnonymityArray(number: number): string[] {
    const anonymities: string[] = [];
    let anonymity = this.generateAnonymity();
    while (anonymities.length < number) {
      while (anonymities.includes(anonymity)) {
        anonymity = this.generateAnonymity();
      }
      anonymities.push(anonymity);
    }
    return anonymities;
  }


  generateAnonymityObject(schoolMarksBySubject: any[][]): object {
    let anonymityObject = {};
    console.log(schoolMarksBySubject);
    /*schoolMarksBySubject.flatMap(
        (schoolMarks:any[],schoolMarks)
    )*/
    schoolMarksBySubject.forEach((schoolMarks: any[]) => {
      let anonymityBySubjectObject = {};
      const schoolMarksDistincted = schoolMarks.filter(this.schoolMarkStudentPredicate);
      const anonymities: string[] = this.generateAnonymityArray( schoolMarksDistincted.length);
      console.log(schoolMarks);
      console.log(schoolMarksDistincted);
      schoolMarks.forEach((schoolMark: any, index: number) => {
        anonymityBySubjectObject = { ...anonymityBySubjectObject, [schoolMark.id]: anonymities[ schoolMarksDistincted.findIndex(
            (schoolMarkDistinct: any) => schoolMarkDistinct.student['@id'] === schoolMark.student['@id'] )] };
      });
      anonymityObject = { ...anonymityObject, ...anonymityBySubjectObject };
    });
    return anonymityObject;
  }

  getNumberOfPossibilities() {
    let numberOfPossibilities = 1;
    this.formatsSelected.forEach((format: string, index: number) =>
      numberOfPossibilities *= Math.pow(this.formatNumberPossibilities[format], this.lengthsSelected[index]));
    return numberOfPossibilities;
  }

  schoolMarkPredicate = (schoolMark: any) => schoolMark.schoolYear === this.yearListSelect &&
      schoolMark.school === this.schoolListSelect &&
      schoolMark.class === this.schoolClassListSelect &&
      schoolMark.sequence === this.sequenceListSelect
  noteTypeDistinctFilterPredicate = (schoolMark: any, index: number, schoolMarks: any[]) => schoolMarks.findIndex( (schoolMark1: any) => schoolMark1.noteType === schoolMark.noteType ) === index;
  schoolMarkStudentPredicate = (schoolMark: any, index: number, schoolMarks: any[]) =>
      schoolMarks.findIndex((schoolMark1: any) => schoolMark.student['@id'] === schoolMark1.student['@id']) === index

  generateCurrentSubjectAnonymity(currentSubject: boolean = true) {
    Swal.fire(
      {
        title: this.translate('are_you_sure'), // Are you sure ?
        // text: this.translate("you_wont_be_able_to_revert_this"), // You won't be able to revert this!
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.translate(`yes_generate_for_the_${currentSubject ? 'subject' : 'class'}`) // 'Yes, delete it!'
      }
    ).then((result) => {
      if (result.isConfirmed) {
        let isPossible = true;
        const numberOfAnonymity = this.getNumberOfPossibilities() * (currentSubject ? 1 : this.subjectListFiltered.length);

        const schoolMarksBySubject = currentSubject ? [this.schoolMarks.filter((schoolMark: any) => {
          return this.schoolMarkPredicate(schoolMark) && schoolMark.subject['@id'] === this.subjectListSelect && (this.crushTheOldAnonymity || !schoolMark.anonymityCode!);
        })] : this.subjectListFiltered.map((subject: any) =>
            this.schoolMarks.filter((schoolMark: any) => {

              return this.schoolMarkPredicate(schoolMark) &&
                      schoolMark.subject['@id'] === subject['@id'] &&
                      (this.crushTheOldAnonymity || !schoolMark.anonymityCode!);
                }
            ));
        const lengths =
         schoolMarksBySubject.map((schoolMarks: SchoolMark[]) => {
           return schoolMarks.filter(this.schoolMarkStudentPredicate).length;
         })
        ;
        console.log(numberOfAnonymity, lengths);
        const isPossibleCondition1 = lengths.every(length => numberOfAnonymity > length );
        isPossible = isPossibleCondition1 && lengths.reduce( (length1: number, length2: number) => length1 + length2, 0) > 0;

        if (!isPossible) {
          Swal.fire(
            this.translate('impossible'), // Deleted !
            `${this.translate(`impossibleAnonymityGeneration${!isPossibleCondition1 ? 'Possibilities' : 'NoAnonymity'}`)}`,  // Your general account range has been deleted.
            'error'
          );
        } else {
          const lowerSpacedSchoolMark = this.translate('schoolMark').toLowerCase();
          const schoolClassId = this.getIdFromApiResourceId(this.schoolClassListSelect);
          const subjectId = currentSubject ? this.getIdFromApiResourceId(this.subjectListSelect) : null;
          const anonymityObject = this.generateAnonymityObject(schoolMarksBySubject);
          console.log(JSON.stringify({anonymityObject}));
          this.schoolMarkService.generateCurrentSubjectAnonymity(anonymityObject).subscribe({
            next: (res: any) => {
              Swal.fire(
                this.translate('generated'), // Deleted !
                `${this.translate('anonymity_has_been_generated')}`,  // Your general account range has been deleted.
                'success'
              );
              this.getMarkList(true);
            },
            error: (res: any) => {
              Swal.fire(
                this.translate('generated'), // Deleted !
                `${this.translate('anonymity_has_not_been_generated')}`,  // Your general account range has been deleted.
                'error'
              );
            }
          });
        }
      }
    });
  }


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

  getSchoolClassList(): void {
    this.schoolClassService.getCollection().subscribe(
      {
        next: (res: any) => {
          this.schoolClassList = res['hydra:member'];
          // this.schoolClassListSelect = this.schoolClassList.length !== 0 ? this.schoolClassList[0]['@id'] : undefined
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
        // this.subjectList = this.classPrograms.map((classProgram: any) => classProgram.subject)
      },
      complete: () => this.getNoteTypeList(),
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.log('Error while fetching the records');
        this.isLoading = false;
      }
    });
  }

  getNoteTypeList(): void {
    this.noteTypeService.getNoteTypeList().subscribe(
      {
        next: (res: any) => {
          this.noteTypeList = res['hydra:member'];
          this.noteTypeListSelect = this.noteTypeList.length !== 0 ? this.noteTypeList[0]['@id'] : undefined;
          this.noteTypeListLength = this.noteTypeList.length;
          console.log(res);
        },
        complete: () => this.getMarkList(true),
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
  getMarkList(hasChanged: boolean = false) {
    this.isLoading = true;
    this.schoolMarkService.getMarkList().subscribe({
      next: (res: any) => {
        this.schoolMarks = res['hydra:member'];
        this.schoolMarks.forEach((schoolMark: any) => {
          schoolMark.studentName = schoolMark.student.student.name;
        });
        console.log(this.schoolMarks);
        this.filter(hasChanged);
      },
      error: this.errorWhileFetchingTheRecords
    });
  }

  filter(hasChanged: boolean = false, isYear: boolean = false) {
    // console.log("Bonjour ! " + this.schoolClassListSelect);

    // this.sequenceListFiltered = this.sequenceList.filter( (sequence: any) => ( sequence.institution['@id'] === this.institutionListSelect ) && ( sequence.year['@id'] === this.schoolYearListSelect ) )

    // this.schoolClassListFiltered = this.schoolClassList.filter( (schoolClass: any) => ( ( schoolClass.institution === this.institutionListSelect ) && ( schoolClass.year['@id'] === this.schoolYearListSelect ) ) )
    // if( this.schoolClassListFiltered.length > 1 ) this.schoolClassListFiltered = [ { code: this.translate('all_f') , '@id' : 'undefined' }, ...this.schoolClassList ]


    // this.schoolClassListSelect = this.schoolClassListFiltered.length !== 0 ?  (isClass ? this.schoolClassListSelect : this.schoolClassListFiltered[0]['@id'] ) : undefined

    // this.sequenceListFiltered = this.sequenceList.filter( (schoolYear: any) => schoolYear.institution === this.institutionListSelect )
    // this.schoolYearListSelect = this.schoolYearListFiltered.length !== 0 ? this.schoolYearListFiltered[0]['@id'] : undefined
    if (hasChanged) {
      if (isYear) {
        this.sequenceListFiltered = this.sequenceList.filter((sequence: any) => (sequence.year['@id'] === this.yearListSelect));
        this.schoolClassListFiltered = this.schoolClassList.filter((schoolClass: any) => schoolClass.year['@id'] === this.yearListSelect);
        this.schoolClassListSelect = undefined;
        this.sequenceListSelect = undefined;
      }
      this.subjectListSelect = undefined;
    }
    this.schoolMarksFiltered = this.schoolMarks.filter(
      (schoolMark: any) =>
        (schoolMark.class === this.schoolClassListSelect) &&
        (schoolMark.sequence === this.sequenceListSelect) &&
        (schoolMark.subject['@id'] === this.subjectListSelect) &&
        (schoolMark.noteType === this.noteTypeListSelect) &&
        schoolMark.schoolYear === this.yearListSelect
    );

    this.classProgramsFiltered = this.classPrograms.filter(
      (classProgram: any) =>
        classProgram.class['@id'] === this.schoolClassListSelect &&
        classProgram.year['@id'] === this.yearListSelect
        && classProgram.school['@id'] === this.schoolListSelect
    );
    this.subjectListFiltered = this.classProgramsFiltered.map((classProgram: any) => classProgram.subject);

    this.dataSource = new MatTableDataSource(this.schoolMarksFiltered);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;


    this.isLoading = false;

    /*this.dataSource.filterPredicate = function (data: SchoolMark,filter:string) {
      //schoolMark.class['@id']  === this.schoolClassListSelect };
      let data1 = data.class === 'api/school_classes/11';
      console.log(data1);
      return false;
    }*/
  }

}
