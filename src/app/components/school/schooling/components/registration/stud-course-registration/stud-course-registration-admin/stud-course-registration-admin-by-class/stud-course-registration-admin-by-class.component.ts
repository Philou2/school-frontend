import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpErrorResponse} from '@angular/common/http';
import {StudCourseRegistrationService} from '../../../../../services/registration/stud-course-registration.service';
import {SchoolYearService} from '../../../../../services/configuration/school-year.service';
import {SchoolService} from '../../../../../services/configuration/school.service';
import {ClassProgramService} from '../../../../../../study/services/class-program.service';
import {StudRegistrationService} from '../../../../../services/registration/stud-registration.service';
import {SchoolClassService} from '../../../../../services/configuration/school-class.service';
import {ClassProgram} from '../../../../../../study/interface/class-program';
import {School} from '../../../../../interface/configuration/School';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-stud-course-registration-admin-by-class',
  templateUrl: './stud-course-registration-admin-by-class.component.html',
  styleUrls: ['./stud-course-registration-admin-by-class.component.scss']
})
export class StudCourseRegistrationAdminByClassComponent {

  constructor(
    private studCourseRegistrationService: StudCourseRegistrationService,
    private yearService: SchoolYearService,
    private schoolService: SchoolService,
    private studregistrationService: StudRegistrationService,
    private classProgramService: ClassProgramService,
    private classService: SchoolClassService,
    private toastr: ToastrService
  ) {
  }
  displayedColumnsRegistered: string[] = [
    'subject',
    'type',
    'select'
    // 'year',
    // 'class'
    // 'classProgram',
    // 'StudRegistration'
  ];

  displayedColumnsOptional: string[] = [
    'subject',
    'select'
    // 'type'
    // 'year',
    // 'class'
    // 'classProgram',
    // 'StudRegistration'
  ];

  selectedIds: number[] = [];
  yearList: any[] = [];
  yearListSelect: string | undefined;

  schoolClass: any = {};

  public isButtonVisible = false;

  classList: any[] = [];
  classListSelect: string | undefined;

  public studCourseRegistrations!: any[];
  public studCourseRegistrationsFiltered!: any[];
  public studCourseMultipleRegistrations!: any[] | undefined;


  public classPrograms!: ClassProgram[];
  public classProgramsFiltered!: ClassProgram[];

  public classMultiplePrograms!: ClassProgram[][] | undefined;
  public classMultipleProgramsFiltered!: ClassProgram[];
  public classMultipleProgramsRegistered!: ClassProgram[];
  public classMultipleProgramsOptional!: ClassProgram[];

  dataSourceOptional!: MatTableDataSource<any>;
  selectionOptional = new SelectionModel<any>(true, []);

  @ViewChild('paginatorOptional') paginatorOptional!: MatPaginator;
  @ViewChild(MatSort) sortOptional!: MatSort;

  dataSourceRegistered!: MatTableDataSource<ClassProgram>;
  selectionRegistered = new SelectionModel<any>(true, []);

  @ViewChild('paginatorRegistered') paginatorRegistered!: MatPaginator;
  @ViewChild(MatSort) sortRegistered!: MatSort;

  isLoading = true;
  isOpen = true;

  public schoolList!: School[];
  public schoolListSelect!: string | undefined;

  public studregistrationList!: any[];
  public studregistrationListFiltered!: any[];
  public studregistrationListSelect!: any[] | undefined;

  ngOnInit() {
    this.getSchoolYearList();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selectionOptional.selected.length;
    const numRows = this.dataSourceOptional.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selectionOptional. */
  masterToggle() {
    this.isAllSelected() ?
      this.selectionOptional.clear() :
      this.dataSourceOptional.data.forEach(row =>
        this.selectionOptional.select(row));
  }

  getSchoolYearList() {
    this.yearService.getListStudCourseReg().subscribe((data: any) => {
        this.yearList = data['hydra:member'];
        this.yearList = this.yearList.map((v) => {
          v.id = v['@id'];
          return v;
        });
        this.yearListSelect = this.yearList.at(0)?.['@id'];
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
        this.schoolListSelect = this.schoolList[0]['@id'];
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
        this.classListSelect = this.classList.at(0)?.['@id'];
      },
      error => console.log(error),
      () => this.getStudregistrationList()
    );
  }

  getStudregistrationList() {
    this.studregistrationService.getListStudCourseReg().subscribe({
      next: (res: any) => {
        console.log(res['hydra:member']);
        // console.log(this.studregistrations);

        this.studregistrationList = res['hydra:member'];
      },
      complete: () => this.getClassProgramList(),
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.log('Error while fetching the records');
        this.isLoading = false;
      }
    });
  }

  getClassProgramList() {
    this.isLoading = true;
    this.classProgramService.getListStudCourseReg().subscribe({
      next: (res: any) => {
        this.classPrograms = res['hydra:member'];
        // this.classProgramsFiltered = this.classPrograms.slice()
        console.log(this.classPrograms);
      },
      complete: () => this.getList(),
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.log('Error while fetching the records');
        this.isLoading = false;
      }
    });
  }

  getList(filter: boolean = true) {
    this.studCourseRegistrationService.getList().subscribe({
      next: (res: any) => {
        this.studCourseRegistrations = res['hydra:member'];
        this.studCourseRegistrations.forEach(
          (studCourseRegistration: any) => studCourseRegistration.subjectName = studCourseRegistration.subject.name
        );
        console.log(this.studCourseRegistrations);
        if (filter) {
          this.filter();
        }
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.log('Error while fetching the records');
        this.isLoading = false;
      }
    });
  }

  changeStudent() {
    const studregistrationList = this.studregistrationListFiltered.slice(2);
    if (this.studregistrationListSelect?.includes('all')) {
      this.studregistrationListSelect = studregistrationList.map((studregistration: any) => studregistration['@id']);
    }
    else if (this.studregistrationListSelect?.includes('clear')){
      this.studregistrationListSelect = [];
    }
    this.filter(true);
  }

  filter(isStudent: boolean = false) {
    if (!isStudent) {
      this.studregistrationListFiltered = this.studregistrationList.filter(
        (studregistration: any) =>
          studregistration.currentyear['@id'] === this.yearListSelect &&
          studregistration.currentclasse['@id'] === this.classListSelect
          && studregistration.school === this.schoolListSelect
      );
      if (this.studregistrationListFiltered.length > 1) { this.studregistrationListFiltered = [{
        '@id': 'all',
        student: {name: 'All'}
      }, {
        '@id': 'clear',
        student: {name: 'Clear'}
      }, ...this.studregistrationListFiltered];
      }
      this.studregistrationListSelect = undefined;
    }

    this.classProgramsFiltered = this.classPrograms.filter(
      (classProgram: any) =>
        classProgram.year['@id'] === this.yearListSelect &&
        classProgram.class['@id'] === this.classListSelect &&
        classProgram.school['@id'] === this.schoolListSelect
    );

    this.studCourseRegistrationsFiltered = this.studCourseRegistrations.filter(
      (studCourseRegistration: any) =>
        studCourseRegistration.year['@id'] === this.yearListSelect &&
        studCourseRegistration.class['@id'] === this.classListSelect
        && studCourseRegistration.school === this.schoolListSelect
    );
    this.studCourseMultipleRegistrations = this.studregistrationListSelect?.map(
      (studregistration: string) =>
        this.studCourseRegistrationsFiltered.filter(
          (studCourseRegistration: any) =>
            studCourseRegistration.StudRegistration === studregistration
            && studCourseRegistration.isSubjectObligatory
        )
    );
    console.log(this.studCourseRegistrationsFiltered);


    this.classMultiplePrograms = this.studregistrationListSelect?.map(
      (studregistration: string, index: number) =>
        this.classProgramsFiltered.filter(
          (classProgram: any) =>
            this.studCourseMultipleRegistrations?.[index].find(
              (studCourseRegistration: any) => studCourseRegistration.subject['@id'] === classProgram.subject['@id']
            ) === undefined
          // Tout le monde a choisi la matiere facultative la
          // classMultipleProgramsFiltered.every(
          //
          // )
        )
    );
    console.log(this.classMultiplePrograms);

    this.classMultipleProgramsRegistered = !this.studregistrationListSelect || this.studregistrationListSelect.length === 0 ? [] : this.classProgramsFiltered.filter(
      (classProgram: any) =>
        this.studCourseMultipleRegistrations?.every(
          (studCourseMultipleRegistration: any[]) =>
            studCourseMultipleRegistration.find(
              (studCourseRegistration: any) => studCourseRegistration.subject['@id'] === classProgram.subject['@id']
            ) !== undefined
        )
    );


    console.log(this.classMultipleProgramsRegistered);
    // console.log(this.studregistrationMultipleListSelect);
    this.classMultipleProgramsOptional = !this.studregistrationListSelect || this.studregistrationListSelect.length === 0 ? [] : this.classProgramsFiltered.filter(
      (classProgram: any) => this.classMultiplePrograms?.every(
        (classMultipleProgram: any) => classMultipleProgram.find(
          (classStudentProgram: any) => classStudentProgram.subject['@id'] === classProgram.subject['@id']
        )
      )
    );
    console.log(this.classMultipleProgramsOptional);
    // this.classMultiplePrograms =
    /*this.studCourseMultipleRegistrations = this.studCourseRegistrations.filter(
      (studCourseRegistration: any) =>
        studCourseRegistration.year === this.yearMultipleListSelect &&
        studCourseRegistration.class['@id'] === this.classMultipleListSelect
        && studCourseRegistration.school === this.schoolMultipleListSelect &&
        this.studregistrationMultipleListSelect?.includes(studCourseRegistration.StudRegistration['@id'])
        && studCourseRegistration.isSubjectObligatory
    ).filter(
      (studCourseRegistration: any,index:number,studCourseMultipleRegistrations: any[])=>
        studCourseMultipleRegistrations.findIndex(
        (studCourseRegistration1: any)=> studCourseRegistration1.subject['@id'] === studCourseRegistration.subject['@id']
      ) === index
    )*/

    // let classMultipleOptionalPrograms =

    // this.classMultiplePrograms =

    /*this.classPrograms.filter(
      (classProgram: any, index: number) =>
        classProgram.year['@id'] === this.yearListSelect &&
        classProgram.class['@id'] === this.classListSelect &&
        classProgram.school['@id'] === this.schoolListSelect &&
        this.studCourseMultipleRegistrations?.find(
          (studCourseRegistration: any) => studCourseRegistration.subject['@id'] === classProgram.subject['@id']
        ) === undefined
      // Tout le monde a choisi la matiere facultative la
      // classMultipleProgramsFiltered.every(
      //
      // )
    )*/

    this.selectionOptional.clear();
    this.selectionRegistered.clear();
    this.classMultipleProgramsRegistered?.forEach(
      (classProgram: any) => this.selectionRegistered.select(classProgram)
    );

    // this.schoolClassCode = (this.studCourseRegistrationsStudentFiltered)[0]?.class.code
    // this.schoolClass = (this.studCourseRegistrationsFiltered)[0].class

    this.dataSourceOptional = new MatTableDataSource(this.classMultipleProgramsOptional);
    this.dataSourceOptional.sort = this.sortOptional;
    this.dataSourceOptional.paginator = this.paginatorOptional;
    this.dataSourceOptional.filterPredicate = (classProgram: any, filter: string): boolean => classProgram.subject.name.toString().toLowerCase().indexOf(filter) != -1;

    this.dataSourceRegistered = new MatTableDataSource(this.classMultipleProgramsRegistered);
    this.dataSourceRegistered.sort = this.sortRegistered;
    this.dataSourceRegistered.paginator = this.paginatorRegistered;
    this.dataSourceRegistered.filterPredicate = (classProgram: any, filter: string): boolean => classProgram.subject.name.toString().toLowerCase().indexOf(filter) != -1;

  }

  applyFilter(event: Event, optional: boolean = true, multiple: boolean = false) {
    const filterValue = (event.target as HTMLInputElement).value;
    const dataSource = optional ? this.dataSourceOptional : this.dataSourceRegistered;
    dataSource.filter = filterValue.trim().toLowerCase();

    if (dataSource.paginator) {
      dataSource.paginator.firstPage();
    }
  }

  getIdFromApiResourceId(apiResourceId: string | undefined) {
    return apiResourceId ? apiResourceId.substring(apiResourceId.lastIndexOf('/') + 1) : '';
  }

  save() {
    console.log(this.selectionRegistered.selected);
    let yearListSelect, classListSelect, schoolListSelect, studregistrationListSelect: undefined | any[],
      selectionOptional, selectionRegistered: SelectionModel<any>;


    yearListSelect = this.yearListSelect;
    classListSelect = this.classListSelect;
    schoolListSelect = this.schoolListSelect;
    studregistrationListSelect = this.studregistrationListSelect;
    selectionOptional = this.selectionOptional;
    selectionRegistered = this.selectionRegistered;

    const studCourseRegistrationStudents = this.studCourseRegistrationsFiltered.filter(
      (studCourseRegistration: any) =>
        studregistrationListSelect?.includes(studCourseRegistration.StudRegistration['@id'])
    );

    const classMultipleProgramNotSelected = this.classMultipleProgramsRegistered.filter(
      (classProgram: any) =>
        selectionRegistered.selected.find(
          (classProgramSelected: any) => classProgramSelected.id === classProgram.id)
        === undefined
    );
    console.log(selectionOptional.selected);
    const classProgramIds: any[] = [];
    const studCourseRegistrationNotSelectedIds =

      this.studCourseRegistrationsFiltered?.filter(
        (studCourseRegistration: any) =>
          studregistrationListSelect?.includes(studCourseRegistration.StudRegistration['@id'])
          && studCourseRegistration.isSubjectObligatory
          && classMultipleProgramNotSelected.find((classProgram: any) => classProgram.subject['@id'] === studCourseRegistration.subject['@id'])
          !== undefined
      ).map((studCourseRegistration: any) => studCourseRegistration.id);

    selectionOptional.selected.forEach((classProgram: any) => {
        const studCourseRegistration = studCourseRegistrationStudents.find(studCourseRegistration => studCourseRegistration.subject['@id'] === classProgram.subject['@id']);
        studCourseRegistration ? studCourseRegistrationNotSelectedIds?.push(studCourseRegistration.id) : classProgramIds.push(classProgram.id);
      }
    );
    const studCourseRegistrations = {
      classProgramIds,
      studCourseRegistrationIds: studCourseRegistrationNotSelectedIds,
      classId: this.getIdFromApiResourceId(classListSelect),
      yearId: this.getIdFromApiResourceId(yearListSelect),
      schoolId: this.getIdFromApiResourceId(schoolListSelect),
      studregistrationIds: studregistrationListSelect?.map((studregistrationApiId: string) => this.getIdFromApiResourceId(studregistrationApiId))
    };
    console.log(studCourseRegistrationStudents);
    console.log(JSON.stringify(studCourseRegistrations));

    if (studCourseRegistrationNotSelectedIds && classProgramIds.length + studCourseRegistrationNotSelectedIds.length > 0) {
      this.studCourseRegistrationService.chooseCourses(studCourseRegistrations).subscribe({
        next: (value: any) => this.toastr.success('Your courses are been successfully updated', 'success'),
        complete: () => this.getClassProgramList(),
        error: (error: HttpErrorResponse) => {
          this.toastr.error('Your courses are not been updated', 'error');
          this.isLoading = false;
        }
      });
    } else {
      this.toastr.error('Nothing have changed', 'warning');
    }
  }
}
