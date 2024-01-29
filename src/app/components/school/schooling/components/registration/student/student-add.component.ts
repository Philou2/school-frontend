import {ChangeDetectorRef, Component, ViewChild, Input} from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {StudentService} from 'src/app/components/school/schooling/services/registration/student.service';
import {StudRegistrationService} from 'src/app/components/school/schooling/services/registration/stud-registration.service';
import {SchoolYearService} from '../../../services/configuration/school-year.service';
import {CountryService} from 'src/app/components/setting/services/location/country.service';
import {ReligionService} from 'src/app/components/setting/services/person/religion.service';
import {SexService} from 'src/app/components/setting/services/person/sex.service';
import {BloodGroupService} from 'src/app/components/setting/services/person/blood-group.service';
import {RhesusService} from 'src/app/components/setting/services/person/rhesus.service';
import {CivilityService} from 'src/app/components/setting/services/person/civility.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe, formatDate} from '@angular/common';

@Component({
    selector: 'app-student-add',
    templateUrl: './student-add.component.html',
    styleUrls: ['./student-add.component.scss']
})

export class StudentAddComponent {

    studentForm: FormGroup;
    years: any[] = [];
    countries: any[] = [];
    religions: any[] = [];
    sexes: any[] = [];
    bloodGroups: any[] = [];
    rhesuses: any[] = [];
    civilities: any[] = [];

    yearSelected: number | undefined;
    countrySelected: number | undefined;
    religionSelected: number | undefined;
    sexSelected: number | undefined;
    bloodGroupSelected: number | undefined;
    rhesusSelected: number | undefined;
    civilitySelected: number | undefined;
    saving = false;

    public data: any;

    isSubmitted = false;
    update = this.translate.instant('Update');
    create = this.translate.instant('Save');

    @ViewChild(DatatableComponent) table: DatatableComponent;
    changeDetectorRefs: ChangeDetectorRef[] = [];

    studentStep = false;
    studentStep1 = false;
    step = 1;

    constructor(private fb: FormBuilder,
                private studentService: StudentService,
                private studRegistrationService: StudRegistrationService,
                private schoolYearService: SchoolYearService,
                private countryService: CountryService,
                private religionService: ReligionService,
                private sexService: SexService,
                private bloodGroupService: BloodGroupService,
                private rhesusService: RhesusService,
                private civilityService: CivilityService,
                private translate: TranslateService,
                private toastr: ToastrService,
                private router: Router,
                private datePipe: DatePipe
    ) {
        this.studentForm = this.fb.group({
            year: [null, [Validators.required]],
            matricule: ['', [Validators.required, Validators.minLength(3)]],
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
        });

    }

    ngOnInit() {
        console.log(this.data);

        if (!this.data){
            this.findAllYear();
            this.findAllCountry();
            this.findAllReligion();
            this.findAllSex();
            this.findAllBloodGroup();
            this.findAllRhesus();
            this.findAllCivility();
        }

        this.studentService.currentStudent.subscribe(data => {
            if (data) {
                console.log(data);
                this.data = data;
                const student = data.student;
                this.studentForm.patchValue(data);
                this.yearSelected = data.year ? data.year['@id'] : null;
                this.sexSelected = data.sex ? data.sex['@id'] : null;
                this.countrySelected = data.country ? data.country['@id'] : null;
                this.religionSelected = data.religion ? data.religion['@id'] : null;
                this.bloodGroupSelected = data.bloodgroup ? data.bloodgroup['@id'] : null;
                this.rhesusSelected = data.rhesus ? data.rhesus['@id'] : null;
                this.civilitySelected = data.civility ? data.civility['@id'] : null;

                const dob = this.datePipe.transform(data.dob, 'yyyy-MM-dd');
                this.studentForm.get('dob')?.setValue(dob);
                const bornAround = this.datePipe.transform(data.bornAround, 'yyyy-MM-dd');
                this.studentForm.get('bornAround')?.setValue(bornAround);
            }
        });

    }


    get fc(): any {
        return this.studentForm.controls;
    }
    get student() { return this.studentForm.controls; }


    next() {
        if (this.step >= 1 && this.step <= 4) {
            this.studentStep = true;
            if (this.studentForm.invalid) { return; }
            this.step++;
        }
    }

    previous() {
        this.step--;

        if (this.step >= 1 && this.step <= 4) {
            this.studentStep = true;
        }
    }

    close() {
        this.studentForm.reset();
        this.studentService.changeStudent(null);
    }



    onFormSubmit(): any {
        if (this.step === 4) {
            console.log(this.step);
            this.studentStep = true;
            if (this.studentForm.invalid) {
                console.log(this.studentForm.invalid);
                return;
            }
        }
        if (this.studentForm.value.numberOfChildren === '') {
            this.studentForm.patchValue({numberOfChildren: 0});
        }

        this.isSubmitted = true;
        if (this.studentForm.valid){
            this.saving = true;
            console.log(this.studentForm.value);
            if (this.data) {
                    console.log(this.data);
                    this.studentForm.get('stutterer')?.setValue(this.studentForm.get('stutterer')?.value === '1');
                    this.studentForm.get('leftHanded')?.setValue(this.studentForm.get('leftHanded')?.value === '1');
                    this.studentForm.get('hearingProblem')?.setValue(this.studentForm.get('hearingProblem')?.value === '1');
                    this.studentForm.get('eyeProblem')?.setValue(this.studentForm.get('eyeProblem')?.value === '1');
                    this.studentService.put(this.data.id, this.studentForm.value).subscribe({
                        next: (val: any) => {
                            this.toastr.success('Student edited with success !', 'Success');
                            this.router.navigate(['/school/schooling/student']);
                            this.studentForm.value.reset();
                            this.studentService.changeStudent(null);

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
