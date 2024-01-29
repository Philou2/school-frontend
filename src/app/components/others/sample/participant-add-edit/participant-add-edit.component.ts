import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {ParticipantService} from '../../services/participant.service';

@Component({
  selector: 'app-participant-add-edit',
  templateUrl: './participant-add-edit.component.html',
  styleUrls: ['./participant-add-edit.component.scss']
})
export class ParticipantAddEditComponent {

  moduleForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private participantService: ParticipantService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.moduleForm = this.fb.group({
      // pay_type_code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      email: ['', [Validators.required]],
      // client: ['', [Validators.required]],
      phone_number: ['', [Validators.required, Validators.pattern(/^((?!672)\d{9}|672\d{6})$/)]],
      amount: ['', [Validators.required]],
      reference: ['', [Validators.required, Validators.minLength(3)]],
      // callback_url: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.moduleForm.patchValue(this.data);
  }

  get fc(): any {
    return this.moduleForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.moduleForm.valid) {
      this.saving = true;
      if (this.data) {
        this.participantService.updateEmployee(this.data.id, this.moduleForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Participant edit with success !', 'Success');
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
        this.participantService.addPayment(this.moduleForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Participant create with success !', 'Success');
            this.activeModal.close();

          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) => {
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
