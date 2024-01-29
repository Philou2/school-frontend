import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {RoomService} from '../../../../services/configuration/room.service';
import {BuildingService} from '../../../../services/configuration/building.service';
import { SchoolService } from '../../../../services/configuration/school.service';

@Component({
  selector: 'app-room-add-edit',
  templateUrl: './room-add-edit.component.html',
  styleUrls: ['./room-add-edit.component.scss']
})
export class RoomAddEditComponent {

  roomForm: FormGroup;
  buildings: any[] = [];
  schools: any[] = [];
  buildingSelected: number | undefined;
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
              private buildingService: BuildingService,
              private schoolService: SchoolService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.roomForm = this.fb.group({
      school: ['', [Validators.required]],
      building: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(1)]],
      capacity: null,

    });

  }

  ngOnInit() {
    this.roomForm.patchValue(this.data);
    if (this.data){
      this.schoolSelected = this.data.school['@id'];
      this.buildingSelected = this.data.building['@id'];
    }
    this.findAllSchool();
    this.findAllBuilding();
  }

  get fc(): any {
    return this.roomForm.controls;
  }


  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.roomForm.valid){
      this.saving = true;
      if (this.data){
        this.roomService.put(this.data.id, this.roomForm.value).subscribe({
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
                this.roomForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      else {
        this.roomService.post(this.roomForm.value).subscribe({
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
                this.roomForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;
            });
          }
        });


      }

    }
  }

  findAllBuilding(): any{
      this.buildingService.getCollection().subscribe((data: any) => {
            console.log(data);
            this.buildings = data['hydra:member'];
            this.buildings = this.buildings.map((v) => {
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




