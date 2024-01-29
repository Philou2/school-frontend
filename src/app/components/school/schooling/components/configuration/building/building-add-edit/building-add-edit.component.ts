import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {BuildingService} from '../../../../services/configuration/building.service';
import { CampusService } from '../../../../services/configuration/campus.service';

@Component({
  selector: 'app-building-add-edit',
  templateUrl: './building-add-edit.component.html',
  styleUrls: ['./building-add-edit.component.scss']
})
export class BuildingAddEditComponent {

  buildingForm: FormGroup;
  campuses: any[] = [];
  campusSelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private buildingService: BuildingService,
              private campusService: CampusService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.buildingForm = this.fb.group({
      name: ['', [Validators.required]],
      campus: ['', [Validators.required]],


    });

  }

  ngOnInit() {
    this.buildingForm.patchValue(this.data);
    if (this.data){
      this.campusSelected = this.data.campus['@id'];
    }
    this.findAllCampus();
  }

  get fc(): any {
    return this.buildingForm.controls;
  }


  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.buildingForm.valid){
      this.saving = true;
      if (this.data){
        this.buildingService.put(this.data.id, this.buildingForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Building edited with success !', 'Success');
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
                this.buildingForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      else {
        this.buildingService.post(this.buildingForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Building created with success !', 'Success');
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
                this.buildingForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;
            });
          }
        });


      }

    }
  }

  findAllCampus(): any{
    this.campusService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.campuses = data['hydra:member'];
          this.campuses = this.campuses.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }


}
