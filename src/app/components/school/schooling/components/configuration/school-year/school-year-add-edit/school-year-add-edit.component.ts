import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {SchoolYearService} from '../../../../services/configuration/school-year.service';

@Component({
  selector: 'app-school-year-add-edit',
  templateUrl: './school-year-add-edit.component.html',
  styleUrls: ['./school-year-add-edit.component.scss']
})
export class SchoolYearAddEditComponent implements OnInit{

  schoolYearForm: FormGroup;
  lastYearList: any[] = [];
  lastYearListSelect: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private schoolyearService: SchoolYearService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.schoolYearForm = this.fb.group({
      year: ['', [Validators.required]],
      startAt: ['', [Validators.required]],
      endAt: ['', [Validators.required]],
      lastYear: ['', [Validators.required]],
      objective: '',
    });

  }

  ngOnInit(): void {
    this.schoolYearForm.patchValue(this.data);
    this.getLastYearList();

    if (!this.data){
      this.getLastYearList();
    }
    else {
      this.lastYearListSelect = this.data.lastYear['@id'];
    }
  }

  get fc(): any {
    return this.schoolYearForm.controls;
  }


  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.schoolYearForm.valid){
      this.saving = true;
      if (this.data){
        this.schoolyearService.put(this.data.id, this.schoolYearForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Year edited with success !', 'Success');
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
              if (v.propertyPath === 'year'){
                this.schoolYearForm.get('year')?.setErrors({serverError: v.message});
              }

              this.saving = false;

            });
          }
        });
      }
      else {
        this.schoolyearService.post(this.schoolYearForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Year created with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {

            console.log(err);
            if (err['hydra:title'] && err['hydra:description']){
              this.toastr.error(err['hydra:description'], err['hydra:title']);
            }
            else {
              const errors: any[] = err.violations;

              errors.forEach((v) =>
              {
                if (v.propertyPath === 'year'){
                  this.schoolYearForm.get('year')?.setErrors({serverError: v.message});
                }

              });
            }

            this.saving = false;
          }
        });


      }

    }
  }

  getLastYearList(): void{
    this.schoolyearService.getCollection().subscribe((data: any) => {
          this.lastYearList = data['hydra:member'];
          this.lastYearList = this.lastYearList.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }


}
