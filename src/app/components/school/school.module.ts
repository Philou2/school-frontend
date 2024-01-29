import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { SchoolRoutingModule } from './school-routing.module';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    NgbModule,
    SharedModule,
    NgxDatatableModule,
    NgSelectModule,
  ],
  providers: [
      DatePipe
  ]
})
export class SchoolModule { }
