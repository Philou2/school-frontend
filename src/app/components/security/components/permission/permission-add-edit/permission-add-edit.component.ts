import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {MenuService} from '../../../services/menu.service';
import {PermissionService} from '../../../services/permission.service';
import {PermissionComponent} from '../permission.component';

@Component({
  selector: 'app-permission-add-edit',
  templateUrl: './permission-add-edit.component.html',
  styleUrls: ['./permission-add-edit.component.scss']
})
export class PermissionAddEditComponent {

  permissionForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private permissionService: PermissionService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.permissionForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });

  }

  ngOnInit() {
    this.permissionForm.patchValue(this.data);
  }

  get fc(): any {
    return this.permissionForm.controls;
  }


  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.permissionForm.valid){
      this.saving = true;
      if (this.data){
        this.permissionService.updatePermission(this.data.id, this.permissionForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Permission edit with success !', 'Success');
            // this.activeModal.close();

          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {
            const errors: any[] = err.error.violations;

            errors.forEach((v) =>
            {
              if (v.propertyPath === 'name'){
                this.permissionForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      else {
        this.permissionService.addPermission(this.permissionForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Permission create with success !', 'Success');
            // this.activeModal.close();
            this.permissionForm.reset();
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {
            const errors: any[] = err.violations;
            console.log(errors);

            errors.forEach((v) =>
            {
              if (v.propertyPath === 'name'){
                this.permissionForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;
            });
          }
        });


      }

    }
  }


}
