import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {SchoolYearService} from 'src/app/components/school/schooling/services/configuration/school-year.service';
import {SchoolClassService} from 'src/app/components/school/schooling/services/configuration/school-class.service';
import {OptionService} from 'src/app/components/school/schooling/services/configuration/option.service';
import {StudRegistrationService} from '../../../../services/registration/stud-registration.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'change-of-option-add-edit',
  templateUrl: './change-of-option-add-edit.component.html',
  styleUrls: ['./change-of-option-add-edit.component.scss']
})
export class ChangeOfOptionAddEditComponent {

  changeOptionForm: FormGroup;
  years: any[] = [];
  classes: any[] = [];
  options: any[] = [];

  oldOptionSelected: any;
  newOptionSelected: any;


  yearSelected: number | undefined;
  classSelected: number | undefined;
  optionSelected: number | undefined;
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
              private optionService: OptionService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router,
              private datePipe: DatePipe
  ) {
    this.changeOptionForm = this.fb.group({
      name: '',
      year: [{value: null, disabled: true}],
      classe: [{value: null, disabled: true}],
      oldOption: [{value: null, disabled: true}],
      newOption: '',
    });

  }

  ngOnInit() {
    this.changeOptionForm.patchValue(this.data);
    if (this.data){
      console.log(this.data);
      console.log(this.data.year);
      const student = this.data.student;
      this.yearSelected = this.data.student.year ? this.data.student.year : null;
      this.classSelected = this.data.classe ? this.data.classe['@id'] : null;
      this.oldOptionSelected = this.data.options ? this.data.options['@id'] : null;
      this.changeOptionForm.get('name')?.setValue(student.name);
    }

    this.findAllYear();
    this.findAllClass();
    this.findAllOption();

  }

  get fc(): any {
    return this.changeOptionForm.controls;
  }


  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.changeOptionForm.valid){
      this.saving = true;
      if (this.data){
        const formValue = this.changeOptionForm.value;
        console.log(formValue);
        const dataToSendToBackend = {
          ...formValue,
          options: formValue.newOption,
        };
        console.log(dataToSendToBackend);
        this.studRegistrationService.putGlobal(this.data.id, dataToSendToBackend).subscribe({
          next: (val: any) => {
            this.toastr.success('Option edited successfully !', 'Success');
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
                this.changeOptionForm.get('name')?.setErrors({serverError: v.message});
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

  findAllClass(): any{
    this.schoolClassService.getCollection().subscribe((data: any) => {
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
