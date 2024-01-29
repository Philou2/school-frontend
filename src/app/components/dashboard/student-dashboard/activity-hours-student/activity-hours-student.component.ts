import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/dashboard/online-course'

@Component({
  selector: 'app-activity-hours-student',
  templateUrl: './activity-hours-student.component.html',
  styleUrls: ['./activity-hours-student.component.scss']
})
export class ActivityHoursStudentComponent {

  public activityChart = chartData.activityChart
  public show: boolean= false


  constructor(){}

  toggle() {
    this.show = !this.show
  }
}
