import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {TeacherService} from '../../../../services/teacher.service';
import {ClassProgramService} from '../../../../services/class-program.service';
import {TeacherCourseRegistrationService} from '../../../../services/teacher-course-registration.service';

@Component({
  selector: 'app-student-course-plan-registration-call-add-edit',
  templateUrl: './student-course-plan-registration-call-add-edit.component.html',
  styleUrls: ['./student-course-plan-registration-call-add-edit.component.scss']
})
export class StudentCoursePlanRegistrationCallAddEditComponent {

  teacherCourseRegistrationForm: FormGroup;
  courses: any[] = [];
  teachers: any[] = [];
  courseSelected: number | undefined;
  teacherSelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private teacherCourseRegistrationService: TeacherCourseRegistrationService,
              private teacherService: TeacherService,
              private courseService: ClassProgramService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.teacherCourseRegistrationForm = this.fb.group({
      teacher: ['', [Validators.required]],
      course: ['', [Validators.required]],
      hourlyRateVolume: '',
      hourlyRateExhausted: '',
      hourlyRateNotExhausted: '',
      type: '',
    });

  }

  ngOnInit() {
    this.teacherCourseRegistrationForm.patchValue(this.data);
    if (this.data){
      this.courseSelected = this.data.course['@id'];
      this.teacherSelected = this.data.teacher['@id'];
    }
    this.findAllCourse();
    this.findAllTeacher();
  }

  get fc(): any {
    return this.teacherCourseRegistrationForm.controls;
  }


  onFormSubmit(): any {
  if (this.teacherCourseRegistrationForm.value.hourlyRateVolume === '') {
      this.teacherCourseRegistrationForm.patchValue({hourlyRateVolume: 0});
  }
  if (this.teacherCourseRegistrationForm.value.hourlyRateExhausted === '') {
      this.teacherCourseRegistrationForm.patchValue({hourlyRateExhausted: 0});
  }
  if (this.teacherCourseRegistrationForm.value.hourlyRateNotExhausted === '') {
      this.teacherCourseRegistrationForm.patchValue({hourlyRateNotExhausted: 0});
  }
  this.isSubmitted = true;
  if (this.teacherCourseRegistrationForm.valid){
      this.saving = true;
      if (this.data){
        this.teacherCourseRegistrationService.put(this.data.id, this.teacherCourseRegistrationForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Teacher Course Registration edited successfully !', 'Success');
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
              this.saving = false;
              if (v.propertyPath === 'course'){
                this.teacherCourseRegistrationForm.get('course')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'teacher'){
                this.teacherCourseRegistrationForm.get('teacher')?.setErrors({serverError: v.message});
              }

            });
          }
        });
      }
      else {
        this.teacherCourseRegistrationService.post(this.teacherCourseRegistrationForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Teacher Course Registration created successfully !', 'Success');
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
              this.saving = false;
              if (v.propertyPath === 'course'){
                this.teacherCourseRegistrationForm.get('course')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'teacher'){
                this.teacherCourseRegistrationForm.get('teacher')?.setErrors({serverError: v.message});
              }
            });
          }
        });


      }

    }
  }

  findAllCourse(): any{
    this.courseService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.courses = data['hydra:member'];
          this.courses = this.courses.map((v) => {
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


}
