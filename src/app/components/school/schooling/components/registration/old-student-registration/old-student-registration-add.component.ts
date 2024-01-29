import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {OldStudentRegistrationService} from 'src/app/components/school/schooling/services/registration/old-student-registration.service';
import {StudRegistrationService} from 'src/app/components/school/schooling/services/registration/stud-registration.service';
import {SchoolYearService} from '../../../services/configuration/school-year.service';
import {SchoolClassService} from '../../../services/configuration/school-class.service';
import {RegimeService} from '../../../services/configuration/regime.service';
import {OptionService} from '../../../services/configuration/option.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-old-student-registration-add',
  templateUrl: './old-student-registration-add.component.html',
  styleUrls: ['./old-student-registration-add.component.scss']
})
export class OldStudentRegistrationAddComponent {

  oldStudentRegistrationForm: FormGroup;
  years: any[] = [];
  classes: any[] = [];
  classesFiltered: any[] = [];
  studregistrations: any[] = [];
  studregistrationsFiltered: any[] = [];
  currentyears: any[] = [];
  currentclasses: any[] = [];
  currentclassesFiltered: any[] = [];
  regimes: any[] = [];
  options: any[] = [];

  yearSelected: number | undefined;
  classSelected: number | undefined;
  studregistrationSelected: number | undefined;
  currentyearSelected: number | undefined;
  currentclassSelected: number | undefined;
  regimeSelected: number | undefined;
  optionSelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  hasSchoolMark = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private oldStudentRegistrationService: OldStudentRegistrationService,
              private studRegistrationService: StudRegistrationService,
              private schoolYearService: SchoolYearService,
              private schoolClassService: SchoolClassService,
              private regimeService: RegimeService,
              private optionService: OptionService,
              private translate: TranslateService,
              private toastr: ToastrService,
              private router: Router,
              public route: Router
  ) {
    this.oldStudentRegistrationForm = this.fb.group({
      studregistration: '',
      year: '',
      classe: '',
      currentyear: ['', [Validators.required]],
      currentclasse: ['', [Validators.required]],
      regime: ['', [Validators.required]],
      options: '',
      enrollIn: '',
    });

  }

    ngOnInit() {
      if (!this.data){
            this.findAllStudRegistration();
            this.findAllYear();
            this.findAllClass();
            this.findAllCurrentYear();
            this.findAllCurrentClass();
            this.findAllRegime();
            this.findAllOption();
        }

      this.oldStudentRegistrationService.currentOldStudentRegistration.subscribe(res => {
          if (res) {
              console.log(res);
              this.data = res;
              this.hasSchoolMark = this.data.hasSchoolMark;
              this.oldStudentRegistrationForm.patchValue(res);
              this.yearSelected = res.year['@id'];
              this.classSelected = res.classe['@id'];
              this.studregistrationSelected = res.studregistration['@id'];
              this.currentyearSelected = res.currentyear['@id'];
              this.currentclassSelected = res.currentclasse['@id'];
              this.optionSelected = res.options?.['@id'];
              this.regimeSelected = res.regime?.['@id'];
              if (this.hasSchoolMark) {
                  this.oldStudentRegistrationForm.get('currentyear')?.disable();
                  this.oldStudentRegistrationForm.get('currentclasse')?.disable();
              }
          }
      });

    }

  get fc(): any {
    return this.oldStudentRegistrationForm.controls;
  }

    close() {
        this.oldStudentRegistrationForm.reset();
        this.oldStudentRegistrationService.changeOldStudentRegistration(null);
    }

    onSelect(event: any){
        console.log(event);
        this.oldStudentRegistrationForm.get('studregistration')?.setValue(event['@id']);
        this.oldStudentRegistrationForm.get('year')?.setValue(event.student.year['@id']);
        this.oldStudentRegistrationForm.get('classe')?.setValue(event.classe['@id']);

    }



    onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.oldStudentRegistrationForm.valid){
      this.saving = true;
      if (this.data){
          const value = {...this.oldStudentRegistrationForm.value, previousClass: this.data.currentclasse.id, previousYear: this.data.currentyear.id};
          console.log(JSON.stringify(value))
          this.oldStudentRegistrationService.put(this.data.id, value).subscribe({
          next: (val: any) => {
            this.toastr.success('Old Student Registration edited with success !', 'Success');
            this.router.navigate(['/school/schooling/old-student-registration']);
            this.oldStudentRegistrationForm.reset();
            this.oldStudentRegistrationService.changeOldStudentRegistration(null);
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {

          }
        });
      }
      else {
          this.oldStudentRegistrationService.post(this.oldStudentRegistrationForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Old Student Registration created with success !', 'Success');
            this.router.navigate(['/school/schooling/old-student-registration']);
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {

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
        this.studRegistrationService.getStudregistrationId().subscribe((data: any) => {
                console.log(data);
                this.studregistrations = data['hydra:member'];
                console.log(data['hydra:member']);
                this.studregistrations = this.studregistrations.filter((e) => e.studregistration == null).map((v) => {
                    v.id = v['@id'];
                    return v;
                });
                this.studregistrationsFiltered = this.studregistrations;
            },
            error => console.log(error)
        );
    }


    findAllCurrentYear(): any{
    this.schoolYearService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.currentyears = data['hydra:member'];
          this.currentyears = this.currentyears.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

    applyCurrentYearFilter(event: any){
        this.currentclassesFiltered = this.currentclasses.filter((classes: any) => classes.year['@id'] === this.currentyearSelected);
    }



    findAllCurrentClass(): any{
    this.schoolClassService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.currentclasses = data['hydra:member'];
          this.currentclasses = this.currentclasses.map((v) => {
            v.id = v['@id'];
            return v;
          });
          this.currentclassesFiltered = this.currentclasses;

        },
        error => console.log(error)
    );
  }


    findAllRegime(): any{
    this.regimeService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.regimes = data['hydra:member'];
          this.regimes = this.regimes.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

    findAllOption(): any{
    this.optionService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.options = data['hydra:member'];
          this.options = this.options.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }


}
