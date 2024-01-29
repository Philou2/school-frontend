import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BuildingComponent} from './components/configuration/building/building.component';
import {SchoolComponent} from './components/configuration/school/school.component';
import {RoomComponent} from './components/configuration/room/room.component';
import {GuardianshipComponent} from './components/configuration/guardianship/guardianship.component';
import {CycleComponent} from './components/configuration/cycle/cycle.component';
import {DepartmentComponent} from './components/configuration/department/department.component';
import {ProgramComponent} from './components/configuration/program/program.component';
import {LevelComponent} from './components/configuration/level/level.component';
import {SpecialityComponent} from './components/configuration/speciality/speciality.component';
import {OptionComponent} from './components/configuration/option/option.component';
import {TrainingTypeComponent} from './components/configuration/training-type/training-type.component';
import {ClassCategoryComponent} from './components/configuration/class-category/class-category.component';
import {PensionSchemeComponent} from './components/configuration/pension-scheme/pension-scheme.component';
import {RegistrationFormComponent} from './components/configuration/registration-form/registration-form.component';
import {CostAreaComponent} from './components/configuration/cost-area/cost-area.component';
import {TuitionComponent} from './components/configuration/tuition/tuition.component';
import {TuitionAddComponent} from './components/configuration/tuition/tuition-add.component';
import {StudentRegistrationComponent} from './components/registration/student-registration/student-registration.component';
import {StudentRegistrationAddComponent} from './components/registration/student-registration/student-registration-add.component';
import {CampusComponent} from './components/configuration/campus/campus.component';
import {OldStudentRegistrationComponent} from './components/registration/old-student-registration/old-student-registration.component';
import {
  OldStudentRegistrationAddComponent
} from './components/registration/old-student-registration/old-student-registration-add.component';
import {
  OldStudentRegistrationPerClassComponent
} from './components/registration/old-student-registration-per-class/old-student-registration-per-class.component';
import {
  OldStudentRegistrationPerClassAddComponent
} from './components/registration/old-student-registration-per-class/old-student-registration-per-class-add.component';
import {SchoolOfOriginComponent} from './components/registration/school-of-origin/school-of-origin.component';
import {FamilyComponent} from './components/registration/family/family.component';
import {StudentComponent} from './components/registration/student/student.component';
import {StudentAddComponent} from './components/registration/student/student-add.component';
import {ImageAddEditComponent} from './components/registration/student/image-add-edit/image-add-edit.component';
import {ChangeOfMatriculeComponent} from './components/registration/change-of-matricule/change-of-matricule.component';
import {ChangeOfClassComponent} from './components/registration/change-of-class/change-of-class.component';
import {ChangeOfRegimeComponent} from './components/registration/change-of-regime/change-of-regime.component';
import {ChangeOfOptionComponent} from './components/registration/change-of-option/change-of-option.component';
import {ResignationComponent} from './components/registration/resignation/resignation.component';
import {DismissalComponent} from './components/registration/dismissal/dismissal.component';
import {PensionBracketComponent} from './components/configuration/pension-bracket/pension-bracket.component';
import {SchoolClassComponent} from './components/configuration/school-class/school-class.component';
import {SchoolClassAddEditComponent} from './components/configuration/school-class/school-class-add-edit/school-class-add-edit.component';
import {ClassRoomComponent} from './components/configuration/class-room/class-room.component';
import {ClassHourlyRateComponent} from './components/configuration/class-hourly-rate/class-hourly-rate.component';
import {ReadmissionComponent} from './components/registration/readmission/readmission.component';
import {
  StudCourseRegistrationStudentComponent
} from './components/registration/stud-course-registration/stud-course-registration-student/stud-course-registration-student.component';
import {
  StudCourseRegistrationOpeningClosingComponent
} from './components/registration/stud-course-registration/stud-course-registration-opening-closing/stud-course-registration-opening-closing.component';
import {
  StudCourseRegistrationAdminByStudentComponent
} from './components/registration/stud-course-registration/stud-course-registration-admin/stud-course-registration-admin-by-student/stud-course-registration-admin-by-student.component';
import {
  StudCourseRegistrationAdminByClassComponent
} from './components/registration/stud-course-registration/stud-course-registration-admin/stud-course-registration-admin-by-class/stud-course-registration-admin-by-class.component';
import {SchoolYearComponent} from './components/configuration/school-year/school-year.component';
import {ImportCycleComponent} from './components/configuration/cycle/cycle-import/import-cycle.component';
import {ImportDepartmentComponent} from './components/configuration/department/department-import/import-department.component';
import {ImportOptionComponent} from './components/configuration/option/option-import/import-option.component';
import {ImportSpecialityComponent} from './components/configuration/speciality/speciality-import/import-speciality.component';
import {
  ImportStudentRegistrationComponent
} from './components/registration/student-registration/student-registration-import/import-student-registration.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'campus',
        component: CampusComponent
      },

      {
        path: 'building',
        component: BuildingComponent
      },
      {
        path: 'school',
        component: SchoolComponent
      },
      {
        path: 'room',
        component: RoomComponent
      },
      {
        path: 'guardianship',
        component: GuardianshipComponent
      },
      {
        path: 'cycle',
        component: CycleComponent
      },
      {
        path: 'department',
        component: DepartmentComponent
      },
      {
        path: 'program',
        component: ProgramComponent
      },
      {
        path: 'level',
        component: LevelComponent
      },
      {
        path: 'speciality',
        component: SpecialityComponent
      },
      {
        path: 'option',
        component: OptionComponent
      },
      {
        path: 'training-type',
        component: TrainingTypeComponent
      },
      {
        path: 'class-category',
        component: ClassCategoryComponent
      },
      {
        path: 'school-class',
        component: SchoolClassComponent
      },
      {
        path: 'add-edit-school-class',
        component: SchoolClassAddEditComponent
      },
      {
        path: 'class-room',
        component: ClassRoomComponent
      },
      {
        path: 'class-hourly-rate',
        component: ClassHourlyRateComponent
      },
      {
        path: 'pension-scheme',
        component: PensionSchemeComponent
      },
      {
        path: 'pension-bracket',
        component: PensionBracketComponent
      },
      {
        path: 'registration-form',
        component: RegistrationFormComponent
      },
      {
        path: 'cost-area',
        component: CostAreaComponent
      },
      {
        path: 'tuition',
        component: TuitionComponent
      },
      {
        path: 'add-edit-tuition',
        component: TuitionAddComponent
      },
      {
        path: 'student-registration',
        component: StudentRegistrationComponent
      },
      {
        path: 'add-edit-student-registration',
        component: StudentRegistrationAddComponent
      },
      {
        path: 'old-student-registration',
        component: OldStudentRegistrationComponent
      },
      {
        path: 'add-edit-old-student-registration',
        component: OldStudentRegistrationAddComponent
      },
      {
        path: 'old-student-registration-per-class',
        component: OldStudentRegistrationPerClassComponent
      },
      {
        path: 'add-edit-old-student-registration-per-class',
        component: OldStudentRegistrationPerClassAddComponent
      },
      {
        path: 'school-of-origin',
        component: SchoolOfOriginComponent
      },
      {
        path: 'family',
        component: FamilyComponent
      },
      {
        path: 'student',
        component: StudentComponent
      },
      {
        path: 'add-student',
        component: StudentAddComponent
      },
      {
        path: 'add-image',
        component: ImageAddEditComponent
      },
      {
        path: 'change-of-matricule',
        component: ChangeOfMatriculeComponent
      },
      {
        path: 'change-of-class',
        component: ChangeOfClassComponent
      },
      {
        path: 'change-of-regime',
        component: ChangeOfRegimeComponent
      },
      {
        path: 'change-of-option',
        component: ChangeOfOptionComponent
      },
      {
        path: 'resignation',
        component: ResignationComponent
      },
      {
        path: 'dismissal',
        component: DismissalComponent
      },
      {
        path: 'readmission',
        component: ReadmissionComponent
      },
      {
        path: 'year',
        component: SchoolYearComponent
      },
      {
        path: 'student-course-registration/student',
        component: StudCourseRegistrationStudentComponent
      },
      {
        path: 'student-course-registration/opening-closing',
        component: StudCourseRegistrationOpeningClosingComponent
      },
      {
        path: 'student-course-registration/admin/by-student',
        component: StudCourseRegistrationAdminByStudentComponent
      },
      {
        path: 'student-course-registration/admin/by-class',
        component: StudCourseRegistrationAdminByClassComponent
      },
      {
        path: 'import/cycle',
        component: ImportCycleComponent
      },
      {
        path: 'import/department',
        component: ImportDepartmentComponent
      },
      {
        path: 'import/option',
        component: ImportOptionComponent
      },
      {
        path: 'import/speciality',
        component: ImportSpecialityComponent
      },
      {
        path: 'import/student-registration',
        component: ImportStudentRegistrationComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolingRoutingModule { }
