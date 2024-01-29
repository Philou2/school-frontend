import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-totalCourses',
  templateUrl: './totalCourses.component.html',
  styleUrls: ['./totalCourses.component.scss']
})
export class TotalCoursesComponent {

  @Input() data: any;
}
