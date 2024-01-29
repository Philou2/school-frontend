import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalenderComponent } from './calender.component';
import {CalenderCurrentComponent} from './calenderCurrent.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      component: CalenderComponent
    },
    {
      path: 'timetable-model/calendar/:id',
      component: CalenderComponent
    },
    {
      path: 'timetable-model/calendar-current-user',
      component: CalenderCurrentComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalenderRoutingModule { }
