import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';
import { SchoolingRoutingModule } from './schooling-routing.module';
import {CampusComponent} from './components/configuration/campus/campus.component';
import {CampusAddEditComponent} from './components/configuration/campus/campus-add-edit/campus-add-edit.component';
import {BuildingComponent} from './components/configuration/building/building.component';
import {BuildingAddEditComponent} from './components/configuration/building/building-add-edit/building-add-edit.component';
import {SchoolComponent} from './components/configuration/school/school.component';
import {SchoolAddEditComponent} from './components/configuration/school/school-add-edit/school-add-edit.component';
import {RoomComponent} from './components/configuration/room/room.component';
import {RoomAddEditComponent} from './components/configuration/room/room-add-edit/room-add-edit.component';
import {GuardianshipComponent} from './components/configuration/guardianship/guardianship.component';
import {GuardianshipAddEditComponent} from './components/configuration/guardianship/guardianship-add-edit/guardianship-add-edit.component';
import {CycleComponent} from './components/configuration/cycle/cycle.component';
import {CycleAddEditComponent} from './components/configuration/cycle/cycle-add-edit/cycle-add-edit.component';
import {DepartmentComponent} from './components/configuration/department/department.component';
import {DepartmentAddEditComponent} from './components/configuration/department/department-add-edit/department-add-edit.component';
import {ProgramComponent} from './components/configuration/program/program.component';
import {ProgramAddEditComponent} from './components/configuration/program/program-add-edit/program-add-edit.component';
import {LevelComponent} from './components/configuration/level/level.component';
import {LevelAddEditComponent} from './components/configuration/level/level-add-edit/level-add-edit.component';
import {SpecialityComponent} from './components/configuration/speciality/speciality.component';
import {SpecialityAddEditComponent} from './components/configuration/speciality/speciality-add-edit/speciality-add-edit.component';
import {OptionComponent} from './components/configuration/option/option.component';
import {OptionAddEditComponent} from './components/configuration/option/option-add-edit/option-add-edit.component';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgSelectModule} from '@ng-select/ng-select';
import {TrainingTypeComponent} from './components/configuration/training-type/training-type.component';
import {TrainingTypeAddEditComponent} from './components/configuration/training-type/training-type-add-edit/training-type-add-edit.component';
import {ClassCategoryComponent} from './components/configuration/class-category/class-category.component';
import {ClassCategoryAddEditComponent} from './components/configuration/class-category/class-category-add-edit/class-category-add-edit.component';
import {PensionSchemeComponent} from './components/configuration/pension-scheme/pension-scheme.component';
import {PensionSchemeAddEditComponent} from './components/configuration/pension-scheme/pension-scheme-add-edit/pension-scheme-add-edit.component';
import {RegistrationFormComponent} from './components/configuration/registration-form/registration-form.component';
import {
  RegistrationFormAddEditComponent
} from './components/configuration/registration-form/registration-form-add-edit/registration-form-add-edit.component';
import {CostAreaComponent} from './components/configuration/cost-area/cost-area.component';
import {CostAreaAddEditComponent} from './components/configuration/cost-area/cost-area-add-edit/cost-area-add-edit.component';
import {TuitionComponent} from './components/configuration/tuition/tuition.component';
import {TuitionAddComponent} from './components/configuration/tuition/tuition-add.component';
import {StudentRegistrationComponent} from './components/registration/student-registration/student-registration.component';
import {StudentRegistrationAddComponent} from './components/registration/student-registration/student-registration-add.component';
import {
  OldStudentRegistrationAddComponent
} from './components/registration/old-student-registration/old-student-registration-add.component';
import {OldStudentRegistrationComponent} from './components/registration/old-student-registration/old-student-registration.component';
import {
  OldStudentRegistrationPerClassComponent
} from './components/registration/old-student-registration-per-class/old-student-registration-per-class.component';
import {
  OldStudentRegistrationPerClassAddComponent
} from './components/registration/old-student-registration-per-class/old-student-registration-per-class-add.component';
import {SchoolOfOriginComponent} from './components/registration/school-of-origin/school-of-origin.component';
import {
  SchoolOfOriginAddEditComponent
} from './components/registration/school-of-origin/school-of-origin-add-edit/school-of-origin-add-edit.component';
import {FamilyComponent} from './components/registration/family/family.component';
import {FamilyAddEditComponent} from './components/registration/family/family-add-edit/family-add-edit.component';
import {StudentComponent} from './components/registration/student/student.component';
import {StudentAddComponent} from './components/registration/student/student-add.component';
import {ImageAddEditComponent} from './components/registration/student/image-add-edit/image-add-edit.component';
import {ChangeOfMatriculeComponent} from './components/registration/change-of-matricule/change-of-matricule.component';
import {
  ChangeOfMatriculeAddEditComponent
} from './components/registration/change-of-matricule/change-of-matricule-add-edit/change-of-matricule-add-edit.component';
import {ChangeOfClassComponent} from './components/registration/change-of-class/change-of-class.component';
import {
  ChangeOfClassAddEditComponent
} from './components/registration/change-of-class/change-of-class-add-edit/change-of-class-add-edit.component';
import {ChangeOfRegimeComponent} from './components/registration/change-of-regime/change-of-regime.component';
import {
  ChangeOfRegimeAddEditComponent
} from './components/registration/change-of-regime/change-of-regime-add-edit/change-of-regime-add-edit.component';
import {ChangeOfOptionComponent} from './components/registration/change-of-option/change-of-option.component';
import {
  ChangeOfOptionAddEditComponent
} from './components/registration/change-of-option/change-of-option-add-edit/change-of-option-add-edit.component';
import {ResignationComponent} from './components/registration/resignation/resignation.component';
import {ResignationAddEditComponent} from './components/registration/resignation/resignation-add-edit/resignation-add-edit.component';
import {DismissalComponent} from './components/registration/dismissal/dismissal.component';
import {DismissalAddEditComponent} from './components/registration/dismissal/dismissal-add-edit/dismissal-add-edit.component';
import {PensionBracketComponent} from './components/configuration/pension-bracket/pension-bracket.component';
import {
  PensionBracketAddEditComponent
} from './components/configuration/pension-bracket/pension-bracket-add-edit/pension-bracket-add-edit.component';
import {SchoolClassComponent} from './components/configuration/school-class/school-class.component';
import {SchoolClassAddEditComponent} from './components/configuration/school-class/school-class-add-edit/school-class-add-edit.component';
import {ClassRoomComponent} from './components/configuration/class-room/class-room.component';
import {ClassRoomEditComponent} from './components/configuration/class-room/class-room-edit/class-room-edit.component';
import {ClassHourlyRateComponent} from './components/configuration/class-hourly-rate/class-hourly-rate.component';
import {
  ClassHourlyRateEditComponent
} from './components/configuration/class-hourly-rate/class-hourly-rate-edit/class-hourly-rate-edit.component';
import {ReadmissionComponent} from './components/registration/readmission/readmission.component';
import {ReadmissionAddEditComponent} from './components/registration/readmission/readmission-add-edit/readmission-add-edit.component';
import {
  StudCourseRegistrationStudentComponent
} from './components/registration/stud-course-registration/stud-course-registration-student/stud-course-registration-student.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatSortModule} from '@angular/material/sort';
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
import {SchoolYearAddEditComponent} from './components/configuration/school-year/school-year-add-edit/school-year-add-edit.component';
import {ImportCycleComponent} from './components/configuration/cycle/cycle-import/import-cycle.component';
import {ImportDepartmentComponent} from './components/configuration/department/department-import/import-department.component';
import {ImportOptionComponent} from './components/configuration/option/option-import/import-option.component';
import {ImportSpecialityComponent} from './components/configuration/speciality/speciality-import/import-speciality.component';
import {
  ImportStudentRegistrationComponent
} from './components/registration/student-registration/student-registration-import/import-student-registration.component';

@NgModule({
  declarations: [
    CampusComponent,
    CampusAddEditComponent,
    BuildingComponent,
    BuildingAddEditComponent,
    SchoolComponent,
    SchoolAddEditComponent,
    RoomComponent,
    RoomAddEditComponent,
    GuardianshipComponent,
    GuardianshipAddEditComponent,
    CycleComponent,
    CycleAddEditComponent,
    DepartmentComponent,
    DepartmentAddEditComponent,
    ProgramComponent,
    ProgramAddEditComponent,
    LevelComponent,
    LevelAddEditComponent,
    SpecialityComponent,
    SpecialityAddEditComponent,
    OptionComponent,
    OptionAddEditComponent,
    TrainingTypeComponent,
    TrainingTypeAddEditComponent,
    ClassCategoryComponent,
    ClassCategoryAddEditComponent,
    SchoolClassComponent,
    SchoolClassAddEditComponent,
    ClassRoomComponent,
    ClassRoomEditComponent,
    ClassHourlyRateComponent,
    ClassHourlyRateEditComponent,
    PensionSchemeComponent,
    PensionSchemeAddEditComponent,
    PensionBracketComponent,
    PensionBracketAddEditComponent,
    RegistrationFormComponent,
    RegistrationFormAddEditComponent,
    CostAreaComponent,
    CostAreaAddEditComponent,
    TuitionComponent,
    TuitionAddComponent,
    StudentRegistrationComponent,
    StudentRegistrationAddComponent,
    OldStudentRegistrationComponent,
    OldStudentRegistrationAddComponent,
    OldStudentRegistrationPerClassComponent,
    OldStudentRegistrationPerClassAddComponent,
    SchoolOfOriginComponent,
    SchoolOfOriginAddEditComponent,
    FamilyComponent,
    FamilyAddEditComponent,
    StudentComponent,
    StudentAddComponent,
    ImageAddEditComponent,
    ChangeOfMatriculeComponent,
    ChangeOfMatriculeAddEditComponent,
    ChangeOfClassComponent,
    ChangeOfClassAddEditComponent,
    ChangeOfRegimeComponent,
    ChangeOfRegimeAddEditComponent,
    ChangeOfOptionComponent,
    ChangeOfOptionAddEditComponent,
    ResignationComponent,
    ResignationAddEditComponent,
    DismissalComponent,
    DismissalAddEditComponent,
    ReadmissionComponent,
    ReadmissionAddEditComponent,
    SchoolYearComponent,
    SchoolYearAddEditComponent,
    StudCourseRegistrationStudentComponent,
    StudCourseRegistrationOpeningClosingComponent,
    StudCourseRegistrationAdminByStudentComponent,
    StudCourseRegistrationAdminByClassComponent,
    ImportCycleComponent,
    ImportDepartmentComponent,
    ImportOptionComponent,
    ImportSpecialityComponent,
    ImportStudentRegistrationComponent

  ],
  imports: [
    CommonModule,
    SchoolingRoutingModule,
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
export class SchoolingModule { }
