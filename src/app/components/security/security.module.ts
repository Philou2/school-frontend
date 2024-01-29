import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { SecurityRoutingModule } from './security-routing.module';

import {ModuleComponent} from './components/module/module.component';
import {ModuleAddEditComponent} from './components/module/module-add-edit/module-add-edit.component';
import {MenuComponent} from './components/menu/menu.component';
import {MenuAddComponent} from './components/menu/menu-add/menu-add.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgSelectModule} from '@ng-select/ng-select';
import {PermissionComponent} from './components/permission/permission.component';
import {PermissionAddEditComponent} from './components/permission/permission-add-edit/permission-add-edit.component';
import {UserComponent} from './components/user/user.component';
import {UserEditComponent} from './components/user/user-edit/user-edit.component';
import {UserAddComponent} from './components/user/user-add/user-add.component';
import {RoleComponent} from './components/role/role.component';
import {RoleAddComponent} from './components/role/role-add/role-add.component';
import {TreeviewModule} from '@charmedme/ngx-treeview';
import {MenuEditComponent} from './components/menu/menu-edit/menu-edit.component';
import {UserPasswordUpdateComponent} from './components/user/user-password-update/user-password-update.component';
import {RoleEditComponent} from './components/role/role-edit/role-edit.component';
import {InstitutionComponent} from './components/institution/institution.component';
import {InstitutionAddComponent} from './components/institution/institution-add/institution-add.component';
import {InstitutionEditComponent} from './components/institution/institution-edit/institution-edit.component';
import {BranchComponent} from './components/branch/branch.component';
import {BranchAddComponent} from './components/branch/branch-add/branch-add.component';
import {BranchEditComponent} from './components/branch/branch-edit/branch-edit.component';
import {YearComponent} from './components/year/year.component';
import {ImportPermissionComponent} from './components/permission/permission-import/import-permission.component';
import {UserChangePasswordComponent} from './components/user/user-change-password/user-change-password.component';
import {UserProfileComponent} from './components/user/user-profile/user-profile.component';
import {UserInstitutionUpdateComponent} from './components/institution/user-institution-update/user-institution-update.component';

@NgModule({
  declarations: [ModuleComponent, ModuleAddEditComponent, MenuComponent, MenuAddComponent, MenuEditComponent,
      PermissionComponent, PermissionAddEditComponent, UserComponent, UserAddComponent, UserEditComponent,
      UserPasswordUpdateComponent, RoleComponent, RoleAddComponent, RoleEditComponent, InstitutionComponent,
    InstitutionAddComponent, InstitutionEditComponent, BranchComponent, BranchAddComponent, BranchEditComponent,
      YearComponent, ImportPermissionComponent, UserChangePasswordComponent, UserProfileComponent, UserInstitutionUpdateComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    NgbModule,
    SharedModule,
    NgxDatatableModule,
    NgSelectModule,
    TreeviewModule,
  ]
})
export class SecurityModule { }
