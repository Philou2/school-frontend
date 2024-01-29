import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
import {ModuleService} from '../../../../services/module.service';
import {PeriodTypeService} from 'src/app/components/setting/services/school/period-type.service';
import {RoomService} from '../../../../../schooling/services/configuration/room.service';
import {SubjectNatureService} from 'src/app/components/setting/services/school/subject-nature.service';
import {TeacherService} from '../../../../services/teacher.service';
import { TimeTableModelDayService } from '../../../../services/time-table-model-day.service';
import { DatePipe } from '@angular/common';
import { ClassProgram } from '../../../../interface/class-program';

@Component({
  selector: 'app-class-program-add-edit',
  templateUrl: './class-program-add-edit.component.html',
  styleUrls: ['./class-program-add-edit.component.scss']
})
export class ClassProgramAddEditComponent {

  classProgramForm: FormGroup;
  years: any[] = [];
  schools: any[] = [];
  classes: any[] = [];
  modules: any[] = [];
  subjects: any[] = [];
  teachers: any[] = [];
  teacherCms: any[] = [];
  teacherTds: any[] = [];
  teacherTps: any[] = [];
  teacherMarks: any[] = [];
  periodTypes: any[] = [];
  rooms: any[] = [];
  natures: any[] = [];
  modelDays: any[] = [];

  modelDaySelected: number | undefined;
  yearSelected: number | undefined;
  schoolSelected: number | undefined;
  classSelected: number | undefined;
  subjectSelected: number | undefined;
  moduleSelected: number | undefined;
  // teacherSelected: number | undefined;
  teacherCmSelected: number | undefined;
  teacherTdSelected: number | undefined;
  teacherTpSelected: number | undefined;
  teacherMarkSelected: number | undefined;
  periodTypeSelected: number | undefined;
  roomSelected: number | undefined;
  natureSelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  hasSchoolMark = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private classProgramService: ClassProgramService,
              private yearService: SchoolYearService,

              private schoolService: SchoolService,

              private classService: SchoolClassService,

              private subjectService: SubjectService,

              private moduleService: ModuleService,
              private modelDayService: TimeTableModelDayService,

              private teacherService: TeacherService,
              private natureService: SubjectNatureService,
              private periodTypeService: PeriodTypeService,
              private roomService: RoomService,
              private translate: TranslateService,
              private toastr: ToastrService,
              // public activeModal: NgbActiveModal,
              public route: Router,
              public router: Router,
              private datePipe: DatePipe
  ) {
    this.classProgramForm = this.fb.group({
      year: ['', [Validators.required]],
      school: ['', [Validators.required]],
      class: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      module: ['', [Validators.required]],
      // teacher : '',
      teacherCm : '',
      teacherTd : '',
      teacherTp : '',
      teacherMark : '',
      isSubjectObligatory : false,
      isActif : '',
      codeuvc : '',
      nameuvc : '',
      periodType : '',
      position : '',
      coeff : '',
      principalRoom : '',
      nature : '',
      numberSubChap : '',
      vhCm : '',
      vhTd : '',
      vhTp : '',
      vhMt : '',
      vhEx : '',
      vhAb : '',
      days: '',
        mondayCm: [false],
        tuesdayCm: [false],
        wednesdayCm: [false],
        thursdayCm: [false],
        fridayCm: [false],
        saturdayCm: [false],
        sundayCm: [false],
        mondayStartCm: null,
        mondayEndCm: null,
        tuesdayStartCm: null,
        tuesdayEndCm: null,
        wednesdayStartCm: null,
        wednesdayEndCm: null,
        thursdayStartCm: null,
        thursdayEndCm: null,
        fridayStartCm: null,
        fridayEndCm: null,
        saturdayStartCm: null,
        saturdayEndCm: null,
        sundayStartCm: null,
        sundayEndCm: null,

        mondayTp: [false],
        tuesdayTp: [false],
        wednesdayTp: [false],
        thursdayTp: [false],
        fridayTp: [false],
        saturdayTp: [false],
        sundayTp: [false],
        mondayStartTp: null,
        mondayEndTp: null,
        tuesdayStartTp: null,
        tuesdayEndTp: null,
        wednesdayStartTp: null,
        wednesdayEndTp: null,
        thursdayStartTp: null,
        thursdayEndTp: null,
        fridayStartTp: null,
        fridayEndTp: null,
        saturdayStartTp: null,
        saturdayEndTp: null,
        sundayStartTp: null,
        sundayEndTp: null,

        mondayTd: [false],
        tuesdayTd: [false],
        wednesdayTd: [false],
        thursdayTd: [false],
        fridayTd: [false],
        saturdayTd: [false],
        sundayTd: [false],
        mondayStartTd: null,
        mondayEndTd: null,
        tuesdayStartTd: null,
        tuesdayEndTd: null,
        wednesdayStartTd: null,
        wednesdayEndTd: null,
        thursdayStartTd: null,
        thursdayEndTd: null,
        fridayStartTd: null,
        fridayEndTd: null,
        saturdayStartTd: null,
        saturdayEndTd: null,
        sundayStartTd: null,
        sundayEndTd: null,
        isValidated: '',
        userValidated: '',
    });
  }

  ngOnInit(): void {

    this.classProgramService.currentClassProgram.subscribe(data => {


    console.log(this.data);
    if (data){
      this.data = data;
this.hasSchoolMark = this.data.hasSchoolMark;
      this.classProgramForm.patchValue(data);
      this.yearSelected = data.year ? data.year['@id'] : null;
      this.schoolSelected = data.school ? data.school['@id'] : null;
      this.classSelected = data.class ? data.class['@id'] : null;
      this.subjectSelected = data.subject ? data.subject['@id'] : null;
      this.moduleSelected = data.module ? data.module['@id'] : null;
      // this.teacherSelected = data.teacher ? data.teacher['@id'] : null;
      this.teacherCmSelected = data.teacherCm ? data.teacherCm['@id'] : null;
      this.teacherTdSelected = data.teacherTd ? data.teacherTd['@id'] : null;
      this.teacherTpSelected = data.teacherTp ? data.teacherTp['@id'] : null;
      this.teacherMarkSelected = data.teacherMark ? data.teacherMark['@id'] : null;
      this.roomSelected = data.principalRoom ? data.principalRoom['@id'] : null;
      this.periodTypeSelected = data.periodType ? data.periodType['@id'] : null;
      this.natureSelected = data.nature ? data.nature['@id'] : null;

      this.classProgramForm.get('isActif')?.setValue(this.data.isActif ? '1' : '0');
      this.classProgramForm.get('isSubjectObligatory')?.setValue(this.data.isSubjectObligatory ? '1' : '0');

      const mondayStartCm = this.datePipe.transform(data.mondayStartCm, 'HH:mm', 'UTC');
      this.classProgramForm.get('mondayStartCm')?.setValue(mondayStartCm);

      const mondayEndCm = this.datePipe.transform(data.mondayEndCm, 'HH:mm', 'UTC');
      this.classProgramForm.get('mondayEndCm')?.setValue(mondayEndCm);

      const tuesdayStartCm = this.datePipe.transform(data.tuesdayStartCm, 'HH:mm', 'UTC');
      this.classProgramForm.get('tuesdayStartCm')?.setValue(tuesdayStartCm);

      const tuesdayEndCm = this.datePipe.transform(data.tuesdayEndCm, 'HH:mm', 'UTC');
      this.classProgramForm.get('tuesdayEndCm')?.setValue(tuesdayEndCm);

      const wednesdayStartCm = this.datePipe.transform(data.wednesdayStartCm, 'HH:mm', 'UTC');
      this.classProgramForm.get('wednesdayStartCm')?.setValue(wednesdayStartCm);

      const wednesdayEndCm = this.datePipe.transform(data.wednesdayEndCm, 'HH:mm', 'UTC');
      this.classProgramForm.get('wednesdayEndCm')?.setValue(wednesdayEndCm);

      const thursdayStartCm = this.datePipe.transform(data.thursdayStartCm, 'HH:mm', 'UTC');
      this.classProgramForm.get('thursdayStartCm')?.setValue(thursdayStartCm);

      const thursdayEndCm = this.datePipe.transform(data.thursdayEndCm, 'HH:mm', 'UTC');
      this.classProgramForm.get('thursdayEndCm')?.setValue(thursdayEndCm);

      const fridayStartCm = this.datePipe.transform(data.fridayStartCm, 'HH:mm', 'UTC');
      this.classProgramForm.get('fridayStartCm')?.setValue(fridayStartCm);

      const fridayEndCm = this.datePipe.transform(data.fridayEndCm, 'HH:mm', 'UTC');
      this.classProgramForm.get('fridayEndCm')?.setValue(fridayEndCm);

      const saturdayStartCm = this.datePipe.transform(data.saturdayStartCm, 'HH:mm', 'UTC');
      this.classProgramForm.get('saturdayStartCm')?.setValue(saturdayStartCm);

      const saturdayEndCm = this.datePipe.transform(data.saturdayEndCm, 'HH:mm', 'UTC');
      this.classProgramForm.get('saturdayEndCm')?.setValue(saturdayEndCm);

      const sundayStartCm = this.datePipe.transform(data.sundayStartCm, 'HH:mm', 'UTC');
      this.classProgramForm.get('sundayStartCm')?.setValue(sundayStartCm);

      const sundayEndCm = this.datePipe.transform(data.sundayEndCm, 'HH:mm', 'UTC');
      this.classProgramForm.get('sundayEndCm')?.setValue(sundayEndCm);


      const mondayStartTp = this.datePipe.transform(data.mondayStartTp, 'HH:mm', 'UTC');
      this.classProgramForm.get('mondayStartTp')?.setValue(mondayStartTp);

      const mondayEndTp = this.datePipe.transform(data.mondayEndTp, 'HH:mm', 'UTC');
      this.classProgramForm.get('mondayEndTp')?.setValue(mondayEndTp);

      const tuesdayStartTp = this.datePipe.transform(data.tuesdayStartTp, 'HH:mm', 'UTC');
      this.classProgramForm.get('tuesdayStartTp')?.setValue(tuesdayStartTp);

      const tuesdayEndTp = this.datePipe.transform(data.tuesdayEndTp, 'HH:mm', 'UTC');
      this.classProgramForm.get('tuesdayEndTp')?.setValue(tuesdayEndTp);

      const wednesdayStartTp = this.datePipe.transform(data.wednesdayStartTp, 'HH:mm', 'UTC');
      this.classProgramForm.get('wednesdayStartTp')?.setValue(wednesdayStartTp);

      const wednesdayEndTp = this.datePipe.transform(data.wednesdayEndTp, 'HH:mm', 'UTC');
      this.classProgramForm.get('wednesdayEndTp')?.setValue(wednesdayEndTp);

      const thursdayStartTp = this.datePipe.transform(data.thursdayStartTp, 'HH:mm', 'UTC');
      this.classProgramForm.get('thursdayStartTp')?.setValue(thursdayStartTp);

      const thursdayEndTp = this.datePipe.transform(data.thursdayEndTp, 'HH:mm', 'UTC');
      this.classProgramForm.get('thursdayEndTp')?.setValue(thursdayEndTp);

      const fridayStartTp = this.datePipe.transform(data.fridayStartTp, 'HH:mm', 'UTC');
      this.classProgramForm.get('fridayStartTp')?.setValue(fridayStartTp);

      const fridayEndTp = this.datePipe.transform(data.fridayEndTp, 'HH:mm', 'UTC');
      this.classProgramForm.get('fridayEndTp')?.setValue(fridayEndTp);

      const saturdayStartTp = this.datePipe.transform(data.saturdayStartTp, 'HH:mm', 'UTC');
      this.classProgramForm.get('saturdayStartTp')?.setValue(saturdayStartTp);

      const saturdayEndTp = this.datePipe.transform(data.saturdayEndTp, 'HH:mm', 'UTC');
      this.classProgramForm.get('saturdayEndTp')?.setValue(saturdayEndTp);

      const sundayStartTp = this.datePipe.transform(data.sundayStartTp, 'HH:mm', 'UTC');
      this.classProgramForm.get('sundayStartTp')?.setValue(sundayStartTp);

      const sundayEndTp = this.datePipe.transform(data.sundayEndTp, 'HH:mm', 'UTC');
      this.classProgramForm.get('sundayEndTp')?.setValue(sundayEndTp);


      const mondayStartTd = this.datePipe.transform(data.mondayStartTd, 'HH:mm', 'UTC');
      this.classProgramForm.get('mondayStartTd')?.setValue(mondayStartTd);

      const mondayEndTd = this.datePipe.transform(data.mondayEndTd, 'HH:mm', 'UTC');
      this.classProgramForm.get('mondayEndTd')?.setValue(mondayEndTd);

      const tuesdayStartTd = this.datePipe.transform(data.tuesdayStartTd, 'HH:mm', 'UTC');
      this.classProgramForm.get('tuesdayStartTd')?.setValue(tuesdayStartTd);

      const tuesdayEndTd = this.datePipe.transform(data.tuesdayEndTd, 'HH:mm', 'UTC');
      this.classProgramForm.get('tuesdayEndTd')?.setValue(tuesdayEndTd);

      const wednesdayStartTd = this.datePipe.transform(data.wednesdayStartTd, 'HH:mm', 'UTC');
      this.classProgramForm.get('wednesdayStartTd')?.setValue(wednesdayStartTd);

      const wednesdayEndTd = this.datePipe.transform(data.wednesdayEndTd, 'HH:mm', 'UTC');
      this.classProgramForm.get('wednesdayEndTd')?.setValue(wednesdayEndTd);

      const thursdayStartTd = this.datePipe.transform(data.thursdayStartTd, 'HH:mm', 'UTC');
      this.classProgramForm.get('thursdayStartTd')?.setValue(thursdayStartTd);

      const thursdayEndTd = this.datePipe.transform(data.thursdayEndTd, 'HH:mm', 'UTC');
      this.classProgramForm.get('thursdayEndTd')?.setValue(thursdayEndTd);

      const fridayStartTd = this.datePipe.transform(data.fridayStartTd, 'HH:mm', 'UTC');
      this.classProgramForm.get('fridayStartTd')?.setValue(fridayStartTd);

      const fridayEndTd = this.datePipe.transform(data.fridayEndTd, 'HH:mm', 'UTC');
      this.classProgramForm.get('fridayEndTd')?.setValue(fridayEndTd);

      const saturdayStartTd = this.datePipe.transform(data.saturdayStartTd, 'HH:mm', 'UTC');
      this.classProgramForm.get('saturdayStartTd')?.setValue(saturdayStartTd);

      const saturdayEndTd = this.datePipe.transform(data.saturdayEndTd, 'HH:mm', 'UTC');
      this.classProgramForm.get('saturdayEndTd')?.setValue(saturdayEndTd);

      const sundayStartTd = this.datePipe.transform(data.sundayStartTd, 'HH:mm', 'UTC');
      this.classProgramForm.get('sundayStartTd')?.setValue(sundayStartTd);

      const sundayEndTd = this.datePipe.transform(data.sundayEndTd, 'HH:mm', 'UTC');
      this.classProgramForm.get('sundayEndTd')?.setValue(sundayEndTd);

      if (this.data.hasSchoolMark){
        this.classProgramForm.get('year')?.disable();
        this.classProgramForm.get('class')?.disable();
        this.classProgramForm.get('school')?.disable();
        this.classProgramForm.get('subject')?.disable();
        this.classProgramForm.get('isSubjectObligatory')?.disable();
      }
    }
  });

    this.findAllYear();
    this.findAllSchool();
    this.findAllClass();
    this.findAllSubject();
    this.findAllModule();
    // this.findAllTeacher();
    this.findAllTeacherCm();
    this.findAllTeacherTd();
    this.findAllTeacherTp();
    this.findAllTeacherMark();
    this.findAllPeriodType();
    this.findAllRoom();
    this.findAllNature();
    this.findAllModelDay();
  }

  get fc(): any {
    return this.classProgramForm.controls;
  }

  close() {
    this.classProgramForm.reset();
    this.classProgramService.changeClassProgram(null);
}


  onFormSubmit(): any {
      if (this.classProgramForm.value.coeff === '') {
          this.classProgramForm.patchValue({coeff: 0});
      }
      if (this.classProgramForm.value.position === '') {
          this.classProgramForm.patchValue({position: 0});
      }
      if (this.classProgramForm.value.vhCm === '') {
        this.classProgramForm.patchValue({vhCm: 0});
      }
      if (this.classProgramForm.value.vhTd === '') {
          this.classProgramForm.patchValue({vhTd: 0});
      }
      if (this.classProgramForm.value.vhTp === '') {
      this.classProgramForm.patchValue({vhTp: 0});
      }
      if (this.classProgramForm.value.vhMt === '') {
          this.classProgramForm.patchValue({vhMt: 0});
      }
      if (this.classProgramForm.value.vhEx === '') {
        this.classProgramForm.patchValue({vhEx: 0});
        }
      if (this.classProgramForm.value.vhAb === '') {
          this.classProgramForm.patchValue({vhAb: 0});
      }
      if (this.classProgramForm.value.numberSubChap === '') {
        this.classProgramForm.patchValue({numberSubChap: 0});
    }
      this.isSubmitted = true;
      if (this.classProgramForm.valid) {
      this.saving = true;
      let value = this.classProgramForm.value;

      if (this.data) {
        this.classProgramForm.get('isActif')?.setValue(this.classProgramForm.get('isActif')?.value === '1');
        this.classProgramForm.get('isSubjectObligatory')?.setValue(this.classProgramForm.get('isSubjectObligatory')?.value === '1');
        value ={...this.classProgramForm.value,previousClass:this.data.class.id,previousIsSubjectObligatory: this.data.isSubjectObligatory,
        previousSchool: this.data.school.id,previousYear: this.data.year.id,previousSubject: this.data.subject.id} ;
        this.classProgramService.put(this.data.id, value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Class Program edited successfully !', 'Success');
            this.router.navigate(['/school/study/class-program']);
            this.classProgramForm.reset();
            this.classProgramService.changeClassProgram(null);
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
        this.classProgramForm.get('isActif')?.setValue(this.classProgramForm.get('isActif')?.value === '1');
        this.classProgramForm.get('isSubjectObligatory')?.setValue(this.classProgramForm.get('isSubjectObligatory')?.value === '1');
        this.classProgramService.post(this.classProgramForm.value).subscribe({
          next: (val: any) => {
              this.saving = false;
              this.toastr.success('Class Program created successfully !', 'Success');
              // this.router.navigate(['/school/study/class-program']);

          },
          complete: () => {
          },
          error: (err: any) => {
            console.log(err['hydra:description']);
            this.saving = false;
            this.toastr.error(err['hydra:description']);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }

        });
      }

    }
  }

  findAllYear(): any{
    this.yearService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.years = data['hydra:member'];
          this.years = this.years.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }
  findAllSchool(): any{
    this.schoolService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.schools = data['hydra:member'];
          this.schools = this.schools.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }
  findAllPeriodType(): any{
    this.periodTypeService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.periodTypes = data['hydra:member'];
          this.periodTypes = this.periodTypes.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }
  findAllClass(): any{
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
  }
  findAllSubject(): any{
    this.subjectService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.subjects = data['hydra:member'];
          this.subjects = this.subjects.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }
  findAllModule(): any{
    this.moduleService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.modules = data['hydra:member'];
          this.modules = this.modules.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

  findAllTeacherCm(): any{
    this.teacherService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.teacherCms = data['hydra:member'];
          this.teacherCms = this.teacherCms.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

  findAllTeacherTd(): any{
    this.teacherService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.teacherTds = data['hydra:member'];
          this.teacherTds = this.teacherTds.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

  // findAllTeacher(): any{
  //   this.teacherService.getCollection().subscribe((data: any) => {
  //         console.log(data);
  //         this.teachers = data['hydra:member'];
  //         this.teachers = this.teachers.map((v) => {
  //           v.id = v['@id'];
  //           return v;
  //         });
  //       },
  //       error => console.log(error)
  //   );
  // }

  findAllTeacherTp(): any{
    this.teacherService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.teacherTps = data['hydra:member'];
          this.teacherTps = this.teacherTps.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

  findAllTeacherMark(): any{
    this.teacherService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.teacherMarks = data['hydra:member'];
          this.teacherMarks = this.teacherMarks.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

  findAllRoom(): any{
    this.roomService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.rooms = data['hydra:member'];
          this.rooms = this.rooms.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

  findAllNature(): any{
    this.natureService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.natures = data['hydra:member'];
          this.natures = this.natures.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

  findAllModelDay(): any{
    this.modelDayService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.modelDays = data['hydra:member'];
          this.modelDays = this.modelDays.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );


  }
}
