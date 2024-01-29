import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {RoomService} from '../../../../services/configuration/room.service';
import { SchoolService } from '../../../../services/configuration/school.service';
import {SchoolClassService} from '../../../../services/configuration/school-class.service';

@Component({
  selector: 'app-class-room-add-edit',
  templateUrl: './class-room-edit.component.html',
  styleUrls: ['./class-room-edit.component.scss']
})
export class ClassRoomEditComponent {

  classroomForm: FormGroup;
  rooms: any[] = [];
  schools: any[] = [];
  roomSelected: number | undefined;
  schoolSelected: number | undefined;
  saving = false;

  public data: any;

  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private roomService: RoomService,
              private schoolclassService: SchoolClassService,
              private schoolService: SchoolService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.classroomForm = this.fb.group({
      school: '',
      mainRoom: '',
      code: ['', [Validators.required, Validators.minLength(1)]],
      maximumStudentNumber: '',
    });

  }

  ngOnInit() {
    this.classroomForm.patchValue(this.data);
    if (this.data){
      this.schoolSelected = this.data.school['@id'];
      this.roomSelected = this.data.mainRoom['@id'];
    }
    this.findAllSchool();
    this.findAllRoom();
  }

  get fc(): any {
    return this.classroomForm.controls;
  }


  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.classroomForm.valid){
      this.saving = true;
      if (this.data){
        this.schoolclassService.put(this.data.id, this.classroomForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Room edited with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {
            const errors: any[] = err.violations;

            errors.forEach((v) =>
            {
              if (v.propertyPath === 'name'){
                this.classroomForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
/*      else {
        this.schoolclassService.post(this.classroomForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('Room created with success !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {
            const errors: any[] = err.violations;
            console.log(err);

            errors.forEach((v) =>
            {
              if (v.propertyPath === 'name'){
                this.classroomForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;
            });
          }
        });


      }*/

    }
  }

  findAllRoom(): any{
      this.roomService.getCollection().subscribe((data: any) => {
            console.log(data);
            this.rooms = data['hydra:member'];
            this.rooms = this.rooms.map((v) => {
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


  }




