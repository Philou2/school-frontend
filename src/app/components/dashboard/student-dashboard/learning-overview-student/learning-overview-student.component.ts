import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/dashboard/online-course';

@Component({
  selector: 'app-learning-overview-student',
  templateUrl: './learning-overview-student.component.html',
  styleUrls: ['./learning-overview-student.component.scss']
})
export class LearningOverviewStudentComponent {

  public learningChart = chartData.learningChart;
  public show : boolean = false;

  constructor(){}

  toggle() {
    this.show = !this.show;
  }
}
