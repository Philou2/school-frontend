import { Component } from '@angular/core';

@Component({
  selector: 'app-setting-configuration',
  templateUrl: './setting-configuration.component.html',
  styleUrls: ['./setting-configuration.component.scss']
})
export class SettingConfigurationComponent {

  public show: boolean = false;
  constructor() {}

  toggle() {
    this.show = !this.show;
  }
  public course = [
    {
      courseImage: 'assets/images/dashboard-3/course/1.svg',
      arrow: 'assets/images/dashboard-3/course/back-arrow/1.png',
      courseName: 'Management'
    },
    {
      courseImage: 'assets/images/dashboard-3/course/2.svg',
      arrow: 'assets/images/dashboard-3/course/back-arrow/2.png',
      courseName: 'Web Devlopment'
    },
    {
      courseImage: 'assets/images/dashboard-3/course/3.svg',
      arrow: 'assets/images/dashboard-3/course/back-arrow/1.png',
      courseName: 'Business Analytics'
    },
    {
      courseImage: 'assets/images/dashboard-3/course/4.svg',
      arrow: 'assets/images/dashboard-3/course/back-arrow/3.png',
      courseName: 'Marketing'
    }
  ];
}
