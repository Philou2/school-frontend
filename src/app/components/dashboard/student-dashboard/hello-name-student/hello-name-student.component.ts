import { Component } from '@angular/core';
import * as data from '../../../../shared/data/dashboard/online-course';
@Component({
  selector: 'app-hello-name-student',
  templateUrl: './hello-name-student.component.html',
  styleUrls: ['./hello-name-student.component.scss']
})
export class HelloNameStudentComponent {
  public completed = data.completed;
  public progress = data.progress;
}
