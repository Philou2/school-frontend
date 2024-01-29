import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalenderRoutingModule } from './calender-routing.module';

import { CalenderComponent } from './calender.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { SharedModule } from 'src/app/shared/shared.module';
import {DayPilotModule} from "@daypilot/daypilot-lite-angular";
import {DataService} from "../../security/services/data.service";
import {CalenderCurrentComponent} from './calenderCurrent.component';

@NgModule({
  declarations: [CalenderComponent,
                 CalenderCurrentComponent],
  imports: [
    CommonModule,
    CalenderRoutingModule,
    FormsModule,
    NgbModule,
    SharedModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FlatpickrModule.forRoot(),
    DayPilotModule
  ],
  providers: [DataService]
})
export class CalenderModule { }
