import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'exam',
    loadChildren: () => import('./exam/exam.module').then((m) => m.ExamModule),
  },
  {
    path: 'schooling',
    loadChildren: () => import('./schooling/schooling.module').then((m) => m.SchoolingModule),
  },
  {
    path: 'study',
    loadChildren: () => import('./study/study.module').then((m) => m.StudyModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
