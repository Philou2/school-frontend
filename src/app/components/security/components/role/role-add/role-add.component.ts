import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
// import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {MenuService} from '../../../services/menu.service';
import {RoleService} from '../../../services/role.service';
import {ModuleService} from '../../../services/module.service';
import {PermissionService} from '../../../services/permission.service';
import {TreeviewConfig, TreeviewItem} from '@charmedme/ngx-treeview';
import {DomUtil} from 'leaflet';
import remove = DomUtil.remove;

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent {

  roleForm: FormGroup;

  modules: any[] = [];
  menus: any[] = [];
  permissions: any[] = [];
  roles: any[] = [];

  mymenu: any;
  moduleSelected: number | undefined;
  menuSelected: number | undefined;
  permissionSelected: number | undefined;
  saving = false;

  public data: any;

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
              // public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      // permission: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.roleService.currentRole.subscribe(res => {
      if (res) {
        this.data = res;
        this.roleForm.patchValue(this.data);

        if (this.data){
          console.log(this.data);
          this.roleService.getCustomList(this.data.id).subscribe({
            next: (val: any) => {
              this.roles = val['hydra:member'][0].module;

              console.log(this.roles);

              const objt: any = {};

              this.items = this.roles.map((v) => {
                objt.text = v.name;
                objt.value = v.id;
                objt.children = v.menus.map((m: any) => {

                  return {
                    text : m.name,
                    value : m.id,
                    checked : m.status,
                    children : m.submenu?.map((p: any) => {
                      return {
                        checked: p.status,
                        text: p.name,
                        value: p.id
                      };
                    })
                  };

                });
                return new TreeviewItem(objt);

              });


            },
            error: (err: any) =>
            {
              console.log(err);
            }
          });
        }

      }
      else {
        this.findModuleMenuPermissions();
      }


    });


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
      if (this.data){

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
                    children : m.children?.map((p: TreeviewItem) => {
                      return {
                        checked: p.checked,
                        text: p.text,
                        permission: p.value
                      };

                    })
                  };

              })
            };

        });


        this.roleService.updateRole(this.data.id, this.pop, this.roleForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Role added with success !', 'Success');
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
              this.saving = false;

            });
          }
        });
      }
      else {

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

        console.log(this.items);
        // console.log(this.moduleids);
        // console.log(this.menuids);
        // console.log(this.permissionids);

        console.log(this.pop);

        this.roleService.addRole(this.pop, this.roleForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Profile create with success !', 'Success');
            // this.activeModal.close();
            this.route.navigate(['/security/role']);
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {
            this.saving = false;
            console.log(err);
            const errors: any[] = err.violations;
            console.log(errors);

            // errors.forEach((v) =>
            // {
            //   if (v.propertyPath === 'menu'){
            //     this.roleForm.get('menu')?.setErrors({serverError: v.message});
            //   }
            //   this.saving = false;
            // });
          }
        });


      }

    }
  }


  findModuleMenuPermissions(): any{
    this.roleService.getCustomRoleList().subscribe((data: any) => {
          this.roles = data['hydra:member'][0].module;
          console.log(this.roles);
          const objt: any = {};

          this.items = this.roles.map((v) => {
            objt.text = v.name;
            objt.value = v.id;
            objt.children = v.menus.map((m: any) => {

              if (m.permissions) {
                return {
                  text : m.name,
                  value : m.id,

                  children : m.permissions?.map((s: any) => {
                    return {
                      text: s.name,
                      value: s.id,
                      children: s.permissions?.map((p: any) => {
                        return {
                          text: p.name,
                          value: p.id
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

                  children : m.submenu?.map((s: any) => {
                    return {
                      text: s.name,
                      value: s.id,
                      children: s.permissions?.map((p: any) => {
                        return {
                          text: p.name,
                          value: p.id
                        };
                      })
                    };
                  })
                };
              }


            });
            return new TreeviewItem(objt);
          });

        },
        error => console.log(error)
    );
  }

  findAllModule(): any{
    this.moduleService.getModuleList().subscribe((data: any) => {
          console.log(data);
          this.menus = data['hydra:member'];
          this.menus = this.menus.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }
  findAllMenu(): any{
    this.menuService.getMenuList().subscribe((data: any) => {
          console.log(data);
          this.menus = data['hydra:member'];
          this.menus = this.menus.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

  findAllPermission(): any{
    this.permissionService.getPermissionList().subscribe((data: any) => {
          console.log(data);
          this.menus = data['hydra:member'];
          this.menus = this.menus.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

}
