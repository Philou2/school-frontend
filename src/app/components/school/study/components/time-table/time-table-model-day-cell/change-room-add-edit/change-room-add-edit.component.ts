import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {TimeTableModelDayCellService} from '../../../../services/time-table-model-day-cell.service';
import {RoomService} from '../../../../../schooling/services/configuration/room.service';

@Component({
  selector: 'app-change-room-add-edit',
  templateUrl: './change-room-add-edit.component.html',
  styleUrls: ['./change-room-add-edit.component.scss']
})
export class ChangeRoomAddEditComponent {

  changeRoomForm: FormGroup;

  rooms: any[] = [];
  roomSelected: number | undefined;
  saving = false;

  public data: any;

  minEndDate: string;

  isSubmitted = false;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private timetableModelDayCellService: TimeTableModelDayCellService,
              private roomService: RoomService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router,
              private datePipe: DatePipe
  ) {
    this.changeRoomForm = this.fb.group({
      room: '',

    });
  }

  ngOnInit(): void {
    this.changeRoomForm.patchValue(this.data);
    if (this.data){
      this.roomSelected = this.data.room['@id'];

    }
    this.findAllRoom();
  }
  get fc(): any {
    return this.changeRoomForm.controls;
  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.changeRoomForm.valid) {
      this.saving = true;
      if (this.data) {
        this.timetableModelDayCellService.putGeneral(this.data.id, this.changeRoomForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Room edited successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            this.saving = false;
            const errors: any[] = err.violations;
            errors.forEach((v) => {

            });
          }
        });
      } else {
        this.timetableModelDayCellService.post(this.changeRoomForm.value).subscribe({
          next: (val: any) => {
            this.saving = false;
            this.toastr.success('Room created successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
          },
          error: (err: any) => {
            this.saving = false;
            console.log(err);
            const errors: any[] = err.violations;
            errors.forEach((v) => {

            });
          }
        });
      }

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


}
