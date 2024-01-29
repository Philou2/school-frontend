import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/dashboard/online-course'

@Component({
  selector: 'app-activity-hours-study',
  templateUrl: './activity-hours-study.component.html',
  styleUrls: ['./activity-hours-study.component.scss']
})
export class ActivityHoursStudyComponent {

  public activityChart = chartData.activityChart
  public show: boolean= false


  constructor(){}

  toggle() {
    this.show = !this.show
  }
}
