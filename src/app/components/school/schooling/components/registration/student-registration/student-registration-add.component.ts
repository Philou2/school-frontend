import {ChangeDetectorRef, Component, ViewChild, Input} from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {StudRegistrationService} from 'src/app/components/school/schooling/services/registration/stud-registration.service';
import {SchoolYearService} from '../../../services/configuration/school-year.service';
import {SchoolClassService} from '../../../services/configuration/school-class.service';
import {CountryService} from 'src/app/components/setting/services/location/country.service';
import {ReligionService} from 'src/app/components/setting/services/person/religion.service';
import {DiplomaService} from 'src/app/components/school/exam/services/configuration/diploma.service';
import {SchoolService} from '../../../services/configuration/school.service';
import {RepeatingService} from '../../../services/configuration/repeating.service';
import {RegimeService} from '../../../services/configuration/regime.service';
import {OptionService} from '../../../services/configuration/option.service';
import {SexService} from 'src/app/components/setting/services/person/sex.service';
import {BloodGroupService} from 'src/app/components/setting/services/person/blood-group.service';
import {RhesusService} from 'src/app/components/setting/services/person/rhesus.service';
import {CivilityService} from 'src/app/components/setting/services/person/civility.service';
import {CycleService} from '../../../services/configuration/cycle.service';
import {SpecialityService} from '../../../services/configuration/speciality.service';
import {LevelService} from '../../../services/configuration/level.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe, formatDate} from '@angular/common';

@Component({
    selector: 'app-student-registration-add',
    templateUrl: './student-registration-add.component.html',
    styleUrls: ['./student-registration-add.component.scss']
})

export class StudentRegistrationAddComponent {

    studRegistrationForm: FormGroup;
    registrationForm: FormGroup;
    years: any[] = [];
    classes: any[] = [];
    classesFiltered: any[] = [];
    countries: any[] = [];
    religions: any[] = [];
    diplomas: any[] = [];
    schools: any[] = [];
    regimes: any[] = [];
    options: any[] = [];
    sexes: any[] = [];
    repeatings: any[] = [];
    bloodGroups: any[] = [];
    rhesuses: any[] = [];
    cycles: any[] = [];
    specialities: any[] = [];
    levels: any[] = [];
    levelsFiltered: any[] = [];
    civilities: any[] = [];

    yearSelected: number | undefined;
    classSelected: number | undefined;
    countrySelected: number | undefined;
    religionSelected: number | undefined;
    diplomaSelected: number | undefined;
    schoolSelected: number | undefined;
    regimeSelected: number | undefined;
    optionSelected: number | undefined;
    sexSelected: number | undefined;
    repeatingSelected: number | undefined;
    bloodGroupSelected: number | undefined;
    rhesusSelected: number | undefined;
    cycleSelected: number | undefined;
    specialitySelected: number | undefined;
    levelSelected: number | undefined;
    civilitySelected: number | undefined;
    saving = false;

    public data: any;

    isSubmitted = false;
    hasSchoolMark = false;
    update = this.translate.instant('Update');
    create = this.translate.instant('Save');

    @ViewChild(DatatableComponent) table: DatatableComponent;
    changeDetectorRefs: ChangeDetectorRef[] = [];

    studentStep = false;
    studentStep1 = false;
    registrationStep = false;
    step = 1;

    constructor(private fb: FormBuilder,
                private studRegistrationService: StudRegistrationService,
                private schoolYearService: SchoolYearService,
                private schoolClassService: SchoolClassService,
                private schoolService: SchoolService,
                private countryService: CountryService,
                private religionService: ReligionService,
                private diplomaService: DiplomaService,
                private regimeService: RegimeService,
                private optionService: OptionService,
                private sexService: SexService,
                private repeatingService: RepeatingService,
                private bloodGroupService: BloodGroupService,
                private rhesusService: RhesusService,
                private cycleService: CycleService,
                private specialityService: SpecialityService,
                private levelService: LevelService,
                private civilityService: CivilityService,
                private translate: TranslateService,
                private toastr: ToastrService,
                private router: Router,
                private datePipe: DatePipe
    ) {
        this.studRegistrationForm = this.fb.group({
            year: [null, [Validators.required]],
            matricule: ['', [Validators.required, Validators.minLength(5)]],
            othermatricule: '',
            internalmatricule: '',
            name: ['', [Validators.required, Validators.minLength(3)]],
            firstName: '',
            dob: ['', [Validators.required]],
            bornAround: null,
            pob: '',
            sex: [null, [Validators.required]],
            country: [null, [Validators.required]],
            bloodgroup: [null],
            rhesus: [null],
            region: '',
            religion: [null],
            studentphone: '',
            studentemail: '',
            studentProfession: '',
            studentDistrict: '',
            studentAddress: '',
            studentTown: '',
            stutterer: '',
            leftHanded: '',
            hearingProblem: '',
            eyeProblem: '',
            vaccine: '',
            vaccineProhibited: '',
            medicalHistory: '',
            fathername: '',
            fatherphone: '',
            fatheremail: '',
            fatherprofession: '',
            mothername: '',
            motherphone: '',
            motheremail: '',
            motherprofession: '',
            guardianname: '',
            guardianphone: '',
            guardianemail: '',
            guardianprofession: '',
            partnerName: '',
            partnerPhone: '',
            partnerEmail: '',
            partnerProfession: '',
            civility: '',
            numberOfChildren: '',

            diploma: [''],
            center: [''],
            pvdiplome: [''],
            pvselection: [''],
            average: [''],
            ranks: [''],
        });
        this.registrationForm = this.fb.group({
            school: [null, [Validators.required]],
            cycle: [''],
            classe: [null, [Validators.required]],
            regime: '',
            speciality: [''],
            level: [''],
            options: '',
            registrationdate: [null],
            repeating: '',
            elementsprovided: '',

        });

    }

    ngOnInit() {
        this.studRegistrationService.currentStudRegistration.subscribe(data => {
            if (data) {
                this.data = data;

                console.log(data);
                const student = data.student;
                console.log(this.studRegistrationForm.get('dob'));
                this.studRegistrationForm.patchValue(data);
                this.hasSchoolMark=this.data.hasSchoolMark;
                console.log(this.hasSchoolMark);
                this.yearSelected = data.student ? data.student.year : null;
                this.classSelected = data.classe ? data.classe['@id'] : null;
                this.countrySelected = data.country ? data.country['@id'] : null;
                this.religionSelected = data.religion ? data.religion['@id'] : null;
                this.diplomaSelected = data.diploma ? data.diploma['@id'] : null;
                this.schoolSelected = data.school ? data.school['@id'] : null;
                this.regimeSelected = data.regime ? data.regime['@id'] : null;
                this.optionSelected = data.options ? data.options['@id'] : null;
                this.sexSelected = data.sex ? data.sex['@id'] : null;
                this.repeatingSelected = data.repeating ? data.repeating['@id'] : null;
                this.bloodGroupSelected = data.bloodgroup ? data.bloodgroup['@id'] : null;
                this.rhesusSelected = data.rhesus ? data.rhesus['@id'] : null;
                this.specialitySelected = data.speciality ? data.speciality['@id'] : null;
                this.levelSelected = data.level ? data.level['@id'] : null;
                this.cycleSelected = data.cycle ? data.cycle['@id'] : null;
                this.civilitySelected = data.civility ? data.civility['@id'] : null;

                this.studRegistrationForm.get('matricule')?.setValue(student.matricule);
                this.studRegistrationForm.get('othermatricule')?.setValue(student.othermatricule);
                this.studRegistrationForm.get('internalmatricule')?.setValue(student.internalmatricule);
                this.studRegistrationForm.get('name')?.setValue(student.name);
                this.studRegistrationForm.get('firstName')?.setValue(student.firstName);
                this.studRegistrationForm.get('pob')?.setValue(student.pob);
                const dob = this.datePipe.transform(student.dob, 'yyyy-MM-dd');
                this.studRegistrationForm.get('dob')?.setValue(dob);
                const bornAround = this.datePipe.transform(student.bornAround, 'yyyy-MM-dd');
                this.studRegistrationForm.get('bornAround')?.setValue(bornAround);
                this.studRegistrationForm.get('region')?.setValue(student.region);
                this.studRegistrationForm.get('studentphone')?.setValue(student.studentphone);
                this.studRegistrationForm.get('studentemail')?.setValue(student.studentemail);
                this.studRegistrationForm.get('studentProfession')?.setValue(student.studentProfession);
                this.studRegistrationForm.get('studentDistrict')?.setValue(student.studentDistrict);
                this.studRegistrationForm.get('studentAddress')?.setValue(student.studentAddress);
                this.studRegistrationForm.get('studentTown')?.setValue(student.studentTown);
                this.studRegistrationForm.get('stutterer')?.setValue(student.stutterer ? '0' : '1');
                this.studRegistrationForm.get('leftHanded')?.setValue(student.leftHanded ? '0' : '1');
                this.studRegistrationForm.get('hearingProblem')?.setValue(student.hearingProblem ? '0' : '1');
                this.studRegistrationForm.get('eyeProblem')?.setValue(student.eyeProblem ? '0' : '1');
                this.studRegistrationForm.get('vaccine')?.setValue(student.vaccine);
                this.studRegistrationForm.get('vaccineProhibited')?.setValue(student.vaccineProhibited);
                this.studRegistrationForm.get('medicalHistory')?.setValue(student.medicalHistory);
                this.studRegistrationForm.get('fathername')?.setValue(student.fathername);
                this.studRegistrationForm.get('fatheremail')?.setValue(student.fatheremail);
                this.studRegistrationForm.get('fatherphone')?.setValue(student.fatherphone);
                this.studRegistrationForm.get('fatherprofession')?.setValue(student.fatherprofession);
                this.studRegistrationForm.get('mothername')?.setValue(student.mothername);
                this.studRegistrationForm.get('motheremail')?.setValue(student.motheremail);
                this.studRegistrationForm.get('motherphone')?.setValue(student.motherphone);
                this.studRegistrationForm.get('motherprofession')?.setValue(student.motherprofession);
                this.studRegistrationForm.get('guardianname')?.setValue(student.guardianname);
                this.studRegistrationForm.get('guardianemail')?.setValue(student.guardianemail);
                this.studRegistrationForm.get('guardianphone')?.setValue(student.guardianphone);
                this.studRegistrationForm.get('guardianprofession')?.setValue(student.guardianprofession);
                this.studRegistrationForm.get('partnerName')?.setValue(student.partnerName);
                this.studRegistrationForm.get('partnerPhone')?.setValue(student.partnerPhone);
                this.studRegistrationForm.get('partnerEmail')?.setValue(student.partnerEmail);
                this.studRegistrationForm.get('partnerProfession')?.setValue(student.partnerProfession);
                this.studRegistrationForm.get('numberOfChildren')?.setValue(student.numberOfChildren);

                if (this.data.hasSchoolMark){
                    this.studRegistrationForm.get('year')?.disable();
                    this.registrationForm.get('classe')?.disable();
                    this.registrationForm.get('school')?.disable();
                }
            }
        });



        this.findAllYear();
        this.findAllClass();
        this.findAllCountry();
        this.findAllReligion();
        this.findAllDiploma();
        this.findAllSchool();
        this.findAllRegime();
        this.findAllOption();
        this.findAllSex();
        this.findAllRepeating();
        this.findAllBloodGroup();
        this.findAllRhesus();
        this.findAllSpeciality();
        this.findAllLevel();
        this.findAllCycle();
        this.findAllCivility();
    }

    get fc(): any {
        return this.studRegistrationForm.controls;
    }
    get student() { return this.studRegistrationForm.controls; }

    get registration() { return this.registrationForm.controls; }


    next() {
        if (this.step >= 1 && this.step <= 5) {
            this.studentStep = true;
            this.registrationStep = false;
            console.log(this.registrationStep);
            console.log(this.studentStep);
            console.log(this.step);
            if (this.studRegistrationForm.invalid) { return; }
            this.step++;
        } else if (this.step === 6) {
            this.registrationStep = true;
            console.log(this.registrationStep);
            console.log(this.studentStep);
            console.log(this.step);
            if (this.registrationForm.invalid) { return; }
            this.step++;
        }
    }

    previous() {
        this.step--;

        if (this.step >= 1 && this.step <= 4) {
            this.studentStep = true;
            this.registrationStep = false;
        } else if (this.step >= 5 && this.step <= 6) {
            this.studentStep = false;
            this.registrationStep = true;
        }
    }

    close() {
        this.studRegistrationForm.reset();
        this.studRegistrationService.changeStudRegistration(null);
    }

    getIdFromApiResourceId(apiResourceId: string | undefined) {
        return apiResourceId ? apiResourceId.substring(apiResourceId.lastIndexOf('/') + 1) : '';
    }


    onFormSubmit(): any {
        if (this.step === 6) {
            console.log(this.step);
            this.registrationStep = true;
            if (this.registrationForm.invalid) {
                console.log(this.registrationForm.invalid);
                return;
            }
        }
        if (this.studRegistrationForm.value.average === '') {
            this.studRegistrationForm.patchValue({average: 0});
        }
        if (this.studRegistrationForm.value.numberOfChildren === '') {
            this.studRegistrationForm.patchValue({numberOfChildren: 0});
        }

        this.isSubmitted = true;
        if (this.studRegistrationForm.valid){
            this.saving = true;
            console.log(this.studRegistrationForm.value);
            if (this.studRegistrationForm.valid && this.registrationForm.valid) {
                this.saving = true;
                const mergedFormValue = {...this.studRegistrationForm.value, ...this.registrationForm.value};
                console.log(mergedFormValue);
                if (this.data) {
                    console.log(this.data);

                    this.studRegistrationForm.get('stutterer')?.setValue(this.studRegistrationForm.get('stutterer')?.value === '1');
                    this.studRegistrationForm.get('leftHanded')?.setValue(this.studRegistrationForm.get('leftHanded')?.value === '1');
                    this.studRegistrationForm.get('hearingProblem')?.setValue(this.studRegistrationForm.get('hearingProblem')?.value === '1');
                    this.studRegistrationForm.get('eyeProblem')?.setValue(this.studRegistrationForm.get('eyeProblem')?.value === '1');
                    const value = {
                        ...mergedFormValue,
                        previousClass: this.data.classe.id,
                        previousSchool: this.data.school.id,
                        previousYear: this.getIdFromApiResourceId(this.data.student.year)
                    };
                    console.log(JSON.stringify(value));
                    this.studRegistrationService.put(this.data.id, value).subscribe({
                        next: (val: any) => {
                            this.toastr.success('Student Registration edited with success !', 'Success');
                            this.router.navigate(['/school/schooling/student-registration']);
                            this.studRegistrationForm.reset();
                            this.studRegistrationService.changeStudRegistration(null);

                        },
                        complete: () => {
                            this.saving = false;
                        },
                        error: (err: any) => {

                        }
                    });
                } else {
                    this.studRegistrationForm.get('stutterer')?.setValue(this.studRegistrationForm.get('stutterer')?.value === '1');
                    this.studRegistrationForm.get('leftHanded')?.setValue(this.studRegistrationForm.get('leftHanded')?.value === '1');
                    this.studRegistrationForm.get('hearingProblem')?.setValue(this.studRegistrationForm.get('hearingProblem')?.value === '1');
                    this.studRegistrationForm.get('eyeProblem')?.setValue(this.studRegistrationForm.get('eyeProblem')?.value === '1');
                    this.studRegistrationService.post(mergedFormValue).subscribe({
                        next: (val: any) => {
                            this.toastr.success('Student Registration created with success !', 'Success');
                            this.router.navigate(['/school/schooling/student-registration']);
                        },
                        complete: () => {
                            this.saving = false;
                        },
                        error: (err: any) => {

                        }
                    });
                }
            }
        }
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

    findAllSex(): any{
        this.sexService.getCollection().subscribe((data: any) => {
                console.log(data);
                this.sexes = data['hydra:member'];
                this.sexes = this.sexes.map((v) => {
                    v.id = v['@id'];
                    return v;
                });
            },
            error => console.log(error)
        );
    }

    findAllCountry(): any{
        this.countryService.getCollection().subscribe((data: any) => {
                console.log(data);
                this.countries = data['hydra:member'];
                this.countries = this.countries.map((v) => {
                    v.id = v['@id'];
                    return v;
                });
            },
            error => console.log(error)
        );
    }


    findAllReligion(): any{
        this.religionService.getCollection().subscribe((data: any) => {
                console.log(data);
                this.religions = data['hydra:member'];
                this.religions = this.religions.map((v) => {
                    v.id = v['@id'];
                    return v;
                });
            },
            error => console.log(error)
        );
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

    applySchoolFilter(event: any){
        this.classesFiltered = this.classes.filter((classes: any) => classes.school['@id'] === this.schoolSelected);
    }

    findAllClass(): any{
        this.schoolClassService.getCollection().subscribe((data: any) => {
                console.log(data);
                this.classes = data['hydra:member'];
                this.classes = this.classes.map((v) => {
                    v.id = v['@id'];
                    return v;
                });
                this.classesFiltered = this.classes;
            },
            error => console.log(error)
        );
    }


    findAllDiploma(): any{
        this.diplomaService.getCollection().subscribe((data: any) => {
                console.log(data);
                this.diplomas = data['hydra:member'];
                this.diplomas = this.diplomas.map((v) => {
                    v.id = v['@id'];
                    return v;
                });
            },
            error => console.log(error)
        );
    }

    findAllRegime(): any{
        this.regimeService.getCollection().subscribe((data: any) => {
                console.log(data);
                this.regimes = data['hydra:member'];
                this.regimes = this.regimes.map((v) => {
                    v.id = v['@id'];
                    return v;
                });
            },
            error => console.log(error)
        );
    }

    findAllOption(): any{
        this.optionService.getCollection().subscribe((data: any) => {
                console.log(data);
                this.options = data['hydra:member'];
                this.options = this.options.map((v) => {
                    v.id = v['@id'];
                    return v;
                });
            },
            error => console.log(error)
        );
    }


    findAllRepeating(): any{
        this.repeatingService.getCollection().subscribe((data: any) => {
                console.log(data);
                this.repeatings = data['hydra:member'];
                this.repeatings = this.repeatings.map((v) => {
                    v.id = v['@id'];
                    return v;
                });
            },
            error => console.log(error)
        );
    }

    findAllBloodGroup(): any{
        this.bloodGroupService.getCollection().subscribe((data: any) => {
                console.log(data);
                this.bloodGroups = data['hydra:member'];
                this.bloodGroups = this.bloodGroups.map((v) => {
                    v.id = v['@id'];
                    return v;
                });
            },
            error => console.log(error)
        );
    }

    findAllRhesus(): any{
        this.rhesusService.getCollection().subscribe((data: any) => {
                console.log(data);
                this.rhesuses = data['hydra:member'];
                this.rhesuses = this.rhesuses.map((v) => {
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

    findAllCivility(): any{
        this.civilityService.getCollection().subscribe((data: any) => {
                console.log(data);
                this.civilities = data['hydra:member'];
                this.civilities = this.civilities.map((v) => {
                    v.id = v['@id'];
                    return v;
                });
            },
            error => console.log(error)
        );
    }


}
