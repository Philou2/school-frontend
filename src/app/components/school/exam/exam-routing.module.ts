import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DiplomaComponent} from './components/configuration/diploma/diploma.component';
import {
  SchoolMarkEntryGeneralComponent
} from './components/configuration/school-mark/mark-entry/school-mark-entry/school-mark-entry-general/school-mark-entry-general.component';
import {
  SchoolMarkEntryByNameComponent
} from './components/configuration/school-mark/mark-entry/school-mark-entry/school-mark-entry-by-name/school-mark-entry-by-name.component';
import {
  SchoolMarkEntryByMatriculeComponent
} from './components/configuration/school-mark/mark-entry/school-mark-entry/school-mark-entry-by-matricule/school-mark-entry-by-matricule.component';
import {
  OpenOrCloseMarkEntryComponent
} from './components/configuration/school-mark/open-or-close-mark-entry/open-or-close-mark-entry.component';
import {SchoolMarkAnonymityComponent} from './components/configuration/school-mark/school-mark-anonymity/school-mark-anonymity.component';
import {
  SchoolMarkViewingNotesStudentComponent
} from './components/configuration/school-mark/viewing-notes/school-mark-viewing-notes/school-mark-viewing-notes-student/school-mark-viewing-notes-student.component';
import {
  SchoolMarkViewingNotesAdminComponent
} from './components/configuration/school-mark/viewing-notes/school-mark-viewing-notes/school-mark-viewing-notes-admin/school-mark-viewing-notes-admin.component';
import { SchoolMarkEntryByAnonymityComponent } from './components/configuration/school-mark/mark-entry/school-mark-entry/school-mark-entry-by-anonymity/school-mark-entry-by-anonymity.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'diploma',
        component: DiplomaComponent
      },
      {
        path: 'mark/mark-entry/general',
        component: SchoolMarkEntryGeneralComponent
      },
      {
        path: 'mark/mark-entry/by-name',
        component: SchoolMarkEntryByNameComponent
      },
      {
        path: 'mark/mark-entry/by-matricule',
        component: SchoolMarkEntryByMatriculeComponent
      },
      {
        path: 'mark/mark-entry/by-anonymity',
        component: SchoolMarkEntryByAnonymityComponent
      },
      {
        path: 'mark/mark-entry/opening-closing',
        component: OpenOrCloseMarkEntryComponent
      },
      {
        path: 'mark/anonymity',
        component: SchoolMarkAnonymityComponent
      },
      {
        path: 'mark/viewing-notes/student',
        component: SchoolMarkViewingNotesStudentComponent
      },
      {
        path: 'mark/viewing-notes/admin',
        component: SchoolMarkViewingNotesAdminComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
