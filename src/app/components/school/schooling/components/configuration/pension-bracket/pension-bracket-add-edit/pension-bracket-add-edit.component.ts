import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {PensionBracketService} from '../../../../services/configuration/pension-bracket.service';

@Component({
  selector: 'app-pension-bracket-add-edit',
  templateUrl: './pension-bracket-add-edit.component.html',
  styleUrls: ['./pension-bracket-add-edit.component.scss']
})
export class PensionBracketAddEditComponent {

  pensionBracketForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private pensionBracketService: PensionBracketService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.pensionBracketForm = this.fb.group({
      number: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],

    });
  }

  ngOnInit() {
    this.pensionBracketForm.patchValue(this.data);
  }
  get fc(): any {
    return this.pensionBracketForm.controls;
  }



  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.pensionBracketForm.valid){
      this.saving = true;
      if (this.data){
        this.pensionBracketService.put(this.data.id, this.pensionBracketForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Pension bracket edited with success !', 'Success');
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
              if (v.propertyPath === 'number'){
                this.saving = false;
                this.pensionBracketForm.get('number')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.pensionBracketForm.get('name')?.setErrors({serverError: v.message});
              }


            });
          }
        });
      }
      else {
        this.pensionBracketService.post(this.pensionBracketForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('pension bracket created with success !', 'Success');
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
              if (v.propertyPath === 'number'){
                this.saving = false;
                this.pensionBracketForm.get('number')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.pensionBracketForm.get('name')?.setErrors({serverError: v.message});
              }

            });
          }
        });


      }

    }
  }


}
