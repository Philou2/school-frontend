import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {MenuService} from '../../../services/menu.service';
import {ModuleService} from '../../../services/module.service';

@Component({
  selector: 'app-menu-add',
  templateUrl: './menu-add.component.html',
  styleUrls: ['./menu-add.component.scss']
})
export class MenuAddComponent implements OnInit{

  menuForm: FormGroup;
  modules: any[] = [];
  childrens: any[] = [];
  childrensFiltered: any[] = [];

  loading = 'Loading...';

  public types: any[] = [
    {id: 1, name: 'link'},
    {id: 2, name: 'sub'}
  ];
  moduleSelected: number | undefined;
  categorySelected: number | undefined;
  childrenSelected: number | undefined;
  saving = false;
  savingAndNew = false;
  status = false;
  childExist = '';

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
    console.log(this.menuForm);
    this.menuForm.patchValue(this.data);
    if (this.data){
      this.moduleSelected = this.data.module['@id'];
      this.childrenSelected = this.data.children['@id'];
      this.categorySelected = this.data.category.id;
    }
    this.findAllModule();
    this.findAllMenu();
    // this.findAllType();

    console.log(this.status);
  }

  get fc(): any {
    return this.menuForm.controls;
  }

  changeVal(value: any): void{
    this.val = value;
    console.log(this.val);
  }

  checkType(event: any): void {
    console.log(event);
    const categoryName = event['name'];
    if (categoryName === 'link'){
      this.status = false;
    }else {
      this.menuForm.get('path').reset();
      this.menuForm.get('children').reset();
      this.childExist = '';
      this.status = true;
    }

    // this.menuForm.get('type').setValue(event['name']);
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
      console.log(this.menuForm.value);

      if (this.menuForm.get('positionSingle').value === ''){
        this.menuForm.get('positionSingle').setValue(null);
      }

      this.menuService.addMenu(this.menuForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Menu create with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {
            console.log(err);
            const errors: any[] = err.violations;

            errors.forEach((v) =>
            {
              if (v.propertyPath === 'type'){
                this.menuForm.get('category')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'name'){
                this.menuForm.get('name')?.setErrors({serverError: v.message});
              }

              this.saving = false;
            });

            // this.menuForm.get('name')?.setErrors({serverError: err['hydra:description']});
            // this.saving = false;

          }
        });

    }
  }

  findAllModule(): any{
    this.moduleService.getModuleList().subscribe((data: any) => {
          this.modules = data['hydra:member'];
          this.modules = this.modules.map((v) => {
            v.id = v['@id'];
            console.log(v['@id']);
            return v;
          });
        },
        error => console.log(error)
    );
  }

  applyModuleFilter(event: any): void{
    console.log('BJR');
    this.childrensFiltered = this.childrens.filter((childrens: any) => childrens.module['@id'] === this.moduleSelected);
  }


  findAllMenu(): any{
    this.menuService.getMenuList().subscribe((data: any) => {
          this.childrens = data['hydra:member'];
          this.childrens = this.childrens.map((v) => {
            v.id = v['@id'];
            console.log(v['@id']);
            return v;
          });
        },
        error => console.log(error)
    );
  }


}
