import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {SchoolClassService} from '../../../../services/configuration/school-class.service';
import {LevelService} from '../../../../services/configuration/level.service';
import {ClassCategoryService} from '../../../../services/configuration/class-category.service';
import {TrainingTypeService} from '../../../../services/configuration/training-type.service';
import {RoomService} from '../../../../services/configuration/room.service';
import {DepartmentService} from '../../../../services/configuration/department.service';
import {GuardianshipService} from '../../../../services/configuration/guardianship.service';
import {SpecialityService} from '../../../../services/configuration/speciality.service';
import {OptionService} from '../../../../services/configuration/option.service';
import {SchoolService} from '../../../../services/configuration/school.service';
import {SchoolYearService} from 'src/app/components/school/schooling/services/configuration/school-year.service';

@Component({
  selector: 'app-school-class-add-edit',
  templateUrl: './school-class-add-edit.component.html',
  styleUrls: ['./school-class-add-edit.component.scss']
})
export class SchoolClassAddEditComponent {

  schoolClassForm: FormGroup;
  years: any[] = [];
  schools: any[] = [];
  guardianships: any[] = [];
  departments: any[] = [];
  classCategories: any[] = [];
  specialities: any[] = [];
  levels: any[] = [];
  levelsFiltered: any[] = [];
  trainingTypes: any[] = [];
  mainRooms: any[] = [];
  registrantOptions: any[] = [];

  yearSelected: number | undefined;
  schoolSelected: number | undefined;
  guardianshipSelected: number | undefined;
  departmentSelected: number | undefined;
  classCategorySelected: number | undefined;
  specialitySelected: number | undefined;
  levelSelected: number | undefined;
  trainingTypeSelected: number | undefined;
  mainRoomSelected: number | undefined;
  registrantOptionSelected: number | undefined;

  saving = false;

  public data: any;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private schoolClassService: SchoolClassService,
              private translate: TranslateService,
              private toastr: ToastrService,
             // public activeModal: NgbActiveModal,
              public route: Router,
              private levelService: LevelService,
              private classCategoryService: ClassCategoryService,
              private trainingTypeService: TrainingTypeService,
              private mainRoomService: RoomService,
              private departmentService: DepartmentService,
              private guardianshipService: GuardianshipService,
              private specialityService: SpecialityService,
              private schoolYearService: SchoolYearService,
              private registrantOptionService: OptionService,
              private schoolService: SchoolService,
  ) {

    this.schoolClassForm = this.fb.group({
      year: ['', [Validators.required]],
      code: ['', [Validators.required, Validators.minLength(3)]],
      description: '',
      school: ['', [Validators.required]],
      guardianship: '',
      department: '',
      classCategory: '',
      speciality: '',
      level: '',
      trainingType: '',
      mainRoom: '',
      maximumStudentNumber: '',
      isOptional: '',
      registrantOption: '',
      classExam: '',
      ageLimit: '',
      simpleHourlyRate: '',
      multipleHourlyRate: '',
    });

  }

  ngOnInit(): void {
          this.schoolClassService.currentSchoolClass.subscribe(data => {
              if (data){
                  this.data = data;
                  this.schoolClassForm.patchValue(data);
                  this.yearSelected = data.year['@id'];
                  this.schoolSelected = data.school['@id'];
                  this.guardianshipSelected = data.guardianship['@id'];
                  this.departmentSelected = data.department['@id'];
                  this.classCategorySelected = data.classCategory['@id'];
                  this.specialitySelected = data.speciality['@id'];
                  this.levelSelected = data.level['@id'];
                  this.trainingTypeSelected = data.trainingType['@id'];
                  this.mainRoomSelected = data.mainRoom['@id'];
                  this.registrantOptionSelected = data.registrantOption['@id'];

                  this.schoolClassForm.get('isOptional')?.setValue(this.data.isOptional ? '1' : '0');
              }
          });
          this.findAllYear();
          this.findAllSchool();
          this.findAllGuardianship();
          this.findAllDepartment();
          this.findAllClassCategory();
          this.findAllSpeciality();
          this.findAllLevel();
          this.findAllTrainingType();
          this.findAllMainRoom();
          this.findAllRegistrantOption();
  }

  get fc(): any {
    return this.schoolClassForm.controls;
  }

    close() {
        this.schoolClassForm.reset();
        this.schoolClassService.changeSchoolClass(null);
    }

  onFormSubmit(): any {
    this.isSubmitted = true;
    console.log( JSON.stringify( this.schoolClassForm.value));
    if (this.schoolClassForm.valid) {
      this.saving = true;
      if (this.data) {
          this.schoolClassForm.get('isOptional')?.setValue(this.schoolClassForm.get('isOptional')?.value === '1');
          this.schoolClassService.put(this.data.id, this.schoolClassForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('School class edit with success !', 'Success');
            this.route.navigateByUrl('school/schooling/school-class');
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
                this.saving = false;
                if (v.propertyPath === this.schoolClassForm.get('code')) {
                this.schoolClassForm.get('code')?.setErrors({serverError: v.message});
              }

            });
          }
        });
      } else {
          this.schoolClassForm.get('isOptional')?.setValue(this.schoolClassForm.get('isOptional')?.value === '1');
          this.schoolClassService.post(this.schoolClassForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('School class create with success !', 'Success');
            this.route.navigateByUrl('school/schooling/school-class');
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) => {
            console.log(err);
            const errors: any[] = err.violations;

            errors.forEach((v) => {
                this.saving = false;
                if (v.propertyPath === 'code') {
                this.schoolClassForm.get('code')?.setErrors({serverError: v.message});
              }
            });
          }
        });
      }

    }
  }

  findAllSchool(): any{
    this.schoolService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.schools = data['hydra:member'];
          this.schools = this.schools.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

  findAllGuardianship(): any{
    this.guardianshipService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.guardianships = data['hydra:member'];
          this.guardianships = this.guardianships.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }
  findAllDepartment(): any{
    this.departmentService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.departments = data['hydra:member'];
          this.departments = this.departments.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }
  findAllClassCategory(): any{
    this.classCategoryService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.classCategories  = data['hydra:member'];
          this.classCategories = this.classCategories.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }
  findAllSpeciality(): any{
    this.specialityService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.specialities = data['hydra:member'];
          this.specialities = this.specialities.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }
    applySpecialityFilter(event: any){
        console.log('BJR');
        const specialityId = event;
        const speciality = this.specialities.find( (specialities: any) => specialities === specialityId);
        console.log(speciality);
        console.log(specialityId);
        const minimumLevel = speciality.minimumLevel;
        const maximumLevel = speciality.maximumLevel;
        console.log(minimumLevel['@id']);
        console.log(maximumLevel['@id']);
        console.log('BJR');
        this.levelsFiltered = this.levels.filter((level: any) => level.id === minimumLevel['@id'] || level.id === maximumLevel['@id']);
    }


  findAllLevel(): any{
    this.levelService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.levels = data['hydra:member'];
          this.levels = this.levels.map((v) => {
            v.id = v['@id'];
            return v;
          });
          this.levelsFiltered = this.levels;
        },
        error => console.log(error)
    );
  }
  findAllTrainingType(): any{
    this.trainingTypeService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.trainingTypes = data['hydra:member'];
          this.trainingTypes = this.trainingTypes.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }
  findAllMainRoom(): any{
    this.mainRoomService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.mainRooms = data['hydra:member'];
          this.mainRooms = this.mainRooms.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }
  findAllRegistrantOption(): any{
    this.registrantOptionService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.registrantOptions = data['hydra:member'];
          this.registrantOptions = this.registrantOptions.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }
  findAllYear(): any{
    this.schoolYearService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.years = data['hydra:member'];
          this.years = this.years.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

}



