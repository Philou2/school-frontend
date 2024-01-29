import {ChangeDetectorRef, Component, ViewChild, Input, Pipe} from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {CountryService} from 'src/app/components/setting/services/location/country.service';
import {ReligionService} from 'src/app/components/setting/services/person/religion.service';
import {SexService} from 'src/app/components/setting/services/person/sex.service';
import {RhesusService} from 'src/app/components/setting/services/person/rhesus.service';
import {CivilityService} from 'src/app/components/setting/services/person/civility.service';
import {DatePipe, formatDate} from '@angular/common';
import {TeacherService} from '../../../services/teacher.service';
import {SchoolYearService} from 'src/app/components/school/schooling/services/configuration/school-year.service';
import {BloodGroupService} from 'src/app/components/setting/services/person/blood-group.service';
import {DiplomaTypeService} from 'src/app/components/setting/services/school/diploma-type.service';
import {RegionService} from 'src/app/components/setting/services/location/region.service';
import {MaritalStatusService} from 'src/app/components/setting/services/person/marital-status.service';
import {EmploymentStatusService} from 'src/app/components/setting/services/hr/employment-status.service';
import {SubjectService} from '../../../services/subject.service';
import {IdentityTypeService} from 'src/app/components/setting/services/person/identity-type.service';

@Component({
    selector: 'app-teacher-add',
    templateUrl: './teacher-add.component.html',
    styleUrls: ['./teacher-add.component.scss']
})

export class TeacherAddComponent {

    teacherForm: FormGroup;
    years: any[] = [];
    countries: any[] = [];
    religions: any[] = [];
    regions: any[] = [];
    diplomas: any[] = [];
    sexes: any[] = [];
    bloodGroups: any[] = [];
    rhesuses: any[] = [];
    civilities: any[] = [];
    maritalStatus: any[] = [];
    employmentStatus: any[] = [];
    identityTypes: any[] = [];
    subjects: any[] = [];

    yearSelected: number | undefined;
    countrySelected: number | undefined;
    religionSelected: number | undefined;
    regionSelected: number | undefined;
    sexSelected: number | undefined;
    bloodGroupSelected: number | undefined;
    rhesusSelected: number | undefined;
    civilitySelected: number | undefined;
    diplomaSelected: number | undefined;
    maritalStatusSelected: number | undefined;
    employmentStatusSelected: number | undefined;
    subjectSelected: number | undefined;
    identityTypeSelected: number | undefined;
    saving = false;

    public data: any;

    isSubmitted = false;
    update = this.translate.instant('Update');
    create = this.translate.instant('Save');

    @ViewChild(DatatableComponent) table: DatatableComponent;
    changeDetectorRefs: ChangeDetectorRef[] = [];

    studentStep = false;
    studentStep1 = false;
    registrationStep = false;
    step = 1;

    constructor(private fb: FormBuilder,
                private teacherService: TeacherService,
                private schoolYearService: SchoolYearService,
                private countryService: CountryService,
                private religionService: ReligionService,
                private regionService: RegionService,
                private diplomaService: DiplomaTypeService,
                private sexService: SexService,
                private bloodGroupService: BloodGroupService,
                private rhesusService: RhesusService,
                private civilityService: CivilityService,
                private maritalStatusService: MaritalStatusService,
                private employmentStatusService: EmploymentStatusService,
                private subjectService: SubjectService,
                private identityTypeService: IdentityTypeService,
                private translate: TranslateService,
                private toastr: ToastrService,
                private router: Router,
                private datePipe: DatePipe,
    ) {
        this.teacherForm = this.fb.group({
            year: ['', [Validators.required]],
            registrationNumber: ['', [Validators.required, Validators.minLength(3)]],
            name: ['', [Validators.required, Validators.minLength(2)]],
            firstName: '',
            dob: ['', [Validators.required]],
            bornTowards: null,
            pob: '',
            sex: [null, [Validators.required]],
            civility: [null, [Validators.required]],
            country: [null, [Validators.required]],
            religion: '',
            diploma: '',
            regionOrigin: '',
            phone: '',
            email: [''],
            occupation: '',
            quarter: '',
            city: '',
            address: '',
            bloodGroup: '',
            rhesus: '',
            isStammerer: false,
            isLeftHanded: false,
            isHearingProblem: false,
            isVisionProblem: false,
            vaccines: '',
            prohibited: '',
            medicalHistory: '',
            fatherName: '',
            fatherPhone: '',
            fatherEmail: '',
            fatherOccupation: '',
            fatherCityResidence: '',
            motherName: '',
            motherPhone: '',
            motherEmail: '',
            motherOccupation: '',
            motherCityResidence: '',
            partnerName: '',
            partnerPhone: '',
            partnerEmail: '',
            partnerOccupation: '',
            partnerCityResidence: '',
            maritalStatus: '',
            numberOfChildren: '',
            speciality: '',
            employmentStatus: '',
            baseSalary: '',
            hourlyRate: '',
            subject: '',
            taxCode: '',
            socialCode: '',
            identityType: [''],
            idNumber: '',
            placeOfIssue: '',
            issueAt: '',
            expirationAt: '',
        });

    }

    ngOnInit() {
        this.teacherService.currentTeacher.subscribe(data => {
            if (data) {
                this.data = data;
                console.log(data);

                console.log(this.teacherForm.get('dob'));
                this.teacherForm.patchValue(data);
                this.yearSelected = data.year ? data.year['@id'] : null;
                this.countrySelected = data.country ? data.country['@id'] : null;
                this.religionSelected = data.religion ? data.religion['@id'] : null;
                this.regionSelected = data.regionOrigin ? data.regionOrigin['@id'] : null;
                this.sexSelected = data.sex ? data.sex['@id'] : null;
                this.bloodGroupSelected = data.bloodGroup ? data.bloodGroup['@id'] : null;
                this.rhesusSelected = data.rhesus ? data.rhesus['@id'] : null;
                this.diplomaSelected = data.diploma ? data.diploma['@id'] : null;
                this.civilitySelected = data.civility ? data.civility['@id'] : null;
                this.maritalStatusSelected = data.maritalStatus ? data.maritalStatus['@id'] : null;
                this.employmentStatusSelected = data.employmentStatus ? data.employmentStatus['@id'] : null;
                this.subjectSelected = data.subject ? data.subject['@id'] : null;
                this.identityTypeSelected = data.identityType ? data.identityType['@id'] : null;

                this.teacherForm.get('stutterer')?.setValue(data.stutterer ? '1' : '0');
                this.teacherForm.get('leftHanded')?.setValue(data.leftHanded ? '1' : '0');
                this.teacherForm.get('hearingProblem')?.setValue(data.hearingProblem ? '1' : '0');
                this.teacherForm.get('eyeProblem')?.setValue(data.eyeProblem ? '1' : '0');

                const dob = this.datePipe.transform(data.dob, 'yyyy-MM-dd');
                this.teacherForm.get('dob')?.setValue(dob);

                const bornTowards = this.datePipe.transform(data.bornTowards, 'yyyy-MM-dd');
                this.teacherForm.get('bornTowards')?.setValue(bornTowards);

                const issueAt = this.datePipe.transform(data.issueAt, 'yyyy-MM-dd');
                this.teacherForm.get('issueAt')?.setValue(issueAt);

                const expirationAt = this.datePipe.transform(data.expirationAt, 'yyyy-MM-dd');
                this.teacherForm.get('expirationAt')?.setValue(expirationAt);
            }
        });



        this.findAllYear();
        this.findAllCountry();
        this.findAllReligion();
        this.findAllDiploma();
        this.findAllSex();
        this.findAllBloodGroup();
        this.findAllRhesus();
        this.findAllCivility();
        this.findAllMaritalStatus();
        this.findAllEmploymentStatus();
        this.findAllSubject();
        this.findAllIdentityType();
        this.findAllRegionOrigin();
    }

    get fc(): any {
        return this.teacherForm.controls;
    }
    get student() { return this.teacherForm.controls; }

    get registration() { return this.teacherForm.controls; }


    next() {
        if (this.step >= 1 && this.step <= 5) {
            this.studentStep = true;
            this.registrationStep = false;
            console.log(this.registrationStep);
            console.log(this.studentStep);
            console.log(this.step);
            if (this.teacherForm.invalid) { return; }
            this.step++;
        } else if (this.step === 6) {
            this.registrationStep = true;
            console.log(this.registrationStep);
            console.log(this.studentStep);
            console.log(this.step);
            if (this.teacherForm.invalid) { return; }
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
        this.teacherForm.reset();
        this.teacherService.changeTeacher(null);
    }



    onFormSubmit(): any {
        if (this.step === 6) {
            console.log(this.step);
            this.registrationStep = true;
            if (this.teacherForm.invalid) {
                console.log(this.teacherForm.invalid);
                return;
            }
        }
        if (this.teacherForm.value.baseSalary === '') {
            this.teacherForm.patchValue({baseSalary: 0});
        }
        if (this.teacherForm.value.hourlyRate === '') {
            this.teacherForm.patchValue({hourlyRate: 0});
        }
        if (this.teacherForm.value.numberOfChildren === '') {
            this.teacherForm.patchValue({numberOfChildren: 0});
        }

        this.isSubmitted = true;
        if (this.teacherForm.valid){
            this.saving = true;
            console.log(this.teacherForm.value);
            if (this.teacherForm.valid && this.teacherForm.valid) {
                this.saving = true;
                if (this.data) {
                    this.teacherForm.get('isStammerer')?.setValue(this.teacherForm.get('isStammerer')?.value === true);
                    this.teacherForm.get('isLeftHanded')?.setValue(this.teacherForm.get('isLeftHanded')?.value === true);
                    this.teacherForm.get('isHearingProblem')?.setValue(this.teacherForm.get('isHearingProblem')?.value === true);
                    this.teacherForm.get('isVisionProblem')?.setValue(this.teacherForm.get('isVisionProblem')?.value === true);
                    this.teacherService.put(this.data.id, this.teacherForm.value).subscribe({
                        next: (val: any) => {
                            this.saving = false;
                            this.toastr.success('Teacher edited successfully !', 'Success');
                            this.router.navigate(['/school/study/teacher']);
                            this.teacherForm.reset();
                            this.teacherService.changeTeacher(null);

                        },
                        complete: () => {
                        },
                        error: (err: any) => {

                        }
                    });
                } else {
                    this.teacherForm.get('isStammerer')?.setValue(this.teacherForm.get('isStammerer')?.value === true);
                    this.teacherForm.get('isLeftHanded')?.setValue(this.teacherForm.get('isLeftHanded')?.value === true);
                    this.teacherForm.get('isHearingProblem')?.setValue(this.teacherForm.get('isHearingProblem')?.value === true);
                    this.teacherForm.get('isVisionProblem')?.setValue(this.teacherForm.get('isVisionProblem')?.value === true);
                    this.teacherService.post(this.teacherForm.value).subscribe({
                        next: (val: any) => {
                            this.saving = false;
                            this.toastr.success('Teacher created successfully !', 'Success');
                            this.router.navigate(['/school/study/teacher']);
                        },
                        complete: () => {
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
    findAllRegionOrigin(): any{
        this.regionService.getCollection().subscribe((data: any) => {
                console.log(data);
                this.regions = data['hydra:member'];
                this.regions = this.regions.map((v) => {
                    v.id = v['@id'];
                    return v;
                });
            },
            error => console.log(error)
        );
    }
    findAllMaritalStatus(): any{
        this.maritalStatusService.getCollection().subscribe((data: any) => {
                console.log(data);
                this.maritalStatus = data['hydra:member'];
                this.maritalStatus = this.maritalStatus.map((v) => {
                    v.id = v['@id'];
                    return v;
                });
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
    findAllEmploymentStatus(): any{
        this.employmentStatusService.getCollection().subscribe((data: any) => {
                console.log(data);
                this.employmentStatus = data['hydra:member'];
                this.employmentStatus = this.employmentStatus.map((v) => {
                    v.id = v['@id'];
                    return v;
                });
            },
            error => console.log(error)
        );
    }
    findAllIdentityType(): any{
        this.identityTypeService.getCollection().subscribe((data: any) => {
                console.log(data);
                this.identityTypes = data['hydra:member'];
                this.identityTypes = this.identityTypes.map((v) => {
                    v.id = v['@id'];
                    return v;
                });
            },
            error => console.log(error)
        );
    }
    findAllSubject(): any{
        this.subjectService.getCollection().subscribe((data: any) => {
                console.log(data);
                this.subjects = data['hydra:member'];
                this.subjects = this.subjects.map((v) => {
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
