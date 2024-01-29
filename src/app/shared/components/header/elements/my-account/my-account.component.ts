import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../../../../auth/services/auth.service';
import {environment} from '../../../../../../environments/environment';
import {UserService} from '../../../../../components/security/services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
  UserChangePasswordComponent
} from '../../../../../components/security/components/user/user-change-password/user-change-password.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  public user: string;
  public userName: string;
  public userProfile: string;
  public id: number;
  public profileImg: 'assets/images/dashboard/profile.jpg';
  private baseUrl = environment.apiBaseUrl.replace('/api', '');
  public userPicture: string;


  constructor(public router: Router, public authService: AuthService, private modalService: NgbModal, public userService: UserService) {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.userName = this.user['firstname'] + ' ' + this.user['lastname'];
      this.userPicture = this.baseUrl + '/uploads/' + this.user['picture'];
      this.userProfile = this.user['profile'];
      this.id = this.user['id'];
      console.log(this.userPicture);

    } else {
    }
  }

  ngOnInit() {}

  logoutFunc() {
    this.authService.doLogout();
  }

  changePassword(data: any): void{
    console.log(data);
    const modalRef = this.modalService.open(UserChangePasswordComponent,
        {
          // centered: true,
          // backdrop: 'static'
        }
    );
    modalRef.componentInstance.data = data;
  }

  updateProfile(id: number): void {
    this.router.navigate(['/security/user/profile', id]);
  }

}
