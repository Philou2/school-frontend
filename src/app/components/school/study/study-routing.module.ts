import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubjectTypeComponent} from './components/configuration/subject-type/subject-type.component';
import {ModuleCategoryComponent} from './components/configuration/module-category/module-category.component';
import {ModuleComponent} from './components/configuration/module/module.component';
import {SubjectComponent} from './components/configuration/subject/subject.component';
import {ClassProgramComponent} from './components/program/class-program/class-program.component';
import {TeacherAddComponent} from './components/teacher/teacher/teacher-add.component';
import {TeacherYearComponent} from "./components/program/teacher-year/teacher-year.component";
import {ClassYearComponent} from "./components/program/class-year/class-year.component";
import {CycleYearComponent} from "./components/program/cycle-year/cycle-year.component";
import {SpecialityYearComponent} from "./components/program/speciality-year/speciality-year.component";
import {TimeTablePeriodComponent} from "./components/time-table/time-table-period/time-table-period.component";
import {TimetableModelComponent} from "./components/time-table/timetable-model/timetable-model.component";
import {TimetableModelAddComponent} from "./components/time-table/timetable-model/timetable-model-add.component";
import {TimeTableModelDayComponent} from "./components/time-table/time-table-model-day/time-table-model-day.component";
import {
  TimeTableModelDayCellComponent
} from "./components/time-table/time-table-model-day-cell/time-table-model-day-cell.component";
import { CalenderComponent } from '../../apps/calender/calender.component';
import { GenerateTimetableAddComponent } from './components/time-table/generate-timetable/generate-timetable-add.component';
import { GenerateTimetableComponent } from './components/time-table/generate-timetable/generate-timetable.component';

import { TeacherComponent } from './components/teacher/teacher/teacher.component';
import { ClassProgramAddEditComponent } from './components/program/class-program/class-program-add-edit/class-program-add-edit.component';
import {TeacherCourseRegistrationComponent} from './components/program/teacher-course-registration/teacher-course-registration.component';
import {ListOfTeacherCoursePlanComponent} from './components/time-table/list-of-teacher-course-plan/list-of-teacher-course-plan.component';
import {TeacherCourseComponent} from './components/program/teacher-course/teacher-course.component';
import {StudentCourseComponent} from './components/program/student-course/student-course.component';
import {AdminTeacherCoursePlanComponent} from './components/time-table/admin-teacher-course-plan/admin-teacher-course-plan.component';
import {TodayTeacherCoursePlanComponent} from './components/time-table/today-teacher-course-plan/today-teacher-course-plan.component';
import {ImportSubjectComponent} from './components/configuration/subject/subject-import/import-subject.component';
import {ImportTeacherComponent} from './components/teacher/teacher/teacher-import/import-teacher.component';
import {RequestCoursePostponementComponent} from './components/teacher/request-course-postponement/request-course-postponement.component';
import {RequestCoursePermutationComponent} from './components/teacher/request-course-permutation/request-course-permutation.component';
import {
  RequestCoursePostponementAdminComponent
} from './components/teacher/request-course-postponement/request-course-postponement-admin/request-course-postponement-admin.component';
import {
  RequestCoursePermutationAdminComponent
} from './components/teacher/request-course-permutation/request-course-permutation-admin/request-course-permutation-admin.component';
import {StudentAttendanceComponent} from './components/program/student-attendance/student-attendance.component';
import {
  StudentAttendanceAddEditComponent
} from './components/program/student-attendance/student-attendance-add-edit/student-attendance-add-edit.component';
import {LeaveRequestComponent} from './components/hr/leave-request-day/leave-request.component';
import {
  StudentAttendancePerClassAndDateComponent
} from './components/program/student-attendance-per-class-and-date/student-attendance-per-class-and-date.component';
import {
  StudentAttendancePerClassAndDateAddEditComponent
} from './components/program/student-attendance-per-class-and-date/student-attendance-per-class-and-date-add-edit/student-attendance-per-class-and-date-add-edit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'subject-type',
        component: SubjectTypeComponent
      } ,
      {
        path: 'module-category',
        component: ModuleCategoryComponent
      },
      {
        path: 'module',
        component: ModuleComponent
      },
      {
        path: 'subject',
        component: SubjectComponent
      },
      {
        path: 'class-program',
        component: ClassProgramComponent
      },
      {
        path: 'add-edit-class-program',
        component: ClassProgramAddEditComponent
      },
      {
        path: 'teacher',
        component: TeacherComponent
      },
      {
        path: 'add-edit-teacher',
        component: TeacherAddComponent
      },
      {
        path: 'teacher-year',
        component: TeacherYearComponent
      },
      {
        path: 'class-year',
        component: ClassYearComponent
      },
      {
        path: 'cycle-year',
        component: CycleYearComponent
      },

      {
        path: 'teacher-course-registration',
        component: TeacherCourseRegistrationComponent
      },
      {
        path: 'list-of-teacher-course-plan',
        component: ListOfTeacherCoursePlanComponent
      },

      {
        path: 'teacher-course',
        component: TeacherCourseComponent
      },
      {
        path: 'student-course',
        component: StudentCourseComponent
      },
      {
        path: 'speciality-year',
        component: SpecialityYearComponent
      },
      {
        path: 'timetable-period',
        component: TimeTablePeriodComponent
      },
      {
        path: 'timetable-model',
        component: TimetableModelComponent
      },
      {
        path: 'timetable-model/calendar/:id',
        component: CalenderComponent
      },
      {
        path: 'timetable-model-day',
        component: TimeTableModelDayComponent
      },
      {
        path: 'timetable-model-day-cell',
        component: TimeTableModelDayCellComponent
      },
      {
        path: 'add-edit-timetable-model',
        component: TimetableModelAddComponent
      },
      {
        path: 'add-edit-generate-timetable',
        component: GenerateTimetableAddComponent
      },
      {
        path: 'generate-timetable',
        component: GenerateTimetableComponent
      },
      {
        path: 'admin-teacher-course-plan',
        component: AdminTeacherCoursePlanComponent
      },
      {
        path: 'today-teacher-course-plan',
        component: TodayTeacherCoursePlanComponent
      },
      {
        path: 'import/subject',
        component: ImportSubjectComponent
      },
      {
        path: 'import/teacher',
        component: ImportTeacherComponent
      },
      {
        path: 'request-course-postponement',
        component: RequestCoursePostponementComponent
      },
      {
        path: 'request-course-permutation',
        component: RequestCoursePermutationComponent
      },
      {
        path: 'request-course-postponement-admin',
        component: RequestCoursePostponementAdminComponent
      },
      {
        path: 'request-course-permutation-admin',
        component: RequestCoursePermutationAdminComponent
      },
      {
        path: 'attendance',
        component: StudentAttendanceComponent
      },
      {
        path: 'add-edit-attendance',
        component: StudentAttendanceAddEditComponent
      },
      {
        path: 'attendance-per-class',
        component: StudentAttendancePerClassAndDateComponent
      },
      {
        path: 'add-edit-attendance-per-classe',
        component: StudentAttendancePerClassAndDateAddEditComponent
      },
      {
        path: 'leave-request',
        component: LeaveRequestComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyRoutingModule { }
