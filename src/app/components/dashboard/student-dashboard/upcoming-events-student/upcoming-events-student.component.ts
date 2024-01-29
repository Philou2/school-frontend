import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/dashboard/online-course';

@Component({
  selector: 'app-upcoming-events-student',
  templateUrl: './upcoming-events-student.component.html',
  styleUrls: ['./upcoming-events-student.component.scss']
})
export class UpcomingEventsStudentComponent {

  public upcomingChart = chartData.upcomingChart;
  public show: boolean = false;

  toggle() {
    this.show = !this.show;
  }
}
