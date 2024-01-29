import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ModuleComponent} from './components/module/module.component';
import {MenuComponent} from './components/menu/menu.component';
import {PermissionComponent} from './components/permission/permission.component';
import {UserComponent} from './components/user/user.component';
import {RoleComponent} from './components/role/role.component';
import {RoleAddComponent} from './components/role/role-add/role-add.component';
import {UserEditComponent} from './components/user/user-edit/user-edit.component';
import {UserAddComponent} from './components/user/user-add/user-add.component';
import {RoleEditComponent} from './components/role/role-edit/role-edit.component';
import {InstitutionComponent} from './components/institution/institution.component';
import {InstitutionAddComponent} from './components/institution/institution-add/institution-add.component';
import {InstitutionEditComponent} from './components/institution/institution-edit/institution-edit.component';
import {BranchComponent} from './components/branch/branch.component';
import {BranchAddComponent} from './components/branch/branch-add/branch-add.component';
import {BranchEditComponent} from './components/branch/branch-edit/branch-edit.component';
import {YearComponent} from './components/year/year.component';
import {ImportPermissionComponent} from './components/permission/permission-import/import-permission.component';
import {UserProfileComponent} from './components/user/user-profile/user-profile.component';
import {UserInstitutionUpdateComponent} from './components/institution/user-institution-update/user-institution-update.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'module',
        component: ModuleComponent
      },
      {
        path: 'menu',
        component: MenuComponent
      },
      {
        path: 'permission',
        component: PermissionComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'user/add',
        component: UserAddComponent
      },
      {
        path: 'user/edit/:id',
        component: UserEditComponent
      },
      {
        path: 'user/profile/:id',
        component: UserProfileComponent
      },
      {
        path: 'role',
        component: RoleComponent
      },
      {
        path: 'role/add',
        component: RoleAddComponent
      },
      {
        path: 'role/edit/:id',
        component: RoleEditComponent
      },
      {
        path: 'institution',
        component: InstitutionComponent
      },
      {
        path: 'user/institution',
        component: UserInstitutionUpdateComponent
      },
      {
        path: 'institution/add',
        component: InstitutionAddComponent
      },
      {
        path: 'institution/edit/:id',
        component: InstitutionEditComponent
      },
      {
        path: 'branch',
        component: BranchComponent
      },
      {
        path: 'branch/add',
        component: BranchAddComponent
      },
      {
        path: 'branch/edit/:id',
        component: BranchEditComponent
      },
      {
        path: 'year',
        component: YearComponent
      },
      {
        path: 'import/permission',
        component: ImportPermissionComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
