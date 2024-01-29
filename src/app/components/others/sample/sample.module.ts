import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

import { SampleRoutingModule } from './sample-routing.module';
import { ParticipantComponent } from './participant.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ParticipantAddEditComponent} from './participant-add-edit/participant-add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SampleRoutingModule,
        NgxDatatableModule
    ],
  declarations: [ParticipantComponent, ParticipantAddEditComponent]
})
export class SampleModule { }
