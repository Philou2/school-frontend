import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs';
import {InstitutionService} from '../../../services/institution.service';
import {BranchService} from '../../../services/branch.service';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.scss']
})
export class BranchEditComponent implements OnInit{

  branchForm: FormGroup;
  institutions: any[] = [];
  institutionSelected: number | undefined;
  saving = false;
  isSubmitted = false;

  public data: any;
  id: number;

  loadForm = true;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private branchService: BranchService,
              private institutionService: InstitutionService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public route: Router,
              public router: ActivatedRoute
  ) {
    this.branchForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email]],
      phone: ['', [Validators.pattern(/^((?!672)\d{9}|672\d{6})$/)]],
      address: [''],
      pobox: [''],
      website: [''],
      taxPayerNumber: [''],
      businessNumber: [''],
      nsifEmployerMatriculeNo: [''],
      institution: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    // console.log(this.data.institution.name);
    this.id = this.router.snapshot.params.id;
    this.branchForm.patchValue(this.data);
    this.findAllManagerTypes();

    if (this.id){
      this.branchService.getBranchId(this.id)
          .pipe(first())
          .subscribe(x => {
            console.log(x);
            this.branchForm.patchValue(x);
            this.institutionSelected = x.institution ? x.institution['@id'] : null;

            this.loadForm = false;

          } );
    }

  }

  get fc(): any {
    return this.branchForm.controls;
  }


  onFormSubmit(): void{
    this.isSubmitted = true;
    // if (this.userForm.valid && this.fileHad && this.fileHad.name){
    if (this.branchForm.valid){
      this.saving = true;
      if (this.id){
        console.log('hello maoll');

        this.branchService.updateBranch(this.id, this.branchForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Branch edit with success !', 'Success');
            this.route.navigate(['/security/branch']);

          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {
            const errors: any[] = err;
            console.log(errors);

            if (errors){
              errors.forEach((v) => {
                if (v.propertyPath === 'code') {
                  this.branchForm.get('code')?.setErrors({serverError: v.message});
                }
                if (v.propertyPath === 'name') {
                  this.branchForm.get('name')?.setErrors({serverError: v.message});
                }
                if (v.propertyPath === 'phone') {
                  this.branchForm.get('phone')?.setErrors({serverError: v.message});
                }
                if (v.propertyPath === 'email') {
                  this.branchForm.get('email')?.setErrors({serverError: v.message});
                }

                this.saving = false;
              });
            }
            else {

              this.toastr.error(err['hydra:description'], 'Error');
              this.saving = false;
            }

          }
        });
      }


    }
  }

  findAllManagerTypes(): any{
    this.institutionService.getInstitutionList().subscribe((data: any) => {
          console.log(data);
          this.institutions = data['hydra:member'];
          if (this.institutions){
            this.institutions = this.institutions.map((v) => {
              v.id = v['@id'];
              return v;
            });
          }

        },
        error => console.log(error)
    );
  }


}
