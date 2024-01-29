import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/dashboard/online-course';
@Component({
  selector: 'app-today-progress-student',
  templateUrl: './today-progress-student.component.html',
  styleUrls: ['./today-progress-student.component.scss']
})
export class TodayProgressStudentComponent {

  public todayProgress = chartData.todayProgress;

  constructor(){}
  
}
