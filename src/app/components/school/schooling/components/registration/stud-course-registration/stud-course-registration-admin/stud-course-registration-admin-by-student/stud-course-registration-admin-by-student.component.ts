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
import {StudCourseRegistration} from '../../../../../interface/registration/stud-course-registration';
import {School} from '../../../../../interface/configuration/School';
import {StudRegistration} from '../../../../../interface/registration/studRegistration';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-stud-course-registration-admin-by-student',
  templateUrl: './stud-course-registration-admin-by-student.component.html',
  styleUrls: ['./stud-course-registration-admin-by-student.component.scss']
})
export class StudCourseRegistrationAdminByStudentComponent {

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
  public studCourseRegistrationsObligatoryFiltered!: any[];

  public classPrograms!: ClassProgram[];
  public classProgramsFiltered!: ClassProgram[];

  dataSourceOptional!: MatTableDataSource<any>;
  selectionOptional = new SelectionModel<any>(true, []);

  @ViewChild('paginatorOptional') paginatorOptional!: MatPaginator;
  @ViewChild(MatSort) sortOptional!: MatSort;



  dataSourceRegistered!: MatTableDataSource<StudCourseRegistration>;
  selectionRegistered = new SelectionModel<any>(true, []);

  @ViewChild('paginatorRegistered') paginatorRegistered!: MatPaginator;
  @ViewChild(MatSort) sortRegistered!: MatSort;


  isLoading = true;
  isOpen = true;

  public schoolList!: School[];
  public schoolListSelect!: string | undefined;

  public studregistrationList!: StudRegistration[];
  public studregistrationListFiltered!: StudRegistration[];
  public studregistrationListSelect!: string | undefined;

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

  filter(isStudent: boolean = false) {
    if (!isStudent) {
      this.studregistrationListFiltered = this.studregistrationList.filter(
        (studregistration: any) =>
          studregistration.currentyear['@id'] === this.yearListSelect &&
          studregistration.currentclasse['@id'] === this.classListSelect
          && studregistration.school === this.schoolListSelect
      );

      this.studregistrationListSelect = undefined; // this.studregistrationListFiltered[0]?.['@id']
    }

    this.studCourseRegistrationsFiltered = this.studCourseRegistrations.filter(
      (studCourseRegistration: any) =>
        studCourseRegistration.year['@id'] === this.yearListSelect &&
        studCourseRegistration.class['@id'] === this.classListSelect
        && studCourseRegistration.school === this.schoolListSelect &&
        studCourseRegistration.StudRegistration === this.studregistrationListSelect
    );
    this.studCourseRegistrationsObligatoryFiltered = this.studCourseRegistrationsFiltered.filter((studCourseRegistration: any) => studCourseRegistration.isSubjectObligatory).sort( (studCourseRegistration1: any, studCourseRegistration2: any) => !studCourseRegistration1.classProgram.isSubjectObligatory ? -1 : 1 );

    this.classProgramsFiltered = !this.studregistrationListSelect ? [] : this.classPrograms.filter(
      (classProgram: any) =>
        classProgram.year['@id'] === this.yearListSelect &&
        classProgram.class['@id'] === this.classListSelect &&
        classProgram.school['@id'] === this.schoolListSelect &&
        this.studCourseRegistrationsObligatoryFiltered.find(
          (studCourseRegistration: any) => studCourseRegistration.subject['@id'] === classProgram.subject['@id']
        ) === undefined
    );
    // console.log(this.studCourseRegistrationsFiltered);
    this.selectionOptional.clear();
    this.selectionRegistered.clear();
    this.studCourseRegistrationsObligatoryFiltered.forEach(
      (studCourseRegistration: any) => this.selectionRegistered.select(studCourseRegistration)
    );

    // this.schoolClassCode = (this.studCourseRegistrationsStudentFiltered)[0]?.class.code
    // this.schoolClass = (this.studCourseRegistrationsFiltered)[0].class

    this.dataSourceOptional = new MatTableDataSource(this.classProgramsFiltered);
    this.dataSourceOptional.sort = this.sortOptional;
    this.dataSourceOptional.paginator = this.paginatorOptional;
    this.dataSourceOptional.filterPredicate = (classProgram: any, filter: string): boolean => classProgram.subject.name.toString().toLowerCase().indexOf(filter) != -1;

    this.dataSourceRegistered = new MatTableDataSource(this.studCourseRegistrationsObligatoryFiltered);
    this.dataSourceRegistered.sort = this.sortRegistered;
    this.dataSourceRegistered.paginator = this.paginatorRegistered;
    this.dataSourceRegistered.filterPredicate = (studCourseRegistration: any, filter: string): boolean => studCourseRegistration.subject.name.toString().toLowerCase().indexOf(filter) != -1;

  }

  applyFilter(event: Event, optional: boolean = true) {
    const filterValue = (event.target as HTMLInputElement).value;
    const dataSource =  (optional ? this.dataSourceOptional : this.dataSourceRegistered);
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
    studregistrationListSelect = [this.studregistrationListSelect];
    selectionOptional = this.selectionOptional;
    selectionRegistered = this.selectionRegistered;


    console.log(selectionOptional.selected);
    const classProgramIds: any[] = [];
    const studCourseRegistrationNotSelectedIds =
        this.studCourseRegistrationsObligatoryFiltered?.filter( (studCourseRegistration: any) =>
          !selectionRegistered.selected.find( (studCourseRegistrationSelected: any) =>
            studCourseRegistrationSelected.id === studCourseRegistration.id)! // === undefined
     )?.map((studCourseRegistration: any) => studCourseRegistration.id);
    selectionOptional.selected.forEach( (classProgram: any) => {
          const studCourseRegistration = this.studCourseRegistrationsFiltered.find((studCourseRegistration: any) => classProgram.subject['@id'] === studCourseRegistration.subject['@id']);
          (studCourseRegistration ?
              studCourseRegistrationNotSelectedIds.push(studCourseRegistration.id) : classProgramIds.push(classProgram.id));
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
