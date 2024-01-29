import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {TimeTableModelDayService} from "../../../../services/time-table-model-day.service";
import {TeacherService} from '../../../../services/teacher.service';
import {LeaveTypeService} from '../../../../services/leave-type.service';
import {LeaveCharacterService} from '../../../../services/leave-character.service';
import {LeaveRequestServiceService} from '../../../../services/leave-request.service';

@Component({
  selector: 'app-leave-request-add-edit',
  templateUrl: './leave-request-add-edit.component.html',
  styleUrls: ['./leave-request-add-edit.component.scss']
})
export class LeaveRequestAddEditComponent {

  leaveRequestForm: FormGroup;
  
  teachers: any[] = [];
  leacveTypes: any[] = [];
  leaveCharacters: any[] = [];

  teacherSelected: number | undefined;
  leaveTypeSelected: number | undefined;
  leaveCharactereSelected: number | undefined;
  saving = false;

  public data: any;

  minEndDate: string;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private leaveRequestServiceService: LeaveRequestServiceService,
              private teacherService: TeacherService,
              private leaveTypeService: LeaveTypeService,
              private leaveCharacterService: LeaveCharacterService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router,
              private datePipe: DatePipe
  ) {
    this.leaveRequestForm = this.fb.group({
      teacher: null,
      institution: null,
      leacveType: '',
      leaveCharacter: '',
      startAt: '',
      endAt: '',
      description: '',

    });
  }

  ngOnInit(): void {
    this.leaveRequestForm.patchValue(this.data);
    console.log(this.data);
    if (this.data){
     this.leaveTypeSelected = this.data.leacveType['@id'];
     this.leaveCharactereSelected = this.data.leaveCharacter['@id'];
      console.log(this.data);

      const startAt = this.datePipe.transform(this.data.startAt);
      this.leaveRequestForm.get('startAt')?.setValue(startAt);

      const endAt = this.datePipe.transform(this.data.endAt);
      this.leaveRequestForm.get('endAt')?.setValue(endAt);
    }
   this.findAllTeacher();
   this.findAllLeacveType();
   this.findAllLeaveCharacter();

  }
  get fc(): any {
    return this.leaveRequestForm.controls;
  }

  onStartDateChange(event: any) {
    this.minEndDate = event.target.value;
  }

    onFormSubmit(): any {
        this.isSubmitted = true;
        if (this.leaveRequestForm.valid) {
            this.saving = true;
            if (this.data) {
                this.leaveRequestServiceService.put(this.data.id, this.leaveRequestForm.value).subscribe({
                    next: (val: any) => {
                        this.saving = false;
                        this.toastr.success('Leave Request edit with success !', 'Success');
                        this.activeModal.close();
                    },
                    complete: () => {
                    },
          /*          error: (err: any) => {
                        const errors: any[] = err.violations;

                        errors.forEach((v) => {
                            if (v.propertyPath === this.leaveRequestForm.get('leacveType')) {
                                this.leaveRequestForm.get('leacveType')?.setErrors({serverError: v.message});
                            }
                            if (v.propertyPath === this.leaveRequestForm.get('leaveCharacter')) {
                                this.leaveRequestForm.get('leaveCharacter')?.setErrors({serverError: v.message});
                            }
                            this.saving = false;

                        });
                    }*/
                });
            } else {
                this.leaveRequestServiceService.post(this.leaveRequestForm.value).subscribe({
                    next: (val: any) => {
                        this.toastr.success('Leave Request create with success !', 'Success');
                        this.activeModal.close();

                    },
                    complete: () => {
                        this.saving = false;
                    },
            /*        error: (err: any) => {
                        console.log(err)
                        const errors: any[] = err.violations;

                        errors.forEach((v) => {
                            this.saving = false;
                            if (v.propertyPath === 'leacveType') {
                                this.leaveRequestForm.get('leacveType')?.setErrors({serverError: v.message});
                            }
                            if (v.propertyPath === 'leaveCharacter') {
                                this.leaveRequestForm.get('leaveCharacter')?.setErrors({serverError: v.message});
                            }
                        });
                    }*/
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
  findAllLeacveType(): any{
    this.leaveTypeService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.leacveTypes = data['hydra:member'];
          this.leacveTypes = this.leacveTypes.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }
  findAllLeaveCharacter(): any{
    this.leaveCharacterService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.leaveCharacters = data['hydra:member'];
          this.leaveCharacters = this.leaveCharacters.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }




}
