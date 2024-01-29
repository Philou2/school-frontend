import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {DiplomaService} from 'src/app/components/school/exam/services/configuration/diploma.service';
import {DiplomaTypeService} from 'src/app/components/setting/services/school/diploma-type.service';
import {LevelService} from 'src/app/components/school/schooling/services/configuration/level.service';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-diploma-add-edit',
  templateUrl: './diploma-add-edit.component.html',
  styleUrls: ['./diploma-add-edit.component.scss']
})
export class DiplomaAddEditComponent {

  diplomaForm: FormGroup;
  diplomaTypes: any[] = [];
  levels: any[] = [];
  diplomaTypeSelected: number | undefined;
  levelSelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private diplomaService: DiplomaService,
              private diplomaTypeService: DiplomaTypeService,
              private levelService: LevelService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.diplomaForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      diplomaType: '',
      level: '',
    });

  }

  ngOnInit() {
    this.diplomaForm.patchValue(this.data);
    if (this.data){
      this.diplomaTypeSelected = this.data.diplomaType['@id'];
      this.levelSelected = this.data.level['@id'];
    }
    this.findAllDiplomaType();
    this.findAllLevel();
  }

  get fc(): any {
    return this.diplomaForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.diplomaForm.valid) {
      this.saving = true;
      if (this.data) {
        this.diplomaService.put(this.data.id, this.diplomaForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Diploma edited successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              if (v.propertyPath === this.diplomaForm.get('code')) {
                this.diplomaForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === this.diplomaForm.get('name')) {
                this.diplomaForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      } else {
        this.diplomaService.post(this.diplomaForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Diploma created successfully !', 'Success');
            this.activeModal.close();

          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) => {
            console.log(err);
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              if (v.propertyPath === 'code') {
                this.diplomaForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name') {
                this.diplomaForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;
            });
          }
        });
      }

    }
  }

  findAllDiplomaType(): any{
    this.diplomaTypeService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.diplomaTypes = data['hydra:member'];
          this.diplomaTypes = this.diplomaTypes.map((v) => {
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
