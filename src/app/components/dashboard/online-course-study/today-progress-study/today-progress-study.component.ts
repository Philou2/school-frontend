import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/dashboard/online-course';
@Component({
  selector: 'app-today-progress-study',
  templateUrl: './today-progress-study.component.html',
  styleUrls: ['./today-progress-study.component.scss']
})
export class TodayProgressStudyComponent {

  public todayProgress = chartData.todayProgress;

  constructor(){}
  
}
