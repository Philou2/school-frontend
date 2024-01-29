import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {TuitionService} from 'src/app/components/school/schooling/services/configuration/tuition.service';
import {CostAreaService} from '../../../services/configuration/cost-area';
import {PensionSchemeService} from '../../../services/configuration/pension-scheme.service';
import {SchoolService} from '../../../services/configuration/school.service';
import {CycleService} from '../../../services/configuration/cycle.service';
import {SpecialityService} from '../../../services/configuration/speciality.service';
import {LevelService} from '../../../services/configuration/level.service';
import {TrainingTypeService} from '../../../services/configuration/training-type.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tuition-add',
  templateUrl: './tuition-add.component.html',
  styleUrls: ['./tuition-add.component.scss']
})
export class TuitionAddComponent {

  tuitionForm: FormGroup;
  costAreas: any[] = [];
  pensionSchemes: any[] = [];
  schools: any[] = [];
  cycles: any[] = [];
  specialities: any[] = [];
  specialitiesFiltered: any[] = [];
  levels: any[] = [];
  levelsFiltered: any[] = [];
  trainingTypes: any[] = [];
  costAreaSelected: number | undefined;
  pensionSchemeSelected: number | undefined;
  schoolSelected: number | undefined;
  cycleSelected: number | undefined;
  specialitySelected: number | undefined;
  levelSelected: number | undefined;
  trainingTypeSelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private tuitionService: TuitionService,
              private costAreaService: CostAreaService,
              private pensionSchemeService: PensionSchemeService,
              private schoolService: SchoolService,
              private cycleService: CycleService,
              private specialityService: SpecialityService,
              private levelService: LevelService,
              private trainingTypeService: TrainingTypeService,
              private translate: TranslateService,
              private toastr: ToastrService,
              private router: Router,
              public route: Router
  ) {
    this.tuitionForm = this.fb.group({
      costArea: ['', [Validators.required]],
      pensionScheme: '',
      school: '',
      cycle: '',
      speciality: '',
      level: '',
      trainingType: '',
      registrationFees: ['', [Validators.required]],
      reRegistrationFees: ['', [Validators.required]],
      paymentDate: ['', [Validators.required]],

    });

    console.log(this.data);

  }

    ngOnInit() {
      console.log(this.data);

      if (!this.data){
            this.findAllCostArea();
            this.findAllPensionScheme();
            this.findAllSchool();
            this.findAllCycle();
            this.findAllSpeciality();
            this.findAllLevel();
            this.findAllTrainingType();
        }

      this.tuitionService.currentTuition.subscribe(res => {
          if (res) {
              console.log(res);
              this.data = res;
              this.tuitionForm.patchValue(res);
              this.costAreaSelected = res.costArea['@id'];
              this.pensionSchemeSelected = res.pensionScheme['@id'];
              this.schoolSelected = res.school['@id'];
              this.cycleSelected = res.cycle['@id'];
              this.specialitySelected = res.speciality['@id'];
              this.levelSelected = res.level['@id'];
              this.trainingTypeSelected = res.trainingType['@id'];
          }
      });

    }

  get fc(): any {
    return this.tuitionForm.controls;
  }

    close() {
        this.tuitionForm.reset();
        this.tuitionService.changeTuition(null);
    }



  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.tuitionForm.valid){
      this.saving = true;
      if (this.data){
          this.tuitionService.put(this.data.id, this.tuitionForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Tuition edited with success !', 'Success');
            this.router.navigate(['/school/schooling/tuition']);
            this.tuitionForm.reset();
            this.tuitionService.changeTuition(null);
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {
              const errors: any[] = err.violations;

              errors.forEach((v) =>
              {
                  if (v.propertyPath === 'costArea'){
                      this.tuitionForm.get('costArea')?.setErrors({serverError: v.message});
                  }
                  if (v.propertyPath === 'paymentDate'){
                      this.tuitionForm.get('paymentDate')?.setErrors({serverError: v.message});
                  }
                  if (v.propertyPath === 'registrationFees'){
                      this.tuitionForm.get('registrationFees')?.setErrors({serverError: v.message});
                  }
                  if (v.propertyPath === 'reRegistrationFees'){
                      this.tuitionForm.get('reRegistrationFees')?.setErrors({serverError: v.message});
                  }

              });
          }
          });
      }
      else {
          this.tuitionService.post(this.tuitionForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Tuition created with success !', 'Success');
            this.router.navigate(['/school/schooling/tuition']);
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
                  if (v.propertyPath === 'costArea'){
                      this.tuitionForm.get('costArea')?.setErrors({serverError: v.message});
                  }
                  if (v.propertyPath === 'paymentDate'){
                      this.tuitionForm.get('paymentDate')?.setErrors({serverError: v.message});
                  }
                  if (v.propertyPath === 'registrationFees'){
                      this.tuitionForm.get('registrationFees')?.setErrors({serverError: v.message});
                  }
                  if (v.propertyPath === 'reRegistrationFees'){
                      this.tuitionForm.get('reRegistrationFees')?.setErrors({serverError: v.message});
                  }
              });
          }
        });
      }
    }
  }



  findAllCostArea(): any{
    this.costAreaService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.costAreas = data['hydra:member'];
          this.costAreas = this.costAreas.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

  findAllPensionScheme(): any{
    this.pensionSchemeService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.pensionSchemes = data['hydra:member'];
          this.pensionSchemes = this.pensionSchemes.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

  findAllSchool(): any{
    this.schoolService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.schools = data['hydra:member'];
          this.schools = this.schools.map((v) => {
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

    applyCycleFilter(event: any){
        console.log('BJR');
        this.specialitiesFiltered = this.specialities.filter((specialities: any) => specialities.cycle['@id'] === this.cycleSelected);
    }


  findAllSpeciality(): any{
    this.specialityService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.specialities = data['hydra:member'];
          this.specialities = this.specialities.map((v) => {
            v.id = v['@id'];
            return v;
          });
          this.specialitiesFiltered = this.specialities;
        },
        error => console.log(error)
    );
  }
    applySpecialityFilter(event: any){
        console.log('BJR');
        const specialityId = event;
        const speciality = this.specialities.find( (specialities: any) => specialities === specialityId);
        console.log(speciality);
        console.log(specialityId);
        const minimumLevel = speciality.minimumLevel;
        const maximumLevel = speciality.maximumLevel;
        console.log(minimumLevel['@id']);
        console.log(maximumLevel['@id']);
        console.log('BJR');
        this.levelsFiltered = this.levels.filter((level: any) => level.id === minimumLevel['@id'] || level.id === maximumLevel['@id']);
    }


  findAllLevel(): any{
    this.levelService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.levels = data['hydra:member'];
          this.levels = this.levels.map((v) => {
            v.id = v['@id'];
            return v;
          });
          this.levelsFiltered = this.levels;
        },
        error => console.log(error)
    );
  }

  findAllTrainingType(): any{
    this.trainingTypeService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.trainingTypes = data['hydra:member'];
          this.trainingTypes = this.trainingTypes.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }


}
