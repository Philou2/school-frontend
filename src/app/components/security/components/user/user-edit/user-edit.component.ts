import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {first} from 'rxjs';
import {environment} from '../../../../../../environments/environment';
import {ProfileService} from '../../../services/profile.service';
import {BranchService} from '../../../services/branch.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit{

  userForm: FormGroup;
  branches: any[] = [];
  profiles: any[] = [];
  branchSelected: number | undefined;
  profileSelected: number | undefined;
  saving = false;

  loadForm = true;

  public data: any;
  id: number;
  profileName: string;
  userName: string;

  private baseUploadUrl = environment.apiBaseUrlUpload;

  // defaultImg = this.baseUploadUrl + 'uploads/mass-corp-650867f42934e.png';
  defaultImg: string;
  isSubmitted = false;
  fileHad: File = null;
  update = this.translate.instant('Update');
  create = this.translate.instant('Save');

  @ViewChild(DatatableComponent) table: DatatableComponent;
  changeDetectorRefs: ChangeDetectorRef[] = [];

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private profileService: ProfileService,
              private branchService: BranchService,
              private translate: TranslateService,
              private toastr: ToastrService,
              public route: Router,
              public router: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^((?!672)\d{9}|672\d{6})$/)]],
      email: ['', [Validators.email, Validators.required]],
      username: ['', [Validators.required]],
      file: '',
      fileSource: '',
      branch: ['', [Validators.required]],
      profile: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    this.userForm.patchValue(this.data);
    this.findAllBranches();
    this.findAllProfiles();
    // this.loadForm = true;

    if (this.id){
      this.userService.getUserId(this.id)
          .pipe(first())
          .subscribe(x => {
            console.log(x);
            this.userForm.patchValue(x);
            this.branchSelected = x.branch['@id'];
            this.profileSelected = x.profile['@id'];
            this.profileName = x.profile.name;
            this.userName = x.username;
            this.defaultImg = x.picture;

            console.log(this.loadForm);

            this.loadForm = false;
          } );

    }


  }

  get fc(): any {
    return this.userForm.controls;
  }

  onChange(event): void{
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.fileHad = inputElement.files[0];
      this.userForm.patchValue({fileSource: this.fileHad});
      console.log(this.fileHad.name);
      // this.defaultImg = this.baseUploadUrl + 'uploads/' + this.fileHad.name;
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.defaultImg = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onFormSubmit(): void{
    this.isSubmitted = true;
    // if (this.userForm.valid && this.fileHad && this.fileHad.name){
    if (this.userForm.valid){
      this.saving = true;
      if (this.id){
        console.log('hello maoll');

        const formData = new FormData();
        console.log(this.userForm.get('fileSource'));
        console.log(this.userForm.get('fileSource')?.value.type);
        console.log(this.userForm.get('firstname')?.value);
        formData.append('firstname', this.userForm.get('firstname')?.value);
        formData.append('lastname', this.userForm.get('lastname')?.value);
        formData.append('phone', this.userForm.get('phone')?.value);
        formData.append('email', this.userForm.get('email')?.value);
        formData.append('username', this.userForm.get('username')?.value);
        formData.append('branch', this.userForm.get('branch')?.value);
        formData.append('profile', this.userForm.get('profile')?.value);
        formData.append('file', this.userForm.get('fileSource')?.value);
        formData.append('fileName', this.userForm.get('fileSource')?.value.name);
        formData.append('fileSize', this.userForm.get('fileSource')?.value.size);
        formData.append('fileType', this.userForm.get('fileSource')?.value.type);

        console.log(formData);

        this.userService.updateUser(this.id, formData).subscribe({
          next: (val: any) => {
            this.toastr.success('User edit with success !', 'Success');
            this.route.navigate(['/security/user']);

            // this.activeModal.close();
          },
          complete: () => {
            this.saving = false;
          },
          error: (err: any) =>
          {
            const errors: any[] = err;
            console.log(errors);

            errors.forEach((v) =>
            {
              if (v.propertyPath === 'firstname'){
                this.userForm.get('firstname')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'lastname'){
                this.userForm.get('lastname')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'phone'){
                this.userForm.get('phone')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'email'){
                this.userForm.get('email')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'username'){
                this.userForm.get('username')?.setErrors({serverError: v.message});
              }
              if (v.propertyPath === 'password'){
                this.userForm.get('password')?.setErrors({serverError: v.message});
              }
              this.saving = false;

            });

          }
        });
      }


    }
  }

  findAllBranches(): any{
    this.branchService.getBranchList().subscribe((data: any) => {
          console.log(data);
          this.branches = data['hydra:member'];
          this.branches = this.branches.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }

  findAllProfiles(): any{
    this.profileService.getProfileList().subscribe((data: any) => {
          console.log(data['hydra:member']);
          this.profiles = data['hydra:member'];
          this.profiles = this.profiles.map((v) => {
            v.id = v['@id'];
            return v;
          });
        },
        error => console.log(error)
    );
  }


}
