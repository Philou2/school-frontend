import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/dashboard/online-course';

@Component({
  selector: 'app-learning-overview-study',
  templateUrl: './learning-overview-study.component.html',
  styleUrls: ['./learning-overview-study.component.scss']
})
export class LearningOverviewStudyComponent {

  public learningChart = chartData.learningChart;
  public show : boolean = false;

  constructor(){}

  toggle() {
    this.show = !this.show;
  }
}
