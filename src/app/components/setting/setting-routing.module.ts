import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MinistryComponent} from './components/institution/ministry/ministry.component';
import {ManagerTypeComponent} from './components/institution/managerType/manager-type.component';
import {CountryComponent} from './components/location/country/country.component';
import {BloodGroupComponent} from './components/person/blood-group/blood-group.component';
import {CivilityComponent} from './components/person/civility/civility.component';
import {ReligionComponent} from './components/person/religion/religion.component';
import {RhesusComponent} from './components/person/rhesus/rhesus.component';
import {SexComponent} from './components/person/sex/sex.component';
import {DiplomaTypeComponent} from './components/school/diploma-type/diploma-type.component';
import {RepeatingComponent} from './components/school/repeating/repeating.component';
import {ExpenseHeadingComponent} from './components/cost/expense-heading.component';
import {EmploymentStatusComponent} from './components/hr/employment-status/employment-status.component';
import {RegionComponent} from './components/location/region/region.component';
import {IdentityTypeComponent} from './components/person/identity-type/identity-type.component';
import {MaritalStatusComponent} from './components/person/marital-status/marital-status.component';
import {SubjectNatureComponent} from './components/school/subject-nature/subject-nature.component';
import {PeriodTypeComponent} from './components/school/period-type/period-type.component';
import {DayComponent} from "./components/other-settings/day/day.component";
import {HourlyUnitComponent} from "./components/other-settings/hourly-unit/hourly-unit.component";
import {SliceTypeComponent} from "./components/other-settings/slice-type/slice-type.component";


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ministry',
        component: MinistryComponent
      },
      {
        path: 'manager-type',
        component: ManagerTypeComponent
      },
      {
        path: 'country',
        component: CountryComponent
      },
      {
        path: 'blood-group',
        component: BloodGroupComponent
      },
      {
        path: 'civility',
        component: CivilityComponent
      },
      {
        path: 'religion',
        component: ReligionComponent
      },
      {
        path: 'rhesus',
        component: RhesusComponent
      },
      {
        path: 'sex',
        component: SexComponent
      },
      {
        path: 'diploma-type',
        component: DiplomaTypeComponent
      },
      {
        path: 'repeating',
        component: RepeatingComponent
      },
      {
        path: 'expense-heading',
        component: ExpenseHeadingComponent
      },
      {
        path: 'employment-status',
        component: EmploymentStatusComponent
      },
      {
        path: 'region',
        component: RegionComponent
      },
      {
        path: 'identity-type',
        component: IdentityTypeComponent
      },
      {
        path: 'marital-status',
        component: MaritalStatusComponent
      },
      {
        path: 'subject-nature',
        component: SubjectNatureComponent
      },
      {
        path: 'period-type',
        component: PeriodTypeComponent
      },
      {
        path: 'day',
        component: DayComponent
      },
      {
        path: 'hourly-unit',
        component: HourlyUnitComponent
      },
      {
        path: 'slice-type',
        component: SliceTypeComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
