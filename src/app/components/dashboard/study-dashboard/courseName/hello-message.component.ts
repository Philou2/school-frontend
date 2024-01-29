import { Component } from '@angular/core';
import * as data from '../../../../shared/data/dashboard/online-course';
@Component({
  selector: 'app-hello-message',
  templateUrl: './hello-message.component.html',
  styleUrls: ['./hello-message.component.scss']
})
export class HelloMessageComponent {
  public completed = data.completed;
  public progress = data.progress;
}
