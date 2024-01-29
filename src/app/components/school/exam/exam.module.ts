import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';
import { ExamRoutingModule } from './exam-routing.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgSelectModule} from '@ng-select/ng-select';
import {DiplomaComponent} from './components/configuration/diploma/diploma.component';
import {DiplomaAddEditComponent} from './components/configuration/diploma/diploma-add-edit/diploma-add-edit.component';

import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {SchoolMarkEntryComponent} from './components/configuration/school-mark/mark-entry/school-mark-entry/school-mark-entry.component';
import {  SchoolMarkEntryGeneralComponent
} from './components/configuration/school-mark/mark-entry/school-mark-entry/school-mark-entry-general/school-mark-entry-general.component';
import {
  SchoolMarkEntryByNameComponent
} from './components/configuration/school-mark/mark-entry/school-mark-entry/school-mark-entry-by-name/school-mark-entry-by-name.component';
import {
  SchoolMarkViewingNotesAdminComponent
} from './components/configuration/school-mark/viewing-notes/school-mark-viewing-notes/school-mark-viewing-notes-admin/school-mark-viewing-notes-admin.component';
import {
    OpenOrCloseMarkEntryComponent
} from './components/configuration/school-mark/open-or-close-mark-entry/open-or-close-mark-entry.component';
import {SchoolMarkAnonymityComponent} from './components/configuration/school-mark/school-mark-anonymity/school-mark-anonymity.component';
import {
    SchoolMarkEntryByMatriculeComponent
} from './components/configuration/school-mark/mark-entry/school-mark-entry/school-mark-entry-by-matricule/school-mark-entry-by-matricule.component';
import {
    SchoolMarkViewingNotesStudentComponent
} from './components/configuration/school-mark/viewing-notes/school-mark-viewing-notes/school-mark-viewing-notes-student/school-mark-viewing-notes-student.component';
import {MatCardModule} from '@angular/material/card';
import {MatSortModule} from '@angular/material/sort';
import {
    SchoolMarkEntryByAnonymityComponent
} from './components/configuration/school-mark/mark-entry/school-mark-entry/school-mark-entry-by-anonymity/school-mark-entry-by-anonymity.component';

@NgModule({
  declarations: [
      DiplomaComponent,
      DiplomaAddEditComponent,
      SchoolMarkEntryComponent,
      SchoolMarkEntryGeneralComponent,
      SchoolMarkEntryByNameComponent,
      SchoolMarkEntryByMatriculeComponent,
      SchoolMarkEntryByAnonymityComponent,
      OpenOrCloseMarkEntryComponent,
      SchoolMarkAnonymityComponent,
      SchoolMarkViewingNotesStudentComponent,
      SchoolMarkViewingNotesAdminComponent
  ],
    imports: [
        CommonModule,
        ExamRoutingModule,
        NgbModule,
        SharedModule,
        NgxDatatableModule,
        NgSelectModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatCardModule,
        MatSortModule,
    ]
})
export class ExamModule { }
