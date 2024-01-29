import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {CycleService} from '../../../../services/configuration/cycle.service';
import {MinistryService } from 'src/app/components/setting/services/institution/ministry.service';

@Component({
  selector: 'app-cycle-add-edit',
  templateUrl: './cycle-add-edit.component.html',
  styleUrls: ['./cycle-add-edit.component.scss']
})
export class CycleAddEditComponent {

  cycleForm: FormGroup;
  ministries: any[] = [];
  ministrySelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private cycleService: CycleService,
              private ministryService: MinistryService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.cycleForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      position: '',
      ministry: ['', [Validators.required]],
    });

  }

  ngOnInit() {
    this.cycleForm.patchValue(this.data);
    if (this.data){
      this.ministrySelected = this.data.ministry['@id'];
    }
    this.findAllMinistry();
  }

  get fc(): any {
    return this.cycleForm.controls;
  }


  onFormSubmit(): any {
    console.log('submit');
    if (this.cycleForm.value.position === '') {
      this.cycleForm.value.position = 0;
    }
    console.log(this.cycleForm.valid);
    this.isSubmitted = true;
    if (this.cycleForm.valid){
      this.saving = true;
      if (this.data){
        this.cycleService.put(this.data.id, this.cycleForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Cycle edited with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {
            console.log(err);
            const errors: any[] = err.violations;

            errors.forEach((v) =>
            {
              if (v.propertyPath === 'code'){
                this.cycleForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.cycleForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      else {
        this.cycleService.post(this.cycleForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Cycle created with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {
            console.log(err);
            const errors: any[] = err.violations;
            console.log(err.violations);

            errors.forEach((v) =>
            {
              if (v.propertyPath === 'code'){
                this.cycleForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.cycleForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;
            });
          }
        });


      }

    }
  }

  findAllMinistry(): any{
    this.ministryService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.ministries = data['hydra:member'];
          this.ministries = this.ministries.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }


}
