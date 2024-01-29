import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {StudentService} from '../../../../services/registration/student.service';
import {StudRegistrationService} from '../../../../services/registration/stud-registration.service';
import {ToastrService} from 'ngx-toastr';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-image-add-edit',
  templateUrl: './image-add-edit.component.html',
  styleUrls: ['./image-add-edit.component.scss']
})
export class ImageAddEditComponent {

  imageForm: FormGroup;
  saving = false;

  public data: any;

  isSubmitted = false;

  fileHad: File = null!;

  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private studentService: StudentService,
              private studRegistrationService: StudRegistrationService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal,
              public route: Router
  ) {
    this.imageForm = this.fb.group({
      file: null,
      fileSource: null,
    });

  }

  ngOnInit(): void {
    this.imageForm.patchValue(this.data);
  }

  get fc(): any {
    return this.imageForm.controls;
  }

  onChange(event: any ){

    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.fileHad = inputElement.files[0];
      this.imageForm.patchValue({fileSource: this.fileHad});
    }

  }

  onFormSubmit(): any {
    this.isSubmitted = true;
    if (this.imageForm.valid && this.fileHad && this.fileHad.name) {
      this.saving = true;

      if (this.data) {
        const formData = new FormData();
        console.log(this.imageForm.get('fileSource')?.value.type);
        console.log(this.data);
        console.log('id', this.data.id);
        formData.append('id', this.data.id);
        formData.append('file', this.imageForm.get('fileSource')?.value);
        formData.append('imageName', this.imageForm.get('fileSource')?.value.name);
        formData.append('imageSize', this.imageForm.get('fileSource')?.value.size);
        formData.append('imageType', this.imageForm.get('fileSource')?.value.type);

        console.log(this.imageForm.value, formData);
        this.studentService.post(this.data.id, formData).subscribe({
          next: (val: any) => {
            this.toastr.success('File Added successfully !', 'Success');
            this.activeModal.close();
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) => {
            const errors: any[] = err.violations;

            errors.forEach((v) => {
              if (v.propertyPath === this.imageForm.get('code')) {
                this.imageForm.get('code')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === this.imageForm.get('name')) {
                this.imageForm.get('name')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });
          }
        });
      }
      //   else {
      //   this.studentService.post(this.imageForm.value).subscribe({
      //     next: (val: any) => {
      //       this.toastr.success('File Added Successfully !', 'Success');
      //       this.activeModal.close();
      //
      //     },
      //     complete: () => {
      //       this.saving = false;
      //     },
      //     error: (err: any) => {
      //       console.log(err);
      //       const errors: any[] = err.violations;
      //
      //       errors.forEach((v) => {
      //         if (v.propertyPath === 'code') {
      //           this.imageForm.get('code')?.setErrors({serverError: v.message});
      //         }
      //         if (v.propertyPath === 'name') {
      //           this.imageForm.get('name')?.setErrors({serverError: v.message});
      //         }
      //         this.saving = false;
      //       });
      //     }
      //   });
      // }

    }
  }


}
