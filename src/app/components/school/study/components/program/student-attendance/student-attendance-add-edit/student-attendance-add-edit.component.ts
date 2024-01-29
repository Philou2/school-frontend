import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
// import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {ClassProgramService} from '../../../../services/class-program.service';
import {SchoolYearService} from 'src/app/components/school/schooling/services/configuration/school-year.service';
import {SchoolService} from '../../../../../schooling/services/configuration/school.service';
import {SchoolClassService} from '../../../../../schooling/services/configuration/school-class.service';
import {SubjectService} from '../../../../services/subject.service';
import {TeacherService} from '../../../../services/teacher.service';
import { DatePipe,CommonModule } from '@angular/common';
import {StudentService} from '../../../../../schooling/services/registration/student.service';
import {TimeTableModelDayCellService} from '../../../../services/time-table-model-day-cell.service';
import {StudCourseRegistrationService} from '../../../../../schooling/services/registration/stud-course-registration.service';
import {StudentAttendanceService} from '../../../../services/student-attendance.service';


@Component({
  selector: 'app-student-attendance-add-edit',
  templateUrl: './student-attendance-add-edit.component.html',
  styleUrls: ['./student-attendance-add-edit.component.scss']
})
export class StudentAttendanceAddEditComponent {

  studentAttendanceForm: FormGroup;
  years: any[] = [];
  schools: any[] = [];
  classes: any[] = [];
  modules: any[] = [];
  subjects: any[] = [];
  students: any[] = [];
  teachers: any[] = [];

  rooms: any[] = [];
  natures: any[] = [];

  yearSelected: number | undefined;
  schoolSelected: number | undefined;
  classSelected: number | undefined;
  subjectSelected: number | undefined;
  studentSelected: number | undefined;
  items: any;

  tests: any;

  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private classProgramService: ClassProgramService,

              private studentAttendanceService: StudentAttendanceService,
              private yearService: SchoolYearService,

              private schoolService: SchoolService,

              private classService: SchoolClassService,

              private subjectService: SubjectService,


              private teacherService: TeacherService,
              private studentService: StudentService,
              private studCourseRegistrationService: StudCourseRegistrationService,
              private timeTableModelDayCellService: TimeTableModelDayCellService,

              private translate: TranslateService,
              private toastr: ToastrService,
              // public activeModal: NgbActiveModal,
              public route: Router,
              public router: Router,
              private datePipe: DatePipe
  ) {
    this.studentAttendanceForm = this.fb.group({
      students: this.fb.array([]),
      //class: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      is_present : '',
      institution :null,
    });

  }

  ngOnInit(): void {

    this.studentAttendanceService.currentStudentAttendance.subscribe(data => {


    console.log(this.data);
    if (data){
      this.data = data;

      this.studentAttendanceForm.patchValue(data);
      this.schoolSelected = data.school ? data.school['@id'] : null;
     // this.classSelected = data.class ? data.class['@id'] : null;
      this.subjectSelected = data.subject ? data.subject['@id'] : null;

      this.studentAttendanceForm.get('is_present')?.setValue(this.data.isActif ? '1' : '0');
    }
  });

    //this.findAllClass();
    this.findAllSubject();

  }

  get fc(): any {
    return this.studentAttendanceForm.controls;
  }

  close() {
    this.studentAttendanceForm.reset();
    this.studentAttendanceService.changeStudentAttendance(null);
}

/*  findAllClass(): any{
    this.classService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.classes = data['hydra:member'];
          this.classes = this.classes.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }*/




  findAllSubject(): any{
    this.timeTableModelDayCellService.getCalendarCurrentCourses().subscribe((data: any) => {
          console.log(data);
          this.subjects = data['hydra:member'];
          this.subjects = this.subjects.map((v) => {

            // this.studCourseRegistrationService.getCourseStudentRegList(v['course']['subject']['id']).subscribe((data: any) => {
            //       console.log(data);
            //       this.students = data['hydra:member'];
            //
            //       console.log(this.students);
            //     },
            //     error => console.log(error)
            // );

            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

  lordStudents($event: any): any{

    console.log($event);

    this.studCourseRegistrationService.getCourseStudentRegList($event.course.subject.id).subscribe((data: any) => {
          console.log(data);
          this.students = data['hydra:member'];

          console.log(this.students);
        },
        error => console.log(error)
    );

  }


  /*findAllSubject(): any{
    this.timeTableModelDayCellService.getCalendarCurrentCourses().subscribe((data: any) => {
          console.log(data);
          this.subjects = data['hydra:member'];
          this.subjects = this.subjects.map((v) => {
            let courseStartTime = new Date(v['startAt']);
            let courseEndTime = new Date(v['endAt']);
            let currentTime = new Date();

            let formattedStartTime = courseStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            let formattedEndTime = courseEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            let formattedCurrentTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            console.log("Heure de début du cours : " + formattedStartTime);
            console.log("Heure de fin du cours : " + formattedEndTime);
            console.log("Heure actuelle : " + formattedCurrentTime);

            if (currentTime >= courseStartTime && currentTime <= courseEndTime) {
              console.log("Le cours est en cours.");
              this.subjectSelected = v['@id'];

              this.studCourseRegistrationService.getCourseStudentRegList(v['course']['subject']['id']).subscribe((data: any) => {
                    console.log(data);
                    this.students = data['hydra:member'];
                    console.log(this.students);
                  },
                  error => console.log(error)
              );
            } else {
              console.log("Le cours n'est pas en cours.");
            }

            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

*/

  onFormSubmit(): any {

    this.isSubmitted = true;
    if (this.studentAttendanceForm.valid) {
      this.saving = true;
      if (this.data) {
        this.studentAttendanceForm.get('is_present')?.setValue(this.studentAttendanceForm.get('is_present')?.value === '1');

        this.studentAttendanceService.put(this.data.id, this.studentAttendanceForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Attendance edited successfully !', 'Success');
            this.studentAttendanceForm.reset();


            this.studentAttendanceService.changeStudentAttendance(null);
          },
          complete: () => {
          },
          error: (err: any) => {
            console.log(err['hydra:description']);
            this.saving = false;
            this.toastr.error(err['hydra:description']);
          }

        });
      } else {

        console.log(document.getElementsByClassName('stud-present')[0].id);
        console.log(this.studentAttendanceForm.get('is_present').value);


        this.items = this.students.map((student, i) => {
          let checkbox = document.getElementById(student.id) as HTMLInputElement;
          console.log(checkbox)
          let presence = checkbox.checked ? '1' : '0';
          return {
            id: student.id,
            name: student.name,
            presence: presence,
          }
        })

        console.log(this.items);

        this.studentAttendanceService.post(this.items, this.studentAttendanceForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Student Attendance created successfully !', 'Success');
            this.router.navigate(['/school/study/attendance']);

          },
          complete: () => {
          },
          error: (err: any) => {
            console.log(err['hydra:description']);
            this.saving = false;
            this.toastr.error(err['hydra:description']);
          }

        });
      }

    }

  }

}
