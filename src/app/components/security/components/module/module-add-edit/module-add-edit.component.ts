import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ModuleService} from '../../../services/module.service';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-module-add-edit',
  templateUrl: './module-add-edit.component.html',
  styleUrls: ['./module-add-edit.component.scss']
})
export class ModuleAddEditComponent implements OnInit{

  moduleForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  layoutSelected: string | undefined;

  public layouts: any[] = [
    {id: 1, name: 'Dubai'},
    {id: 2, name: 'Los Angeles'},
    {id: 3, name: 'Paris'},
    {id: 4, name: 'Tokyo'},
    {id: 5, name: 'Moscow'},
    {id: 6, name: 'Singapore'},
    {id: 7, name: 'Barcelona'},
    {id: 8, name: 'Madrid'},
    {id: 9, name: 'Rome'},
    {id: 10, name: 'Seoul'},
    {id: 11, name: 'London'},
    {id: 12, name: 'New York'},
  ];

  selectedColors: string | undefined;

  public colors: any[] = [
    {id: 1, name: 'none😑'},
    {id: 2, name: 'primary'},
    {id: 3, name: 'secondary'},
    {id: 4, name: 'warning'},
    {id: 5, name: 'success'},
  ];

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private moduleService: ModuleService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.moduleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      color: ['', [Validators.required]],
      icon: ['', [Validators.required]],
      position: ['', [Validators.required]],
      path: ['', [Validators.required]],
      layout: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.moduleForm.patchValue(this.data);
    if (this.data){
      console.log(this.data.layout);
      this.layoutSelected = this.data.layout;
      this.selectedColors = this.data.color;
    }else {
      this.layoutSelected = 'Paris';
      this.selectedColors = 'primary';
    }
  }

  get fc(): any {
    return this.moduleForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.moduleForm.valid) {
      this.saving = true;
      if (this.data) {
        this.moduleService.updateModule(this.data.id, this.moduleForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Module edit with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) => {
            const errors: any[] = err.error.violations;

            errors.forEach((v) => {
              if (v.propertyPath === this.moduleForm.get('name')) {
                this.moduleForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      } else {
        this.moduleService.addModule(this.moduleForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Module create with success !', 'Success');
            this.activeModal.close();

          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) => {
            console.log(err);
            const errors: any[] = err.error.violations;

            errors.forEach((v) => {
              if (v.propertyPath === 'name') {
                this.moduleForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;
            });
          }
        });
      }

    }
  }


}
