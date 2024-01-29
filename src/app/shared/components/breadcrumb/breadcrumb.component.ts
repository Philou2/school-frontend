import { Component, OnInit, Input } from '@angular/core';
import {User} from '../../../components/security/interface/user';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() title: string;
  @Input() items: any[];
  @Input() active_item: string;

  userCheck: any;
  userParsed = JSON.parse(localStorage.getItem('user'));
  // isStudentCheck = localStorage.getItem('user')['isIsStudentSystem'];

  constructor() {
    this.userCheck = this.userParsed;
  }

  ngOnInit(): void {
  }

}
