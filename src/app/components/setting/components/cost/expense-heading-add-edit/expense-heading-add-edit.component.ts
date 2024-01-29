import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {ExpenseHeadingService} from '../../../services/cost/expense-heading';

@Component({
  selector: 'app-expense-heading-add-edit',
  templateUrl: './expense-heading-add-edit.component.html',
  styleUrls: ['./expense-heading-add-edit.component.scss']
})
export class ExpenseHeadingAddEditComponent {

  expenseHeadingForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private expenseHeadingService: ExpenseHeadingService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.expenseHeadingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.expenseHeadingForm.patchValue(this.data);
  }

  get fc(): any {
    return this.expenseHeadingForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.expenseHeadingForm.valid) {
      this.saving = true;
      if (this.data) {
        this.expenseHeadingService.put(this.data.id, this.expenseHeadingForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Expense Heading edited successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              if (v.propertyPath === this.expenseHeadingForm.get('name')) {
                this.expenseHeadingForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      } else {
        this.expenseHeadingService.post(this.expenseHeadingForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('ExpenseHeading created successfully !', 'Success');
            this.activeModal.close();

          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) => {
            console.log(err)
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              this.saving = false;
               if (v.propertyPath === 'name') {
                this.expenseHeadingForm.get('name')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }


}
