import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/dashboard/online-course';

@Component({
  selector: 'app-upcoming-events-study',
  templateUrl: './upcoming-events-study.component.html',
  styleUrls: ['./upcoming-events-study.component.scss']
})
export class UpcomingEventsStudyComponent {

  public upcomingChart = chartData.upcomingChart;
  public show: boolean = false;

  toggle() {
    this.show = !this.show;
  }
}
