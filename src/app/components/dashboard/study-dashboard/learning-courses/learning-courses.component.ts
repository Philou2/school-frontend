import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/dashboard/online-course';

@Component({
  selector: 'app-learning-totalCourses',
  templateUrl: './learning-courses.component.html',
  styleUrls: ['./learning-courses.component.scss']
})
export class LearningCoursesComponent {

  public learningChart = chartData.learningChart;
  public show = false;

  constructor(){}

  toggle() {
    this.show = !this.show;
  }
}
