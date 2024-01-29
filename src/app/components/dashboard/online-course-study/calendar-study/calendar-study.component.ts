import { Component } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar-study',
  templateUrl: './calendar-study.component.html',
  styleUrls: ['./calendar-study.component.scss'],
})
export class CalendarStudyComponent {
  model: NgbDateStruct;
  date: { year: number; month: number };

  constructor(private calendar: NgbCalendar) {
    this.model = calendar.getToday();
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }
}
