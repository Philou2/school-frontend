import {Component, Input, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {SchoolYearService} from '../../../../../../schooling/services/configuration/school-year.service';
import {SequenceService} from '../../../../../services/configuration/sequence.service';
import {SchoolService} from '../../../../../../schooling/services/configuration/school.service';
import {SchoolClassService} from '../../../../../../schooling/services/configuration/school-class.service';
import {ClassProgramService} from '../../../../../../study/services/class-program.service';
import {SubjectService} from '../../../../../../study/services/subject.service';
import {NoteTypeService} from '../../../../../services/configuration/note-type.service';
import {SchoolMarkService} from '../../../../../services/configuration/school-mark.service';
import {StudRegistrationService} from '../../../../../../schooling/services/registration/stud-registration.service';
import {SchoolMark} from '../../../../../interface/configuration/school-mark';
import {School} from '../../../../../../schooling/interface/configuration/School';
import {ClassProgram} from '../../../../../../study/interface/class-program';

@Component({
  selector: 'app-school-mark-entry',
  templateUrl: './school-mark-entry.component.html',
  styleUrls: ['./school-mark-entry.component.scss']
})
export class SchoolMarkEntryComponent {
  get fc(){
    return this.markFormGroup.controls;
  }
  get aifc(){
    return this.assignmentInformationFormGroup.controls;
  }
  // @ts-ignore
  constructor(
    private toastr: ToastrService,
    private translateService: TranslateService,
    private yearService: SchoolYearService,

    private sequenceService: SequenceService,
    // private _institutionService: InstitutionService,
    private schoolService: SchoolService,
    private schoolClassService: SchoolClassService,
    private classProgramService: ClassProgramService,
    private subjectService: SubjectService,
    private noteTypeService: NoteTypeService,
    private schoolMarkService: SchoolMarkService,
    private studRegistrationService: StudRegistrationService,
    private formBuilder: FormBuilder
    // , private _schoolBaseService: SchoolBaseService
  ) {
    this.assignmentInformationFormGroup = this.formBuilder.group({
      base : [null, [Validators.required, Validators.min(1), Validators.max(	2147483647)]],
      assignmentDate: [null, [Validators.required]],
      description: [null]
    });
    this.aifc.base.valueChanges.subscribe({
      next: (value: any) => {
        console.log(this.markFormGroup?.errors);
      }
    });
  }

  @Input()
  property!: string;

  propertiesTitles = {
    'studentName' : 'General',
    'name' : 'By Name',
    'matricule' : 'By Matricule',
    'anonymityCode' : 'By Anonymity'
  }
  title!: string
  activeItem!: string
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
    // 'anonymityCode',
    // 'matricule',
    // 'name',
    // 'studentName',
    // 'mark'
  ];
  dataSource!: MatTableDataSource<SchoolMark>;

  schoolMarks!: SchoolMark[];
  schoolMarksFiltered!: SchoolMark[];
  subjectListFiltered!: any[];

  base = 20;
  isSubmitted = false;
  isOpen = true;
  saving = false;

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


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // tslint:disable-next-line:typedef
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  // tslint:disable-next-line:typedef
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

  ngAfterViewInit() {
    this.displayedColumns = [ this.property , 'mark'];
    let propertiesTitle = this.propertiesTitles[this.property];
    this.title = 'School Mark Entry '+ propertiesTitle
     this.activeItem = 'School mark entry '+propertiesTitle.toString().toLowerCase()
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
  getMarkList(hasChanged: boolean = false) {
    this.schoolMarkService.getMarkList().subscribe({
      next: (res: any) => {
        this.schoolMarks = res['hydra:member'];
        this.schoolMarks.forEach((schoolMark: any) => {
          schoolMark.name = schoolMark.student.student.name;
          schoolMark.matricule = schoolMark.student.student.matricule;
          schoolMark.studentName = `${schoolMark.name} ${schoolMark.matricule}`;
        });
        console.log(this.schoolMarks);
        this.filter(hasChanged);
      },
      error: this.errorWhileFetchingTheRecords
    });
  }

  filter(hasChanged: boolean = false, isYear: boolean = false, isClass: boolean = false) {
    // console.log("Bonjour ! " + this.schoolClassListSelect);


    // this.schoolClassListFiltered = this.schoolClassList.filter( (schoolClass: any) => ( ( schoolClass.institution === this.institutionListSelect ) && ( schoolClass.year['@id'] === this.schoolYearListSelect ) ) )
    // if( this.schoolClassListFiltered.length > 1 ) this.schoolClassListFiltered = [ { code: this.translate('all_f') , '@id' : 'undefined' }, ...this.schoolClassList ]


    // this.schoolClassListSelect = this.schoolClassListFiltered.length !== 0 ?  (isClass ? this.schoolClassListSelect : this.schoolClassListFiltered[0]['@id'] ) : undefined

    // this.sequenceListFiltered = this.sequenceList.filter( (schoolYear: any) => schoolYear.institution === this.institutionListSelect )
    // this.schoolYearListSelect = this.schoolYearListFiltered.length !== 0 ? this.schoolYearListFiltered[0]['@id'] : undefined

    if (hasChanged){
      if (isYear){
        this.sequenceListFiltered = this.sequenceList.filter( (sequence: any) => (  sequence.year['@id'] === this.yearListSelect));
        this.schoolClassListFiltered = this.schoolClassList.filter( (schoolClass: any) =>  schoolClass.year['@id'] === this.yearListSelect  );
        this.sequenceListSelect = undefined;
        this.schoolClassListSelect = undefined;
        this.subjectListSelect = undefined;
      }
      if (isClass){
        this.subjectListSelect = undefined;
      }
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
    this.subjectListFiltered = this.classProgramsFiltered.map( (classProgram: any) => classProgram.subject);

    const schoolMark: any = this.schoolMarksFiltered.length !== 0 ? this.schoolMarksFiltered[0] : undefined;
    console.log(this.schoolMarksFiltered);
    this.isOpen = schoolMark ? schoolMark.isOpen : true;
    this.base = schoolMark && this.isOpen ? schoolMark.base : null;
    const assignmentDate = schoolMark && this.isOpen ? schoolMark.assignmentDate : null;
    const description = schoolMark?.description && this.isOpen  ? schoolMark.description : null;
    if (this.isOpen) {
      this.aifc.base.setValue(this.base);
      this.aifc.assignmentDate.setValue(assignmentDate);
      this.aifc.description.setValue(description);
      let markFormGroupControls = {};
      this.schoolMarksFiltered.forEach((schoolMark: any) => {
        markFormGroupControls = {
          ...markFormGroupControls,
          [schoolMark.id]: [schoolMark.mark, [Validators.required, Validators.min(0)]]
        };
      });
      console.log(markFormGroupControls);
      this.markFormGroup = this.formBuilder.group(markFormGroupControls);
      /*this.markFormGroup.valueChanges.subscribe({
        next: (value: any) => console.log(this.markFormGroup?.errors)
      })*/
    }
    else {
      this.aifc.base.setValue(this.base);
      this.aifc.assignmentDate.setValue( assignmentDate);
      this.aifc.description.setValue(description);
      this.markFormGroup = this.formBuilder.group({});
    }

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

  onFormSubmit(){
    this.isSubmitted = true;
    if (this.markFormGroup.valid && this.assignmentInformationFormGroup.valid) {
      this.saving = true;
      const assignmentInformationFormGroupValue = this.assignmentInformationFormGroup.value;
      const markFormGroupValue = this.markFormGroup.value;

      const base = assignmentInformationFormGroupValue.base;
      const assignmentDate = assignmentInformationFormGroupValue.assignmentDate;
      const assignmentDescription = assignmentInformationFormGroupValue.description === '' ? null : assignmentInformationFormGroupValue.description;
      console.log(assignmentInformationFormGroupValue, markFormGroupValue);

      const urlData = `${base}/${assignmentDate}/${assignmentDescription}/${JSON.stringify(markFormGroupValue)}`;
      /*      Object.keys(markFormGroupValue).forEach( (id:any,index:number,markFormGroupValueKeys: string[])=> urlData += `/${id}-${markFormGroupValueKeys[id]}`)
            console.log(urlData)*/
      this.schoolMarkService.editMark(urlData).subscribe({
        next: (val: any) => {
          this.toastr.success(this.translate('successUpdateMessage'), this.translate('success'));
          this.isLoading = true;
          this.getMarkList();
        },
        complete: () => {
          this.saving = false;
          this.isSubmitted = false;
        },
        error: (err: any) =>
        {
          const errors: any[] = err.error.violations;

          /*errors.forEach((v) =>
          {
            if (v.propertyPath === this.bankForm.get('name')){
              this.bankForm.get('name')?.setErrors({serverError: v.message})
            }
            this.saving = false;

          })*/
        }
      });

    }
    else {
      console.log('invalid');
    }
  }

}
