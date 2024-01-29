import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {GuardianshipService} from '../../../../services/configuration/guardianship.service';
import { SchoolService } from '../../../../services/configuration/school.service';

@Component({
  selector: 'app-guardianship-add-edit',
  templateUrl: './guardianship-add-edit.component.html',
  styleUrls: ['./guardianship-add-edit.component.scss']
})
export class GuardianshipAddEditComponent {

  guardianshipForm: FormGroup;
  schools: any[] = [];
  schoolSelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private guardianshipService: GuardianshipService,
              private schoolService: SchoolService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.guardianshipForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(2)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: '',
      school: '',
    });

  }

  ngOnInit() {
    this.guardianshipForm.patchValue(this.data);
    if (this.data){
      this.schoolSelected = this.data.school['@id'];
    }
    this.findAllSchool();
  }

  get fc(): any {
    return this.guardianshipForm.controls;
  }


  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.guardianshipForm.valid){
      this.saving = true;
      if (this.data){
        this.guardianshipService.put(this.data.id, this.guardianshipForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Guardianship edited with success !', 'Success');
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
                this.guardianshipForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.guardianshipForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      else {
        this.guardianshipService.post(this.guardianshipForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Guardianship created with success !', 'Success');
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
                this.guardianshipForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.guardianshipForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;
            });
          }
        });


      }

    }
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


}
