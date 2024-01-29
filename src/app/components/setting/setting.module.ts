import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { SettingRoutingModule } from './setting-routing.module';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgSelectModule} from '@ng-select/ng-select';
import {MinistryComponent} from './components/institution/ministry/ministry.component';
import {ManagerTypeComponent} from './components/institution/managerType/manager-type.component';
import {ManagerTypeAddEditComponent} from './components/institution/managerType/manager-type-add-edit/manager-type-add-edit.component';
import {MinistryAddEditComponent} from './components/institution/ministry/ministry-add-edit/ministry-add-edit.component';
import {CountryComponent} from './components/location/country/country.component';
import {CountryAddEditComponent} from './components/location/country/country-add-edit/country-add-edit.component';
import {BloodGroupComponent} from './components/person/blood-group/blood-group.component';
import {BloodGroupAddEditComponent} from './components/person/blood-group/blood-group-add-edit/blood-group-add-edit.component';
import {CivilityComponent} from './components/person/civility/civility.component';
import {CivilityAddEditComponent} from './components/person/civility/civility-add-edit/civility-add-edit.component';
import {ReligionComponent} from './components/person/religion/religion.component';
import {ReligionAddEditComponent} from './components/person/religion/religion-add-edit/religion-add-edit.component';
import {RhesusComponent} from './components/person/rhesus/rhesus.component';
import {RhesusAddEditComponent} from './components/person/rhesus/rhesus-add-edit/rhesus-add-edit.component';
import {SexComponent} from './components/person/sex/sex.component';
import {SexAddEditComponent} from './components/person/sex/sex-add-edit/sex-add-edit.component';
import {DiplomaTypeComponent} from './components/school/diploma-type/diploma-type.component';
import {DiplomaTypeAddEditComponent} from './components/school/diploma-type/diploma-type-add-edit/diploma-type-add-edit.component';
import {RepeatingComponent} from './components/school/repeating/repeating.component';
import {RepeatingAddEditComponent} from './components/school/repeating/repeating-add-edit/repeating-add-edit.component';
import {ExpenseHeadingComponent} from './components/cost/expense-heading.component';
import {ExpenseHeadingAddEditComponent} from './components/cost/expense-heading-add-edit/expense-heading-add-edit.component';
import {EmploymentStatusComponent} from './components/hr/employment-status/employment-status.component';
import {
  EmploymentStatusAddEditComponent
} from './components/hr/employment-status/employment-status-add-edit/employment-status-add-edit.component';
import {RegionComponent} from './components/location/region/region.component';
import {RegionAddEditComponent} from './components/location/region/region-add-edit/region-add-edit.component';
import {IdentityTypeComponent} from './components/person/identity-type/identity-type.component';
import {IdentityTypeAddEditComponent} from './components/person/identity-type/identity-type-add-edit/identity-type-add-edit.component';
import {MaritalStatusComponent} from './components/person/marital-status/marital-status.component';
import {MaritalStatusAddEditComponent} from './components/person/marital-status/marital-status-add-edit/marital-status-add-edit.component';
import {SubjectNatureComponent} from './components/school/subject-nature/subject-nature.component';
import {SubjectNatureAddEditComponent} from './components/school/subject-nature/subject-nature-add-edit/subject-nature-add-edit.component';
import {PeriodTypeComponent} from './components/school/period-type/period-type.component';
import {PeriodTypeAddEditComponent} from './components/school/period-type/period-type-add-edit/period-type-add-edit.component';
import {DayComponent} from "./components/other-settings/day/day.component";
import {DayAddEditComponent} from "./components/other-settings/day/day-add-edit/day-add-edit.component";
import {HourlyUnitComponent} from "./components/other-settings/hourly-unit/hourly-unit.component";
import {
  HourlyUnitAddEditComponent
} from "./components/other-settings/hourly-unit/hourly-unit-add-edit/hourly-unit-add-edit.component";
import {SliceTypeComponent} from "./components/other-settings/slice-type/slice-type.component";
import {
  SliceTypeAddEditComponent
} from "./components/other-settings/slice-type/slice-type-add-edit/slice-type-add-edit.component";

@NgModule({
  declarations: [
    MinistryComponent,
    MinistryAddEditComponent,
    ManagerTypeComponent,
    ManagerTypeAddEditComponent,
    CountryComponent,
    CountryAddEditComponent,
    BloodGroupComponent,
    BloodGroupAddEditComponent,
    CivilityComponent,
    CivilityAddEditComponent,
    ReligionComponent,
    ReligionAddEditComponent,
    RhesusComponent,
    RhesusAddEditComponent,
    SexComponent,
    SexAddEditComponent,
    DiplomaTypeComponent,
    DiplomaTypeAddEditComponent,
    RepeatingComponent,
    RepeatingAddEditComponent,
    ExpenseHeadingComponent,
    ExpenseHeadingAddEditComponent,
    EmploymentStatusComponent,
    EmploymentStatusAddEditComponent,
    RegionComponent,
    RegionAddEditComponent,
    IdentityTypeComponent,
    IdentityTypeAddEditComponent,
    MaritalStatusComponent,
    MaritalStatusAddEditComponent,
    SubjectNatureComponent,
    SubjectNatureAddEditComponent,
    PeriodTypeComponent,
    PeriodTypeAddEditComponent,
    DayComponent,
    DayAddEditComponent,
    HourlyUnitComponent,
    HourlyUnitAddEditComponent,
    SliceTypeComponent,
    SliceTypeAddEditComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    NgbModule,
    SharedModule,
    NgxDatatableModule,
    NgSelectModule,
  ]
})
export class SettingModule { }
