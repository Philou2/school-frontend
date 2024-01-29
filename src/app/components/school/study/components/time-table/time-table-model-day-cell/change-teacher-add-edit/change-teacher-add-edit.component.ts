import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {ClassProgramService} from '../../../../services/class-program.service';
import {TimeTableModelDayCellService} from '../../../../services/time-table-model-day-cell.service';
import {TeacherService} from '../../../../services/teacher.service';

@Component({
  selector: 'app-change-teacher-add-edit',
  templateUrl: './change-teacher-add-edit.component.html',
  styleUrls: ['./change-teacher-add-edit.component.scss']
})
export class ChangeTeacherAddEditComponent {

  changeTeacherForm: FormGroup;

  teachers: any[] = [];
  teacherSelected: number | undefined;
  saving = false;

  public data: any;

  minEndDate: string;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private timetableModelDayCellService: TimeTableModelDayCellService,
              private teacherService: TeacherService,
              private courseService: ClassProgramService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router,
              private datePipe: DatePipe
  ) {
    this.changeTeacherForm = this.fb.group({
      teacher: '',

    });
  }

  ngOnInit(): void {
    this.changeTeacherForm.patchValue(this.data);
    if (this.data){
      this.teacherSelected = this.data.teacher['@id'];

    }
    this.findAllTeacher();
  }
  get fc(): any {
    return this.changeTeacherForm.controls;
  }

  onStartDateChange(event: any) {
    this.minEndDate = event.target.value;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.changeTeacherForm.valid) {
      this.saving = true;
      if (this.data) {
        this.timetableModelDayCellService.putGeneral(this.data.id, this.changeTeacherForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Teacher edited successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            this.saving = false;
            const errors: any[] = err.violations;
            errors.forEach((v) => {

            });
          }
        });
      } else {
        this.teacherService.post(this.changeTeacherForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Teacher created successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            this.saving = false;
            console.log(err);
            const errors: any[] = err.violations;
            errors.forEach((v) => {
              
            });
          }
        });
      }

    }
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
