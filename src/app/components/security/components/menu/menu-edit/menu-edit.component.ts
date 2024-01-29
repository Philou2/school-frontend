import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {MenuService} from '../../../services/menu.service';
import {ModuleService} from '../../../services/module.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent implements OnInit{

  menuForm: FormGroup;
  modules: any[] = [];
  childrens: any[] = [];

  public types: any[] = [
    {id: 1, name: 'link'},
    {id: 2, name: 'sub'}
  ];
  moduleSelected: number | undefined;
  typeSelected: string | undefined;
  childrenSelected: number | undefined;
  saving = false;
  savingAndNew = false;
  status = false;
  childExist = '';

  waitingModule = false;
  waitingChildren = false;
  loading = 'Loading...';


  public data: any;

  isSubmitted = false;
  val: any | null;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private menuService: MenuService,
              private moduleService: ModuleService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.menuForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      path: [''],
      icon: [''],
      type: ['', [Validators.required]],
      module: ['', [Validators.required]],
      children: [''],
      positionSingle: [''],
    });

  }

  ngOnInit(): void {
    this.waitingModule = true;
    this.waitingChildren = true;
    this.menuForm.patchValue(this.data);
    console.log(this.data);

    console.log(this.data);
    this.moduleSelected = this.data.module['@id'];
    this.childrenSelected = this.data.children ? this.data.children['@id'] : null;
    this.typeSelected = this.data.type;

    this.findAllModule();
    // this.findAllMenu();

    if (this.typeSelected === 'sub'){
      // this.childExist = '';
      this.status = true;
    }

    if (this.typeSelected === 'link' && this.childrenSelected){
      console.log(this.childrenSelected);
      this.childExist = this.typeSelected;
    }

    console.log(this.typeSelected);
    console.log(this.status);


  }

  get fc(): any {
    return this.menuForm.controls;
  }

  checkChildren(event: string): void {
    if (event){
      this.menuForm.get('icon').reset();
      this.childExist = event;
    }else {
      this.childExist = '';
    }
    console.log(event);
  }

  onFormSubmit(): void{
    this.isSubmitted = true;
    if (this.menuForm.valid){
      this.saving = true;
      if (this.data){

        if (this.menuForm.get('positionSingle').value === ''){
          this.menuForm.get('positionSingle').setValue(null);
        }

        this.menuService.updateMenu(this.data.id, this.menuForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Menu edit with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
            this.saving = false;
            this.savingAndNew = false;
          },
          error: (err: any) =>
          {
            console.log(err);
            // const errors: any[] = err.error.violations;
            const errors: any[] = err.violations;

            errors.forEach((v) =>
            {
              if (v.propertyPath === 'module'){
                this.menuForm.get('module')?.setErrors({serverError: v.message});
              }
              console.log(v.message);
              if (v.propertyPath === 'name'){
                this.menuForm.get('name')?.setErrors({serverError: v.message});
              }

              this.saving = false;
              this.savingAndNew = false;

            });
          }
        });
      }
      // else {
      //   this.saving = true;
      //   console.log(this.menuForm.value);
      //   this.menuService.addMenu(this.menuForm.value).subscribe({
      //       next: (val: any) => {
      //         this.toastr.success('Menu create with success !', 'Success');
      //         this.activeModal.close();
      //       },
      //       complete: () => {
      //         this.saving = false;
      //       },
      //       error: (err: any) =>
      //       {
      //         const errors: any[] = err.violations;
      //         console.log(errors);
      //
      //         errors.forEach((v) =>
      //         {
      //           if (v.propertyPath === 'module'){
      //             this.menuForm.get('module')?.setErrors({serverError: v.message});
      //           }
      //           this.saving = false;
      //         });
      //       }
      //     });
      //
      //
      // }

    }
  }

  // findAllModule(): any{
  //   this.moduleService.getModuleList().subscribe((data: any) => {
  //         this.modules = data['hydra:member'];
  //         this.modules = this.modules.map((v) => {
  //           v.id = v['@id'];
  //           console.log(v['@id']);
  //           return v;
  //         });
  //         this.waitingModule = false;
  //       },
  //       error => console.log(error)
  //   );
  // }

  findAllModule() {
    this.moduleService.getModuleList().subscribe({
      next: (data: any) => {
        console.log(data['hydra:member']);
        this.modules = data['hydra:member'];
        if (this.modules){
          this.modules = this.modules.map((v) => {
            v.id = v['@id'];
            return v;
          });
          this.waitingModule = false;
        }
      },
      complete: () => this.findAllMenu(),
      error: (error: HttpErrorResponse) => {
        this.findAllMenu()
        console.log(error);
      }
    });
  }

  findAllMenu(): any{
    this.menuService.getMenuList().subscribe((data: any) => {
          this.childrens = data['hydra:member'];
          this.childrens = this.childrens.map((v) => {
            v.id = v['@id'];
            console.log(v['@id']);
            return v;
          });

          this.childrens = this.childrens.filter((childrens: any) => childrens.module['@id'] === this.moduleSelected);

          this.waitingChildren = false;

        },
        error => console.log(error)
    );
  }


}
