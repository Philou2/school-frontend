import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {StudCourseRegistrationService} from '../../../../services/registration/stud-course-registration.service';
import {SchoolYearService} from '../../../../services/configuration/school-year.service';
import {ClassProgram} from '../../../../../study/interface/class-program';
import {StudCourseRegistration} from '../../../../interface/registration/stud-course-registration';
import {ClassProgramService} from '../../../../../study/services/class-program.service';

@Component({
  selector: 'app-stud-course-registration-student',
  templateUrl: './stud-course-registration-student.component.html',
  styleUrls: ['./stud-course-registration-student.component.scss']
})
export class StudCourseRegistrationStudentComponent {
  displayedColumnsRegistered: string[] = [
    'subject',
    'type'
    // 'year',
    // 'class'
    // 'classProgram',
    // 'StudRegistration'
  ];

  displayedColumnsOptional: string[] = [
    'subject',
    // 'type'
    // 'year',
    // 'class'
    // 'classProgram',
    // 'StudRegistration'
  ];

  selectedIds: number[] = [];
  yearList: any[] = [];
  yearListSelect: string | undefined;

  // studentId = localStorage.getItem('user')['id'];
  schoolClass: any = {};

  public isButtonVisible = false;

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

  constructor(
    private studCourseRegistrationService: StudCourseRegistrationService,
    private yearService: SchoolYearService,
    private classProgramService: ClassProgramService,
    private toastr: ToastrService,
    // private coreService: CoreService,
    // private modalService: MdbModalService
  ) {}
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

  getSchoolYearList(){
    this.yearService.getListStudCourseReg().subscribe((data: any) => {
        this.yearList = data['hydra:member'];
        this.yearList = this.yearList.map((v) => {
          v.id = v['@id'];
          return v;
        });
        this.yearListSelect = this.yearList.at(0)?.['@id'];
      },
      error => {
        console.log(error);
        this.isLoading = false;
      },
      () => this.getClassProgramList()
    );
  }

  getClassProgramList(): void{
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

  // getList(): void{
  //   this.studCourseRegistrationService.getList().subscribe({
  //     next: (res: any) => {
  //       this.studCourseRegistrations = res['hydra:member'];
  //       console.log(this.studCourseRegistrations);
  //       // this.studCourseRegistrationsFiltered = this.studCourseRegistrations.slice()
  //       this.filter();
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       alert(error.message);
  //       console.log('Error while fetching the records');
  //       this.isLoading = false;
  //     }
  //   });
  // }

  getList(): void{
    this.studCourseRegistrationService.getStudentList().subscribe({
      next: (res: any) => {
        this.studCourseRegistrations = res['hydra:member'];
        console.log(this.studCourseRegistrations);
        // this.studCourseRegistrationsFiltered = this.studCourseRegistrations.slice()
        this.filter();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        console.log('Error while fetching the records');
        this.isLoading = false;
      }
    });
  }

  filter(): void {
    this.studCourseRegistrationsFiltered = this.studCourseRegistrations.filter(
      (studCourseRegistration: any) =>
        studCourseRegistration.year['@id'] === this.yearListSelect
      // studCourseRegistration.StudRegistration.student['@id'] === this.studentId

    );

    this.studCourseRegistrationsObligatoryFiltered = this.studCourseRegistrationsFiltered.filter((studCourseRegistration: any) => studCourseRegistration.isSubjectObligatory).sort( (studCourseRegistration1: any, studCourseRegistration2: any) => !studCourseRegistration1.classProgram.isSubjectObligatory ? -1 : 1 );

    this.isOpen = this.studCourseRegistrationsFiltered.length !== 0 ? this.studCourseRegistrationsFiltered[0].class.isChoiceStudCourseOpen : true;
    this.displayedColumnsRegistered = ['subject', 'type'];
    this.displayedColumnsOptional = ['subject'];
    if (this.isOpen) {
      this.displayedColumnsRegistered.push('select');
      this.displayedColumnsOptional.push('select');
    }
    this.classProgramsFiltered = this.classPrograms.filter(
      (classProgram: any) =>
        classProgram.year['@id'] === this.yearListSelect &&
        this.studCourseRegistrationsObligatoryFiltered.find( (studCourseRegistration: any) =>
        studCourseRegistration.subject['@id'] === classProgram.subject['@id']
        ) === undefined
    );
    this.selectionRegistered.clear();
    this.selectionOptional.clear();
    this.studCourseRegistrationsObligatoryFiltered.filter(
      (studCourseRegistration: any) => !studCourseRegistration.classProgram.isSubjectObligatory && !studCourseRegistration.hasSchoolMark
    ).forEach(
      (studCourseRegistration: any) => this.selectionRegistered.select(studCourseRegistration)
    );

    console.log(this.studCourseRegistrationsFiltered);


    this.schoolClass = this.studCourseRegistrationsFiltered[0] ? this.studCourseRegistrationsFiltered[0].class : '';

    this.dataSourceOptional = new MatTableDataSource(this.classProgramsFiltered);
    this.dataSourceOptional.sort = this.sortOptional;
    this.dataSourceOptional.paginator = this.paginatorOptional;
    this.dataSourceOptional.filterPredicate = (classProgram: any, filter: string): boolean => classProgram.subject.name.toString().toLowerCase().indexOf(filter) != -1;

    this.dataSourceRegistered = new MatTableDataSource(this.studCourseRegistrationsObligatoryFiltered);
    this.dataSourceRegistered.sort = this.sortRegistered;
    this.dataSourceRegistered.paginator = this.paginatorRegistered;
    this.dataSourceRegistered.filterPredicate = (studCourseRegistration: any, filter: string): boolean => studCourseRegistration.subject.name.toString().toLowerCase().indexOf(filter) != -1;

    this.isLoading = false;
  }

  applyFilter(event: Event, optional: boolean = true): void {
    const filterValue = (event.target as HTMLInputElement).value;
    const dataSource = optional ? this.dataSourceOptional : this.dataSourceRegistered;
    dataSource.filter = filterValue.trim().toLowerCase();

    if (dataSource.paginator) {
      dataSource.paginator.firstPage();
    }
  }

  getIdFromApiResourceId(apiResourceId: string | undefined): string{
    return apiResourceId ? apiResourceId.substring(apiResourceId.lastIndexOf('/') + 1) : '';
  }

  save(): void {
    console.log(this.selectionRegistered.selected);
    const classProgramIds: any[] = [];
    const studCourseRegistrationNotSelectedIds =
      this.studCourseRegistrationsObligatoryFiltered.filter(
        (studCourseRegistration: any) => !studCourseRegistration.classProgram.isSubjectObligatory && !studCourseRegistration.hasSchoolMark && this.selectionRegistered.selected.find(
          (studCourseRegistrationSelected: any) => studCourseRegistrationSelected.id === studCourseRegistration.id) === undefined
      ).map((studCourseRegistration: any) => studCourseRegistration.id);
    this.selectionOptional.selected.forEach( (classProgram: any) => {
      const studCourseRegistration = this.studCourseRegistrationsFiltered.find((studCourseRegistration: any) => classProgram.subject['@id'] === studCourseRegistration.subject['@id']);
      (studCourseRegistration ?
              studCourseRegistrationNotSelectedIds.push(studCourseRegistration.id) : classProgramIds.push(classProgram.id));
        }
    );

    const studCourseRegistrations = {
      classProgramIds,
      studCourseRegistrationIds : studCourseRegistrationNotSelectedIds,
      classId: this.getIdFromApiResourceId(this.schoolClass['@id']),
      yearId: this.getIdFromApiResourceId(this.yearListSelect),
      // studentId: this.studentId
    };
    console.log(JSON.stringify(studCourseRegistrations));

    if (classProgramIds.length + studCourseRegistrationNotSelectedIds.length > 0) {
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
