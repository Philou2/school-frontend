import { Component } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dayCalendar',
  templateUrl: './dayCalendar.component.html',
  styleUrls: ['./dayCalendar.component.scss'],
})
export class DayCalendarComponent {
  model: NgbDateStruct;
  date: { year: number; month: number };

  constructor(private calendar: NgbCalendar) {
    this.model = calendar.getToday();
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }
}
