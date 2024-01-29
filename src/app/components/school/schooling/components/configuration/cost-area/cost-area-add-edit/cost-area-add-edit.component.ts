import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {CostAreaService} from '../../../../services/configuration/cost-area';
import { ExpenseHeadingService } from 'src/app/components/setting/services/cost/expense-heading';


@Component({
  selector: 'app-cost-area-add-edit',
  templateUrl: './cost-area-add-edit.component.html',
  styleUrls: ['./cost-area-add-edit.component.scss']
})
export class CostAreaAddEditComponent {

  costAreaForm: FormGroup;
  expenseHeadings: any[] = [];
  expenseHeadingSelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private costAreaService: CostAreaService,
              private expenseHeadingService: ExpenseHeadingService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.costAreaForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      expenseHeading: '',
      isamountorquantity: '',
      isfornewstudent: '',
      isforoldstudent: '',
      isforrepeatingstudent: '',
      isfornonrepeatingstudent: '',
    });

  }

  ngOnInit() {
    this.costAreaForm.patchValue(this.data);
    if (this.data){
      console.log(this.data);
      this.expenseHeadingSelected = this.data.expenseHeading['@id'];

      this.costAreaForm.get('isamountorquantity')?.setValue(this.data.isamountorquantity ? '1' : '0');
      this.costAreaForm.get('isfornewstudent')?.setValue(this.data.isfornewstudent ? '1' : '0');
      this.costAreaForm.get('isforoldstudent')?.setValue(this.data.isforoldstudent ? '1' : '0');
      this.costAreaForm.get('isforrepeatingstudent')?.setValue(this.data.isforrepeatingstudent ? '1' : '0');
      this.costAreaForm.get('isfornonrepeatingstudent')?.setValue(this.data.isfornonrepeatingstudent ? '1' : '0');
    }
    this.findAllExpenseHeading();
  }

  get fc(): any {
    return this.costAreaForm.controls;
  }


  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.costAreaForm.valid){
      this.saving = true;
      if (this.data){
        console.log(this.costAreaForm.get('isshowreceipt'));
        this.costAreaForm.get('isamountorquantity')?.setValue(this.costAreaForm.get('isamountorquantity')?.value === '1');
        this.costAreaForm.get('isfornewstudent')?.setValue(this.costAreaForm.get('isfornewstudent')?.value === '1');
        this.costAreaForm.get('isforoldstudent')?.setValue(this.costAreaForm.get('isforoldstudent')?.value === '1');
        this.costAreaForm.get('isforrepeatingstudent')?.setValue(this.costAreaForm.get('isforrepeatingstudent')?.value === '1');
        this.costAreaForm.get('isfornonrepeatingstudent')?.setValue(this.costAreaForm.get('isfornonrepeatingstudent')?.value === '1');
        this.costAreaService.put(this.data.id, this.costAreaForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Cost Area edited with success !', 'Success');
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
                this.costAreaForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.costAreaForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      else {
        this.costAreaForm.get('isamountorquantity')?.setValue(this.costAreaForm.get('isamountorquantity')?.value === '1');
        this.costAreaForm.get('isfornewstudent')?.setValue(this.costAreaForm.get('isfornewstudent')?.value === '1');
        this.costAreaForm.get('isforoldstudent')?.setValue(this.costAreaForm.get('isforoldstudent')?.value === '1');
        this.costAreaForm.get('isforrepeatingstudent')?.setValue(this.costAreaForm.get('isforrepeatingstudent')?.value === '1');
        this.costAreaForm.get('isfornonrepeatingstudent')?.setValue(this.costAreaForm.get('isfornonrepeatingstudent')?.value === '1');
        this.costAreaService.post(this.costAreaForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Cost Area created with success !', 'Success');
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
                this.costAreaForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.costAreaForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;
            });
          }
        });


      }

    }
  }

  findAllExpenseHeading(): any{
    this.expenseHeadingService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.expenseHeadings = data['hydra:member'];
          this.expenseHeadings = this.expenseHeadings.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }


}
