import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {LevelService} from '../../../../services/configuration/level.service';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-level-add-edit',
  templateUrl: './level-add-edit.component.html',
  styleUrls: ['./level-add-edit.component.scss']
})
export class LevelAddEditComponent {

  levelForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private levelService: LevelService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.levelForm = this.fb.group({
      number: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(1)]],
    });

  }

  ngOnInit(): void {
    this.levelForm.patchValue(this.data);
  }

  get fc(): any {
    return this.levelForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.levelForm.valid) {
      this.saving = true;
      if (this.data) {
        this.levelService.put(this.data.id, this.levelForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Level edit with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              if (v.propertyPath === this.levelForm.get('name')) {
                this.levelForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      } else {
        this.levelService.post(this.levelForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Level create with success !', 'Success');
            this.activeModal.close();

          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) => {
            console.log(err)
            const errors: any[] = err.violations;

            errors.forEach((v) => {
               if (v.propertyPath === 'name') {
                this.levelForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;
            });
          }
        });
      }

    }
  }


}
