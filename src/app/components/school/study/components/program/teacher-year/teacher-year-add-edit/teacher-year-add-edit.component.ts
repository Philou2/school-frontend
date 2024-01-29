import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {SchoolYearService} from 'src/app/components/school/schooling/services/configuration/school-year.service';
import {TeacherService} from '../../../../services/teacher.service';
import {TeacherYearService} from '../../../../services/teacher-year.service';

@Component({
  selector: 'app-teacher-year-add-edit',
  templateUrl: './teacher-year-add-edit.component.html',
  styleUrls: ['./teacher-year-add-edit.component.scss']
})
export class TeacherYearAddEditComponent {

  teacherYearForm: FormGroup;
  years: any[] = [];
  teachers: any[] = [];
  yearSelected: number | undefined;
  teacherSelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private teacherYearService: TeacherYearService,
              private teacherService: TeacherService,
              private schoolYearService: SchoolYearService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.teacherYearForm = this.fb.group({
      year: ['', [Validators.required]],
      teacher: ['', [Validators.required]],
      minannualquota: '',
      maxannualquota: '',
      minmonthlyquota: '',
      maxmonthlyquota: '',
      minweeklyquota: '',
      maxweeklyquota: '',

    });

  }

  ngOnInit() {
    this.teacherYearForm.patchValue(this.data);
    if (this.data){
      this.yearSelected = this.data.year['@id'];
      this.teacherSelected = this.data.teacher['@id'];
    }
    this.findAllYear();
    this.findAllTeacher();
  }

  get fc(): any {
    return this.teacherYearForm.controls;
  }


  onFormSubmit(): any {
  if (this.teacherYearForm.value.minannualquota === '') {
      this.teacherYearForm.patchValue({minannualquota: 0});
  }
  if (this.teacherYearForm.value.maxannualquota === '') {
      this.teacherYearForm.patchValue({maxannualquota: 0});
  }
  if (this.teacherYearForm.value.minmonthlyquota === '') {
      this.teacherYearForm.patchValue({minmonthlyquota: 0});
  }
  if (this.teacherYearForm.value.maxmonthlyquota === '') {
      this.teacherYearForm.patchValue({maxmonthlyquota: 0});
  }
  if (this.teacherYearForm.value.minweeklyquota === '') {
      this.teacherYearForm.patchValue({minweeklyquota: 0});
  }
  if (this.teacherYearForm.value.maxweeklyquota === '') {
      this.teacherYearForm.patchValue({maxweeklyquota: 0});
  }
  this.isSubmitted = true;
  if (this.teacherYearForm.valid){
      this.saving = true;
      if (this.data){
        this.teacherYearService.put(this.data.id, this.teacherYearForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Teacher Year edited successfully !', 'Success');
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
                this.teacherYearForm.get('year')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'teacher'){
                this.teacherYearForm.get('teacher')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      else {
        this.teacherYearService.post(this.teacherYearForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Teacher Year created successfully !', 'Success');
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
                this.teacherYearForm.get('year')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'teacher'){
                this.teacherYearForm.get('teacher')?.setErrors({serverError: v.message});
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


}
