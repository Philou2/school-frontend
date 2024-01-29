import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
// import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuService} from '../../../services/menu.service';
import {RoleService} from '../../../services/role.service';
import {ModuleService} from '../../../services/module.service';
import {PermissionService} from '../../../services/permission.service';
import {TreeviewConfig, TreeviewItem} from '@charmedme/ngx-treeview';
import {DomUtil} from 'leaflet';
import remove = DomUtil.remove;
import {first} from 'rxjs';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit{

  roleForm: FormGroup;

  modules: any[] = [];
  menus: any[] = [];
  permissions: any[] = [];
  roles: any[] = [];

  loadForm = true;


  mymenu: any;
  moduleSelected: number | undefined;
  menuSelected: number | undefined;
  permissionSelected: number | undefined;

  load = false;
  saving = false;

  public data: any;
  id: number;

  isSubmitted = false;

  val: any | null;
  pop: any;

  moduleids: number[] = [];
  menuids: number[] = [];
  permissionids: number[] = [];
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;

  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400
  });
  items: TreeviewItem[] = [];
  value: number | undefined;


  constructor(private fb: FormBuilder,
              private roleService: RoleService,
              private moduleService: ModuleService,
              private menuService: MenuService,
              private permissionService: PermissionService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public router: ActivatedRoute,
              // public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      // permission: ['', [Validators.required]],
    });

  }

  ngOnInit(): void{
    this.id = this.router.snapshot.params.id;
    this.roleForm.patchValue(this.data);

    this.load = true;

    console.log(this.id);
    console.log(this.data);

    if (this.id){
      this.roleService.getCustomList(this.id).pipe(first()).subscribe(x => {
        // console.log(x);
        this.roles = x['hydra:member'][0].module;

        const roleName = x['hydra:member'][0].name;

        this.roleForm.get('name').setValue(roleName);

        this.load = false;
        // this.roleForm.patchValue(x['hydra:member'][0].name);
        console.log(this.roles);

        const objt: any = {};

        this.items = this.roles.map((v) => {
          objt.text = v.name;
          objt.value = v.id;
          objt.checked = v.status;
          objt.children = v.menus.map((m: any) => {


            if (m.permissions) {
              return {
                text : m.name,
                value : m.id,
                checked: m.status,
                children : m.permissions?.map((s: any) => {
                  return {
                    text: s.name,
                    value: s.id,
                    checked: s.status,
                    children: s.permissions?.map((p: any) => {
                      return {
                        text: p.name,
                        value: p.id,
                        checked: p.status,
                      };
                    })
                  };
                })
              };
            }


            if (m.submenu){
              return {
                text : m.name,
                value : m.id,
                checked: m.status,
                children : m.submenu?.map((s: any) => {
                  return {
                    text: s.name,
                    value: s.id,
                    checked: s.status,
                    children: s.permissions?.map((p: any) => {
                      return {
                        text: p.name,
                        value: p.id,
                        checked: p.status,
                      };
                    })
                  };
                })
              };
            }


          });
          return new TreeviewItem(objt);

        });

        this.loadForm = false;


      });
    }


  }

  select(item: TreeviewItem): void{
    console.log(item);
    this.value = item.value;
  }

  onSelectedChange(event: number[]): void{
    console.log(event);
  }

  changeVal(value: any): void{
    this.val = value;
    console.log(this.val);
  }

  get fc(): any {
    return this.roleForm.controls;
  }


  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.roleForm.valid){
      this.saving = true;
      if (this.id){
        console.log(this.id);

        this.pop = this.items.map((v) => {
            return {
              checked: v.checked,
              text: v.text,
              module: v.value,
              children: v.children?.map((m: TreeviewItem) => {

                return {
                  checked: m.checked,
                  text: m.text,
                  menu : m.value,
                  children : m.children?.map((s: TreeviewItem) => {

                    if (!s.children){
                      return {
                        checked: s.checked,
                        text: s.text,
                        permission: s.value
                      };
                    }
                    else {
                      return {
                        checked: s.checked,
                        text: s.text,
                        submenu: s.value,
                        children: s.children?.map((p: TreeviewItem) => {
                          return {
                            checked: p.checked,
                            text: p.text,
                            permission: p.value
                          };
                        })

                      };
                    }

                  })
                };



              })
            };

        });

        console.log(this.pop);

        this.roleService.updateRole(this.id, this.pop, this.roleForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Profile edit with success !', 'Success');
            // this.activeModal.close();
            this.route.navigate(['/security/role']);
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {
            console.log(err);
            const errors: any[] = err.error.violations;

            errors.forEach((v) =>
            {
              if (v.propertyPath === 'menu'){
                this.roleForm.get('menu')?.setErrors({serverError: v.message});
              }

            });
            this.saving = false;
          }
        });
      }

    }
  }

}
