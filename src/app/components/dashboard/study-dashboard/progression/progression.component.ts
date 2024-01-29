import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/dashboard/online-course';
@Component({
  selector: 'app-progression',
  templateUrl: './progression.component.html',
  styleUrls: ['./progression.component.scss']
})
export class ProgressionComponent {

  public todayProgress = chartData.todayProgress;

  constructor(){}

}
