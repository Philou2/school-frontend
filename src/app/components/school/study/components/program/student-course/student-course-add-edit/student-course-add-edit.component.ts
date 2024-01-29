import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {SchoolYearService} from 'src/app/components/school/schooling/services/configuration/school-year.service';
import {TeacherService} from '../../../../services/teacher.service';
import {ClassProgramService} from '../../../../services/class-program.service';
import {SubjectService} from '../../../../services/subject.service';

@Component({
  selector: 'app-student-course-add-edit',
  templateUrl: './student-course-add-edit.component.html',
  styleUrls: ['./student-course-add-edit.component.scss']
})
export class StudentCourseAddEditComponent {

  teacherCourseForm: FormGroup;
  years: any[] = [];
  teachers: any[] = [];
  subjects: any[] = [];
  yearSelected: number | undefined;
  subjectSelected: number | undefined;
  teacherSelected: number | undefined;
  saving = false;

  public data: any;
  filteredSubjects: any[];

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private teacherService: TeacherService,
              private classProgramService: ClassProgramService,
              private schoolYearService: SchoolYearService,
              private subjectService: SubjectService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.teacherCourseForm = this.fb.group({
      year: ['', [Validators.required]],
      teacher: ['', [Validators.required]],
      subject: ['', [Validators.required]],

    });

  }
  ngOnInit() {
    this.teacherCourseForm.patchValue(this.data);
    this.filteredSubjects = this.subjects;
    if (this.data){
      this.yearSelected = this.data.year['@id'];
      this.teacherSelected = this.data.teacher['@id'];
      this.subjectSelected = this.data.subject['@id'];
    }
    this.findAllYear();
    this.findAllTeacher();
    this.findAllSubject();

    // Ajoutez ceci pour vous abonner aux changements de valeur du contrôle de formulaire 'teacher'
    this.teacherCourseForm.get('teacher').valueChanges.subscribe(value => {
      this.teacherSelected = value;
      this.filterSubjectsByTeacher();
    });
  }

  get fc(): any {
    return this.teacherCourseForm.controls;
  }
  onFormSubmit(): any {
  this.isSubmitted = true;
  if (this.teacherCourseForm.valid){
      this.saving = true;
      if (this.data){
        this.classProgramService.put(this.data.id, this.teacherCourseForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Teacher course edited successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {

            const errors: any[] = err.violations;

            errors.forEach((v) =>
            {
              if (v.propertyPath === 'year'){
                this.teacherCourseForm.get('year')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'teacher'){
                this.teacherCourseForm.get('teacher')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'subject'){
                this.teacherCourseForm.get('subject')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      else {
        this.classProgramService.post(this.teacherCourseForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Teacher course created successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {
            const errors: any[] = err.violations;
            console.log(err);

            errors.forEach((v) =>
            {
              if (v.propertyPath === 'year'){
                this.teacherCourseForm.get('year')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'teacher'){
                this.teacherCourseForm.get('teacher')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'subject'){
                this.teacherCourseForm.get('subject')?.setErrors({serverError: v.message});
              }
              this.saving = false;
            });
          }
        });


      }

    }
  }

  findAllYear(): any{
    this.schoolYearService.getCollection().subscribe((data: any) => {
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

  findAllTeacher(): any{
    this.teacherService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.teachers = data['hydra:member'];
          this.teachers = this.teachers.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }
 /* findAllSubject(): any{
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
  }*/


  applyTeacherCourseFilter(filterValue: string) {
    this.filteredSubjects = this.subjects.filter(subject => subject.name.toLowerCase().includes(filterValue.toLowerCase()));
  }
  findAllSubject(): any{
    this.subjectService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.subjects = data['hydra:member'];
          this.subjects = this.subjects.map((v) => {
            v.id = v['@id'];
            return v;
          });
          this.filterSubjectsByTeacher();
        },
        error => console.log(error)
    );
  }

  filterSubjectsByTeacher(): void {
    this.filteredSubjects = this.subjects.filter(subject => subject.teacherId === this.teacherSelected);
  }

}
