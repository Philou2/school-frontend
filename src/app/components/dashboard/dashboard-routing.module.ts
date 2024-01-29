import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CryptoComponent } from "./crypto/crypto.component";
import { DefaultComponent } from "./default/default.component";
import { EcommerceComponent } from "./ecommerce/ecommerce.component";
import { OnlineCourseComponent } from "./online-course/online-course.component";
import { SocialComponent } from './social/social.component';
import {LoadingModuleComponent} from './loading-module/loading-module.component';
import {SecurityDashboardComponent} from './security-dashboard/security-dashboard.component';
import {SchoolDashboardComponent} from './school-dashboard/school-dashboard.component';
import {ExamsDashboardComponent} from './exams-dashboard/exams-dashboard.component';
import {StudyDashboardComponent} from './study-dashboard/study-dashboard.component';
import {SettingDashboardComponent} from './setting-dashboard/setting-dashboard.component';
import {TeacherDashboardComponent} from './teacher-dashboard/teacher-dashboard.component';
import {OnlineCourseStudyComponent} from './online-course-study/online-course-study.component';
import {StudentDashboardComponent} from './student-dashboard/student-dashboard.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "default",
        component: DefaultComponent,
      },
      {
        path: "ecommerce",
        component: EcommerceComponent,
      },
      {
        path: "loading-module",
        component: LoadingModuleComponent,
      },
      {
        path: "online-course",
        component: OnlineCourseComponent,
      },
      {
        path: "online-course-study",
        component: OnlineCourseStudyComponent,
      },
      {
        path: "crypto",
        component: CryptoComponent,
      },
      {
        path: "social",
        component: SocialComponent,
      },
      {
        path: "security",
        component: SecurityDashboardComponent,
      },      {
        path: "school",
        component: SchoolDashboardComponent,
      },
      {
        path: "exams",
        component: ExamsDashboardComponent,
      },
      {
        path: "study",
        component: StudyDashboardComponent,
      },
      {
        path: "setting",
        component: SettingDashboardComponent,
      },
      {
        path: "teacher",
        component: TeacherDashboardComponent,
      },
      {
        path: "student",
        component: StudentDashboardComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
