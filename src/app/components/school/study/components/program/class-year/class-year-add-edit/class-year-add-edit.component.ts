import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {SchoolYearService} from 'src/app/components/school/schooling/services/configuration/school-year.service';
import {SchoolClassService} from 'src/app/components/school/schooling/services/configuration/school-class.service';
import {ClassYearService} from '../../../../services/class-year.service';

@Component({
  selector: 'app-class-year-add-edit',
  templateUrl: './class-year-add-edit.component.html',
  styleUrls: ['./class-year-add-edit.component.scss']
})
export class ClassYearAddEditComponent {

  classYearForm: FormGroup;
  years: any[] = [];
  classes: any[] = [];
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
              private classYearService: ClassYearService,
              private schoolClassService: SchoolClassService,
              private schoolYearService: SchoolYearService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.classYearForm = this.fb.group({
      year: ['', [Validators.required]],
      schoolClass: ['', [Validators.required]],
      minannualquota: '',
      maxannualquota: '',
      minmonthlyquota: '',
      maxmonthlyquota: '',
      minweeklyquota: '',
      maxweeklyquota: '',

    });

  }

  ngOnInit() {
    this.classYearForm.patchValue(this.data);
    if (this.data){
      this.yearSelected = this.data.year['@id'];
      this.classSelected = this.data.class['@id'];
    }
    this.findAllYear();
    this.findAllClass();
  }

  get fc(): any {
    return this.classYearForm.controls;
  }


  onFormSubmit(): any {
  if (this.classYearForm.value.minannualquota === '') {
      this.classYearForm.patchValue({minannualquota: 0});
  }
  if (this.classYearForm.value.maxannualquota === '') {
      this.classYearForm.patchValue({maxannualquota: 0});
  }
  if (this.classYearForm.value.minmonthlyquota === '') {
      this.classYearForm.patchValue({minmonthlyquota: 0});
  }
  if (this.classYearForm.value.maxmonthlyquota === '') {
      this.classYearForm.patchValue({maxmonthlyquota: 0});
  }
  if (this.classYearForm.value.minweeklyquota === '') {
      this.classYearForm.patchValue({minweeklyquota: 0});
  }
  if (this.classYearForm.value.maxweeklyquota === '') {
      this.classYearForm.patchValue({maxweeklyquota: 0});
  }
  this.isSubmitted = true;
  if (this.classYearForm.valid){
      this.saving = true;
      if (this.data){
        this.classYearService.put(this.data.id, this.classYearForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Class Year edited successfully !', 'Success');
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
                this.classYearForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      else {
        this.classYearService.post(this.classYearForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Class Year created successfully !', 'Success');
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
                this.classYearForm.get('name')?.setErrors({serverError: v.message});
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


}
