import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import * as ExcelJS from 'exceljs'
import Swal from 'sweetalert2';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {TeacherService} from '../../../../services/teacher.service';



@Component({
  selector: 'app-teacher-import',
  templateUrl: './import-teacher.component.html',
  styleUrls: ['./import-teacher.component.scss']
})
export class ImportTeacherComponent {

  teacherImportForm: FormGroup;
  saving = false;

  public data: any;

  public filesrow: any[] = [];

  private _success = new Subject<string>();
  successMessage: string;
  alert: boolean = false;
  message: string = '';
  status: string = '';


  isSubmitted = false;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private teacherService: TeacherService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public route: Router
  ) {
    this.teacherImportForm = this.fb.group({
      file: ['', [Validators.required]],
    });

  }

  ngOnInit() {
    this.teacherImportForm.patchValue(this.data);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
        debounceTime(5000)
    ).subscribe(() => this.successMessage = null);

  }

  get fc(): any {
    return this.teacherImportForm.controls;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (e: any) => {
      const arrayBuffer = e.target.result;
      this.parseExcel(arrayBuffer);
    };

    fileReader.readAsArrayBuffer(file);
  }

  parseExcel(arrayBuffer: any): void {
    // const workbook = new ExcelJS.default.Workbook()

    this.filesrow = [];

    const workbook = new ExcelJS.Workbook();
    //const workbook = require('exceljs').Workbook();
    workbook.xlsx.load(arrayBuffer).then((workbook) => {
      const worksheet = workbook.getWorksheet(1);
      worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        // Process each row here
        // console.log(row.values);
        // console.log(row.values[1]);

        // let test = {
        //   name: row.values[1],
        //   number: rowNumber
        // }
        // console.log(test);
        if (rowNumber === 1) {
          return;
        }


        const isWhitespaceString = str => !str.replace(/\s/g, '').length

        //console.log('isWhitespaceString str1:', isWhitespaceString(row.values[1]));

        let rowName = row.values[1];

        if (typeof rowName == 'string'){

          console.log('string')
          if (isWhitespaceString(rowName) == true){
            // this.saving = false;

            Swal.fire(
                'Line error',
                'There is an empty line in : ' + rowNumber,
                'warning'
                // 'question'
            )
            this.teacherImportForm.reset();
          }

        }


        // if (typeof rowName == "number"){
        //   console.log('number')
        //   Swal.fire(
        //       'Line error',
        //       'There is a number in line : ' + rowNumber,
        //       'warning'
        //   )
        //   this.teacherImportForm.reset();
        // }


        this.filesrow.push({year: row.values[1], registrationNumber: row.values[2], name: row.values[3],
          dob: row.values[4], pob: row.values[5], sex: row.values[6], civility: row.values[7], country: row.values[8], religion: row.values[9], phone: row.values[10],
          email: row.values[11], address: row.values[12], maritalStatus: row.values[13], speciality: row.values[14], baseSalary: row.values[15], subject: row.values[16], line: rowNumber})

        console.log(this.filesrow);
      });
    });

  }


  onFormSubmit(): any {
    // if (this.saving == false){
    //   console.log('hekkk')
    //   this.permissionImportForm.invalid;
    // }

    this.isSubmitted = true;
    if (this.teacherImportForm.valid){
      this.saving = true;

      console.log(this.filesrow);
      this.teacherService.importTeacher(this.filesrow).subscribe({
        next: (val: any) => {

          this.alert = true;
          this.status = 'success';
          this.message = 'File Imported successfully !';

          this._success.next(`${new Date()} - Message successfully changed.`);


        },
        complete: () => {
          this.saving = false;
        },
        error: (err: any) =>
        {
          console.log(err);

          this._success.next(err['hydra:title']);

          this._success.next(`${new Date()} - Message error changed.`);

          this.alert = true;
          this.status = 'warning';
          this.message = err['hydra:title'];
          this.teacherImportForm.reset();

          //const errors: any[] = err.violations;
          //console.log(errors);

          // errors.forEach((v) =>
          // {
          //   if (v.propertyPath === 'name'){
          //     this.permissionImportForm.get('name')?.setErrors({serverError: v.message});
          //   }
          //
          // });
          this.saving = false;
        }
      });

    }

  }

  closeAlert(){
    this.alert = false;
  }


}
