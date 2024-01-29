import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {SchoolYearService} from 'src/app/components/school/schooling/services/configuration/school-year.service';
import {CycleService} from 'src/app/components/school/schooling/services/configuration/cycle.service';
import {CycleYearService} from '../../../../services/cycle-year.service';

@Component({
  selector: 'app-cycle-year-add-edit',
  templateUrl: './cycle-year-add-edit.component.html',
  styleUrls: ['./cycle-year-add-edit.component.scss']
})
export class CycleYearAddEditComponent {

  cycleYearForm: FormGroup;
  years: any[] = [];
  cycles: any[] = [];
  yearSelected: number | undefined;
  cycleSelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private cycleYearService: CycleYearService,
              private cycleService: CycleService,
              private schoolYearService: SchoolYearService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.cycleYearForm = this.fb.group({
      year: ['', [Validators.required]],
      cycle: ['', [Validators.required]],
      minannualquota: '',
      maxannualquota: '',
      minmonthlyquota: '',
      maxmonthlyquota: '',
      minweeklyquota: '',
      maxweeklyquota: '',

    });

  }

  ngOnInit() {
    this.cycleYearForm.patchValue(this.data);
    if (this.data){
      this.yearSelected = this.data.year['@id'];
      this.cycleSelected = this.data.cycle['@id'];
    }
    this.findAllYear();
    this.findAllCycle();
  }

  get fc(): any {
    return this.cycleYearForm.controls;
  }


  onFormSubmit(): any {
  if (this.cycleYearForm.value.minannualquota === '') {
      this.cycleYearForm.patchValue({minannualquota: 0});
  }
  if (this.cycleYearForm.value.maxannualquota === '') {
      this.cycleYearForm.patchValue({maxannualquota: 0});
  }
  if (this.cycleYearForm.value.minmonthlyquota === '') {
      this.cycleYearForm.patchValue({minmonthlyquota: 0});
  }
  if (this.cycleYearForm.value.maxmonthlyquota === '') {
      this.cycleYearForm.patchValue({maxmonthlyquota: 0});
  }
  if (this.cycleYearForm.value.minweeklyquota === '') {
      this.cycleYearForm.patchValue({minweeklyquota: 0});
  }
  if (this.cycleYearForm.value.maxweeklyquota === '') {
      this.cycleYearForm.patchValue({maxweeklyquota: 0});
  }
  this.isSubmitted = true;
  if (this.cycleYearForm.valid){
      this.saving = true;
      if (this.data){
        this.cycleYearService.put(this.data.id, this.cycleYearForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Cycle Year edited successfully !', 'Success');
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
                this.cycleYearForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      else {
        this.cycleYearService.post(this.cycleYearForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Cycle Year created successfully !', 'Success');
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
                this.cycleYearForm.get('name')?.setErrors({serverError: v.message});
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

  findAllCycle(): any{
    this.cycleService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.cycles = data['hydra:member'];
          this.cycles = this.cycles.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }


}
