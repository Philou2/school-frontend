import { Component } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar-student',
  templateUrl: './calendar-student.component.html',
  styleUrls: ['./calendar-student.component.scss'],
})
export class CalendarStudentComponent {
  model: NgbDateStruct;
  date: { year: number; month: number };

  constructor(private calendar: NgbCalendar) {
    this.model = calendar.getToday();
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }
}
