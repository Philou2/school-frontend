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
import {DatePipe} from '@angular/common';

@Component({
  selector: 'change-of-class-add-edit',
  templateUrl: './change-of-class-add-edit.component.html',
  styleUrls: ['./change-of-class-add-edit.component.scss']
})
export class ChangeOfClassAddEditComponent {

  changeClassForm: FormGroup;
  years: any[] = [];
  classes: any[] = [];
  classesFiltered: any[] = [];

  oldYearSelected: any;
  newYearSelected: any;
  oldClassSelected: any;
  newClassSelected: any;


  yearSelected: number | undefined;
  classSelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private studRegistrationService: StudRegistrationService,
              private schoolYearService: SchoolYearService,
              private schoolClassService: SchoolClassService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router,
              private datePipe: DatePipe
  ) {
    this.changeClassForm = this.fb.group({
      name: '',
      oldYear: [{value: null, disabled: true}],
      oldClasse: [{value: null, disabled: true}],
      newYear: '',
      newClasse: '',
    });

  }

  ngOnInit() {
    this.changeClassForm.patchValue(this.data);
    if (this.data){
      console.log(this.data);
      console.log(this.data.year);
      const student = this.data.student;
      this.oldYearSelected = this.data.student.year ? this.data.student.year : null;
      this.oldClassSelected = this.data.classe ? this.data.classe['@id'] : null;
      this.changeClassForm.get('name')?.setValue(student.name);
    }

    this.findAllYear();
    this.findAllClass();

  }

  get fc(): any {
    return this.changeClassForm.controls;
  }


  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.changeClassForm.valid){
      this.saving = true;
      if (this.data){
        const formValue = this.changeClassForm.value;
        console.log(formValue);
        const dataToSendToBackend = {
          ...formValue,
          year: formValue.newYear,
          classe: formValue.newClasse
        };
        console.log(dataToSendToBackend);
        this.studRegistrationService.putGlobal(this.data.id, dataToSendToBackend).subscribe({
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
                this.changeClassForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      // else {
      //   this.familyService.post(this.familyForm.value).subscribe({
      //     next: (val: any) => {
      //       this.toastr.success('Family created successfully !', 'Success');
      //       this.activeModal.close();
      //     },
      //     complete: () => {
      //       this.saving = false;
      //     },
      //     error: (err: any) =>
      //     {
      //       const errors: any[] = err.violations;
      //       console.log(err);
      //
      //       errors.forEach((v) =>
      //       {
      //         if (v.propertyPath === 'name'){
      //           this.familyForm.get('name')?.setErrors({serverError: v.message});
      //         }
      //         this.saving = false;
      //       });
      //     }
      //   });
      //
      //
      // }

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
    this.classesFiltered = this.classes.filter((classes: any) => classes.year['@id'] === this.newYearSelected);
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

}
