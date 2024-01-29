import { Component } from '@angular/core';
import * as data from '../../../../shared/data/dashboard/online-course';
@Component({
  selector: 'app-hello-name-study',
  templateUrl: './hello-name-study.component.html',
  styleUrls: ['./hello-name-study.component.scss']
})
export class HelloNameStudyComponent {
  public completed = data.completed;
  public progress = data.progress;
}
