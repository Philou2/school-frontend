import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {SchoolYearService} from 'src/app/components/school/schooling/services/configuration/school-year.service';
import {SchoolClassService} from 'src/app/components/school/schooling/services/configuration/school-class.service';
import {StudRegistrationService} from '../../../../services/registration/stud-registration.service';
import {OldStudentRegistrationService} from 'src/app/components/school/schooling/services/registration/old-student-registration.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'dismissal-add-edit',
  templateUrl: './dismissal-add-edit.component.html',
  styleUrls: ['./dismissal-add-edit.component.scss']
})
export class DismissalAddEditComponent {

  dismissalForm: FormGroup;
  years: any[] = [];
  classes: any[] = [];
  classesFiltered: any[] = [];
  studregistrations: any[] = [];
  studregistrationsFiltered: any[] = [];

  yearSelected: number | undefined;
  classSelected: number | undefined;
  studregistrationSelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Dismiss');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private studRegistrationService: StudRegistrationService,
              private oldStudentRegistrationService: OldStudentRegistrationService,
              private schoolYearService: SchoolYearService,
              private schoolClassService: SchoolClassService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router,
              private datePipe: DatePipe
  ) {
    this.dismissalForm = this.fb.group({
      studentlist: '',
      year: '',
      classe: ''
    });

  }

  ngOnInit() {
    this.dismissalForm.patchValue(this.data);
    if (this.data){
      console.log(this.data);
      console.log(this.data.year);
      const student = this.data.student;
      this.dismissalForm.get('studregistration')?.setValue(this.data);
      this.yearSelected = this.data.year['@id'];
      this.classSelected = this.data.classe['@id'];
      this.studregistrationSelected = this.data.studregistration['@id'];
    }

    this.findAllYear();
    this.findAllClass();
    this.findAllStudRegistration();

  }

  get fc(): any {
    return this.dismissalForm.controls;
  }


  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.dismissalForm.valid){
      this.saving = true;
      if (this.data){
        this.studRegistrationService.putGlobal(this.data.id, this.dismissalForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Class edited successfully !', 'Success');
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
              if (v.propertyPath === 'name'){
                this.dismissalForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      else {
        console.log(this.dismissalForm.value);
        this.studRegistrationService.postDismissal(this.dismissalForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Dismissal created successfully !', 'Success');
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
              if (v.propertyPath === 'name'){
                this.dismissalForm.get('name')?.setErrors({serverError: v.message});
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

  applyYearFilter(event: any){
    this.classesFiltered = this.classes.filter((classes: any) => classes.year['@id'] === this.yearSelected);
  }

  findAllClass(): any{
    this.schoolClassService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.classes = data['hydra:member'];
          this.classes = this.classes.map((v) => {
            v.id = v['@id'];
            return v;
          });
          this.classesFiltered = this.classes;
        },
        error => console.log(error)
    );
  }

  applyClassFilter(event: any){
    this.studregistrationsFiltered = this.studregistrations.filter((studregistrations: any) => studregistrations.classe['@id'] === this.classSelected);
  }

  findAllStudRegistration(): any{
    this.oldStudentRegistrationService.getStudoldregistrationList().subscribe((data: any) => {
          console.log(data);
          this.studregistrations = data['hydra:member'];
          console.log(data['hydra:member']);
          console.log(this.studregistrations);

          // Filter the registrations to only include those where the status is 'resigned'
          this.studregistrations = this.studregistrations.filter((e) => e.studregistration == null && e.status === 'registered').map((v) => {
            v.id = v['@id'];
            return v;
          });

          this.studregistrationsFiltered = this.studregistrations;
        },
        error => console.log(error)
    );
  }


}
