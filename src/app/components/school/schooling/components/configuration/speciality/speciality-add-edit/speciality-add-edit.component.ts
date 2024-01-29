import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {SpecialityService} from '../../../../services/configuration/speciality.service';
import { ProgramService } from '../../../../services/configuration/program.service';
import { CycleService } from '../../../../services/configuration/cycle.service';
import { LevelService } from '../../../../services/configuration/level.service';

@Component({
  selector: 'app-speciality-add-edit',
  templateUrl: './speciality-add-edit.component.html',
  styleUrls: ['./speciality-add-edit.component.scss']
})
export class SpecialityAddEditComponent {

  specialityForm: FormGroup;
  programs: any[] = [];
  cycles: any[] = [];
  minimumLevels: any[] = [];
  maximumLevels: any[] = [];
  programSelected: number | undefined;
  cycleSelected: number | undefined;
  minimumLevelSelected: number | undefined;
  maximumLevelSelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private specialityService: SpecialityService,
              private programService: ProgramService,
              private cycleService: CycleService,
              private levelService: LevelService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.specialityForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      program: '',
      cycle: ['', [Validators.required]],
      maximumLevel: ['', [Validators.required]],
      minimumLevel: ['', [Validators.required]],
    });

  }

  ngOnInit() {
    this.specialityForm.patchValue(this.data);
    if (this.data){
      this.programSelected = this.data.program['@id'];
      this.cycleSelected = this.data.cycle['@id'];
      this.maximumLevelSelected = this.data.maximumLevel['@id'];
      this.minimumLevelSelected = this.data.minimumLevel['@id'];
    }
    this.findAllProgram();
    this.findAllCycle();
    this.findAllMaximumLevel();
    this.findAllMinimumLevel();
  }

  get fc(): any {
    return this.specialityForm.controls;
  }


  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.specialityForm.valid){
      this.saving = true;
      if (this.data){
        this.specialityService.put(this.data.id, this.specialityForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Speciality edited with success !', 'Success');
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
              if (v.propertyPath === 'code'){
                this.specialityForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.specialityForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      else {
        this.specialityService.post(this.specialityForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Speciality created with success !', 'Success');
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
              if (v.propertyPath === 'code'){
                this.specialityForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.specialityForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;
            });
          }
        });


      }

    }
  }

  findAllProgram(): any{
    this.programService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.programs = data['hydra:member'];
          this.programs = this.programs.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

  filterMaximumLevels(): any {
    const minLevelIndex = this.minimumLevels.findIndex(level => level.id === this.minimumLevelSelected);
    this.maximumLevels = this.maximumLevels.filter((level, index) => index > minLevelIndex);
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

  findAllMinimumLevel(): any{
    this.levelService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.minimumLevels = data['hydra:member'];
          this.minimumLevels = this.minimumLevels.map((v) => {
            v.id = v['@id'];
            return v;
          });
          this.filterMaximumLevels();
        },
        error => console.log(error)
    );
  }

  findAllMaximumLevel(): any{
    this.levelService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.maximumLevels = data['hydra:member'];
          this.maximumLevels = this.maximumLevels.map((v) => {
            v.id = v['@id'];
            return v;
          });
          this.filterMaximumLevels();
        },
        error => console.log(error)
    );
  }


}
