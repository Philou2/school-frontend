import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {OptionService} from '../../../../services/configuration/option.service';
import {SpecialityService} from '../../../../services/configuration/speciality.service';
import {LevelService} from '../../../../services/configuration/level.service';

@Component({
  selector: 'app-option-add-edit',
  templateUrl: './option-add-edit.component.html',
  styleUrls: ['./option-add-edit.component.scss']
})
export class OptionAddEditComponent {

  optionForm: FormGroup;
  specialities: any[] = [];
  levels: any[] = [];
  specialitySelected: number | undefined;
  levelSelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private optionService: OptionService,
              private specialityService: SpecialityService,
              private levelService: LevelService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.optionForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(2)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      speciality: '',
      level: ['', [Validators.required]],
    });

  }

  ngOnInit() {
    this.optionForm.patchValue(this.data);
    if (this.data){
      this.specialitySelected = this.data.speciality['@id'];
      this.levelSelected = this.data.level['@id'];
    }
    this.findAllSpeciality();
    this.findAllLevel();
  }

  get fc(): any {
    return this.optionForm.controls;
  }


  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.optionForm.valid){
      this.saving = true;
      if (this.data){
        this.optionService.put(this.data.id, this.optionForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Option edited with success !', 'Success');
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
                this.optionForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.optionForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      else {
        this.optionService.post(this.optionForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Option created with success !', 'Success');
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
                this.optionForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.optionForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;
            });
          }
        });


      }

    }
  }

  findAllSpeciality(): any{
    this.specialityService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.specialities = data['hydra:member'];
          this.specialities = this.specialities.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

  findAllLevel(): any{
    this.levelService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.levels = data['hydra:member'];
          this.levels = this.levels.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }


}
