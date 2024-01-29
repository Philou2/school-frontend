import { Component } from '@angular/core';
import * as data from '../../../../../shared/data/dashboard/ecommerce';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {ParticipantService} from '../../../../others/services/participant.service';
import {NavService} from '../../../../../shared/services/nav.service';
import {ModuleService} from '../../../../security/services/module.service';
@Component({
  selector: 'app-module-board',
  templateUrl: './module-board.component.html',
  styleUrls: ['./module-board.component.scss']
})
export class ModuleBoardComponent {

  // public menus!: Menu[];
  // public user: string;
  public userModules: string;
  constructor(public router: Router, public moduleService: ModuleService, public navService: NavService) {
    // if (JSON.parse(localStorage.getItem('user'))) {
    //   this.user = JSON.parse(localStorage.getItem('user'));
    //   this.userModules = this.user['modules'];
    //   console.log(this.userModules);
    // } else {
    // }
  }

  public newOrders = data.newOrders;
  public newCustomers = data.newCustomers;
  public averageSale = data.averageSale;
  public grossProfit = data.grossProfit;

  ngOnInit(): void {
    this.moduleService.getUserModuleList().subscribe({
      next: (res: any) => {
        this.userModules = res['modules'];

        console.log(this.userModules);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        console.log('Error while fetching the records');
      }
    });
  }

  getModuleId(event: any): void{
    console.log(event);

    localStorage.setItem('moduleId', event);
    // this.navService.loadMenu(event);
  }

}
