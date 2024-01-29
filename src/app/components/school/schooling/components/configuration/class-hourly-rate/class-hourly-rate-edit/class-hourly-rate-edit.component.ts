import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import { SchoolService } from '../../../../services/configuration/school.service';
import {SchoolClassService} from '../../../../services/configuration/school-class.service';

@Component({
  selector: 'app-class-hourly-rate-edit',
  templateUrl: './class-hourly-rate-edit.component.html',
  styleUrls: ['./class-hourly-rate-edit.component.scss']
})
export class ClassHourlyRateEditComponent {

  classroomForm: FormGroup;
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
              private schoolclassService: SchoolClassService,
              private schoolService: SchoolService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.classroomForm = this.fb.group({
      school: '',
      code: ['', [Validators.required, Validators.minLength(1)]],
      simpleHourlyRate: '',
      multipleHourlyRate: '',
    });

  }

  ngOnInit() {
    this.classroomForm.patchValue(this.data);
    if (this.data){
      this.schoolSelected = this.data.school['@id'];
    }
    this.findAllSchool();
  }

  get fc(): any {
    return this.classroomForm.controls;
  }


  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.classroomForm.valid){
      this.saving = true;
      if (this.data){
        this.schoolclassService.put(this.data.id, this.classroomForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('class hourly rate edited with success !', 'Success');
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
                this.classroomForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
/*      else {
        this.schoolclassService.post(this.classroomForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Room created with success !', 'Success');
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
                this.classroomForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;
            });
          }
        });


      }*/

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




