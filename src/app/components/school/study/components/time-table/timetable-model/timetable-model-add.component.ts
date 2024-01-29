import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {SpecialityService} from "../../../../schooling/services/configuration/speciality.service";
import {LevelService} from "../../../../schooling/services/configuration/level.service";
import {TrainingTypeService} from "../../../../schooling/services/configuration/training-type.service";
import {CycleService} from "../../../../schooling/services/configuration/cycle.service";
import {RoomService} from "../../../../schooling/services/configuration/room.service";
import {CampusService} from "../../../../schooling/services/configuration/campus.service";
import {TimeTableModelService} from "../../../services/time-table-model.service";
import {DayService} from "../../../../../setting/services/other-settings/day.service";
import {DatePipe} from "@angular/common";
import {TimeTablePeriodService} from "../../../services/time-table-period.service";

@Component({
  selector: 'app-timetable-model-add',
  templateUrl: './timetable-model-add.component.html',
  styleUrls: ['./timetable-model-add.component.scss']
})
export class TimetableModelAddComponent {

  timeTableModelForm: FormGroup;

    mainRooms: any[] = [];
    campus: any[] = [];
    cycles: any[] = [];
    specialities: any[] = [];
    specialitiesFiltered: any[] = [];
    levels: any[] = [];
    levelsFiltered: any[] = [];
    trainingTypes: any[] = [];
    timeTablePeriods: any[] = [];
    days: any[] = [];
    mainRoomSelected: number | undefined;
    timeTablePeriodSelected: number | undefined;
    daySelected: number | undefined;
    campusSelected: number | undefined;
    cycleSelected: number | undefined;
    specialitySelected: number | undefined;
    levelSelected: number | undefined;
    trainingTypeSelected: number | undefined;
  saving = false;

  public data: any;

  minEndDate: string;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private timetablemodelService: TimeTableModelService,
              private mainRoomService: RoomService,
              private dayService: DayService,
              private campusService: CampusService,
              private cycleService: CycleService,
              private specialityService: SpecialityService,
              private levelService: LevelService,
              private trainingTypeService: TrainingTypeService,
              private tablePeriodService: TimeTablePeriodService,
              private translate: TranslateService,
              private toastr: ToastrService,
              private router: Router,
              public route: Router,
              private datePipe: DatePipe,
  ) {
    this.timeTableModelForm = this.fb.group({

        name: ['', [Validators.required, Validators.minLength(3)]],
        speciality: ['', [Validators.required]],
        level: ['', [Validators.required]],
        trainingType: ['', [Validators.required]],
        // mainRoom: '',
        cycle: '',
        timeTablePeriod: '',
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        campus: '',
        days: '',
        monday: [false],
        tuesday: [false],
        wednesday: [false],
        thursday: [false],
        friday: [false],
        saturday: [false],
        sunday: [false],
        mondayStart: null,
        mondayEnd: null,
        tuesdayStart: null,
        tuesdayEnd: null,
        wednesdayStart: null,
        wednesdayEnd: null,
        thursdayStart: null,
        thursdayEnd: null,
        fridayStart: null,
        fridayEnd: null,
        saturdayStart: null,
        saturdayEnd: null,
        sundayStart: null,
        sundayEnd: null,
        isValidated: '',
        userValidated: '',
    });

    console.log(this.data);

  }


    ngOnInit() {
      console.log(this.data);

      if (!this.data){
            this.findAllDay();
            this.findAllCampus();
            this.findAllMainRoom();
            this.findAllCycle();
            this.findAllSpeciality();
            this.findAllLevel();
            this.findAllTrainingType();
            this.findAllTimeTablePeriod();
        }

      this.timetablemodelService.currentTimeTableModel.subscribe(res => {
          if (res) {
              console.log(res);
              console.log(res.mondayEnd);
              this.data = res;
              this.timeTableModelForm.patchValue(res);
              // this.daySelected = res.day['@id'];
              this.campusSelected = res.campus['@id'];
              // this.mainRoomSelected = res.mainRoom['@id'];
              this.cycleSelected = res.cycle['@id'];
              this.specialitySelected = res.speciality['@id'];
              this.levelSelected = res.level['@id'];
              this.trainingTypeSelected = res.trainingType['@id'];
              this.timeTablePeriodSelected = res.timeTablePeriod['@id'];

              const mondayStart = this.datePipe.transform(res.mondayStart, 'HH:mm', 'UTC');
              this.timeTableModelForm.get('mondayStart')?.setValue(mondayStart);

              const mondayEnd = this.datePipe.transform(res.mondayEnd, 'HH:mm', 'UTC');
              this.timeTableModelForm.get('mondayEnd')?.setValue(mondayEnd);

              const tuesdayStart = this.datePipe.transform(res.tuesdayStart, 'HH:mm', 'UTC');
              this.timeTableModelForm.get('tuesdayStart')?.setValue(tuesdayStart);

              const tuesdayEnd = this.datePipe.transform(res.tuesdayEnd, 'HH:mm', 'UTC');
              this.timeTableModelForm.get('tuesdayEnd')?.setValue(tuesdayEnd);

              const wednesdayStart = this.datePipe.transform(res.wednesdayStart, 'HH:mm', 'UTC');
              this.timeTableModelForm.get('wednesdayStart')?.setValue(wednesdayStart);

              const wednesdayEnd = this.datePipe.transform(res.wednesdayEnd, 'HH:mm', 'UTC');
              this.timeTableModelForm.get('wednesdayEnd')?.setValue(wednesdayEnd);

              const thursdayStart = this.datePipe.transform(res.thursdayStart, 'HH:mm', 'UTC');
              this.timeTableModelForm.get('thursdayStart')?.setValue(thursdayStart);

              const thursdayEnd = this.datePipe.transform(res.thursdayEnd, 'HH:mm', 'UTC');
              this.timeTableModelForm.get('thursdayEnd')?.setValue(thursdayEnd);

              const fridayStart = this.datePipe.transform(res.fridayStart, 'HH:mm', 'UTC');
              this.timeTableModelForm.get('fridayStart')?.setValue(fridayStart);

              const fridayEnd = this.datePipe.transform(res.fridayEnd, 'HH:mm', 'UTC');
              this.timeTableModelForm.get('fridayEnd')?.setValue(fridayEnd);

              const saturdayStart = this.datePipe.transform(res.saturdayStart, 'HH:mm', 'UTC');
              this.timeTableModelForm.get('saturdayStart')?.setValue(saturdayStart);

              const saturdayEnd = this.datePipe.transform(res.saturdayEnd, 'HH:mm', 'UTC');
              this.timeTableModelForm.get('saturdayEnd')?.setValue(saturdayEnd);

              const sundayStart = this.datePipe.transform(res.sundayStart, 'HH:mm', 'UTC');
              this.timeTableModelForm.get('sundayStart')?.setValue(sundayStart);

              const sundayEnd = this.datePipe.transform(res.sundayEnd, 'HH:mm', 'UTC');
              this.timeTableModelForm.get('sundayEnd')?.setValue(sundayEnd);

              const startDate = this.datePipe.transform(this.data.startDate, 'yyyy-MM-dd');
              this.timeTableModelForm.get('startDate')?.setValue(startDate);

              const endDate = this.datePipe.transform(this.data.endDate, 'yyyy-MM-dd');
              this.timeTableModelForm.get('endDate')?.setValue(endDate);

          }
      });

    }

  get fc(): any {
    return this.timeTableModelForm.controls;
  }

    close() {
        this.timeTableModelForm.reset();
        this.timetablemodelService.changeTimeTableModel(null);
    }

    onStartDateChange(event: any) {
      this.minEndDate = event.target.value;
    }



  onFormSubmit(): any {
    this.isSubmitted = true;
    console.log('submit');
    if (this.timeTableModelForm.valid){
        console.log(this.timeTableModelForm.value);
        this.saving = true;
        if (this.data){
          this.timeTableModelForm.get('isValidated')?.setValue(this.timeTableModelForm.get('isValidated')?.value === true);

          this.timeTableModelForm.get('isTeacherAvailable')?.setValue(this.timeTableModelForm.get('isTeacherAvailable')?.value === true);
          this.timeTableModelForm.get('isRoomAvailable')?.setValue(this.timeTableModelForm.get('isRoomAvailable')?.value === true);
            // tslint:disable-next-line:max-line-length
          this.timeTableModelForm.get('isHourlyVolumeAvailable')?.setValue(this.timeTableModelForm.get('isHourlyVolumeAvailable')?.value === true);
          this.timetablemodelService.put(this.data.id, this.timeTableModelForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Time Table Model edited with success !', 'Success');
            this.router.navigate(['/school/study/timetable-model']);
            this.timeTableModelForm.reset();
            this.timetablemodelService.changeTimeTableModel(null);
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {

          }
        });
      }
      else {
          this.timeTableModelForm.get('isValidated')?.setValue(this.timeTableModelForm.get('isValidated')?.value === true);

          this.timeTableModelForm.get('isTeacherAvailable')?.setValue(this.timeTableModelForm.get('isTeacherAvailable')?.value === true);
          this.timeTableModelForm.get('isRoomAvailable')?.setValue(this.timeTableModelForm.get('isRoomAvailable')?.value === true);
          this.timeTableModelForm.get('isHourlyVolumeAvailable')?.setValue(this.timeTableModelForm.get('isHourlyVolumeAvailable')?.value === true);
          this.timetablemodelService.post(this.timeTableModelForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Time Table Model created with success !', 'Success');
            this.router.navigate(['/school/study/timetable-model']);
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {

          }
        });
      }
    }
  }



    findAllDay(): any{
    this.dayService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.days = data['hydra:member'];
          this.days = this.days.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

    findAllCampus(): any{
    this.campusService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.campus = data['hydra:member'];
          this.campus = this.campus.map((v) => {
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

  findAllCycle(): any{
    this.cycleService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.cycles = data['hydra:member'];
          this.cycles = this.cycles.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

    applyCycleFilter(event: any){
        console.log('BJR');
        this.specialitiesFiltered = this.specialities.filter((specialities: any) => specialities.cycle['@id'] === this.cycleSelected);
    }


  findAllSpeciality(): any{
    this.specialityService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.specialities = data['hydra:member'];
          this.specialities = this.specialities.map((v) => {
            v.id = v['@id'];
            return v;
          });
          this.specialitiesFiltered = this.specialities;
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

    findAllTimeTablePeriod(): any{
    this.tablePeriodService.getCollection().subscribe((data: any) => {
          console.log(data);
          this.timeTablePeriods = data['hydra:member'];
          this.timeTablePeriods = this.timeTablePeriods.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }


}
