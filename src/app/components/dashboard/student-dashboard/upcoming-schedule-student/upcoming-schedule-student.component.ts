import { Component } from '@angular/core';

@Component({
  selector: 'app-upcoming-schedule-student',
  templateUrl: './upcoming-schedule-student.component.html',
  styleUrls: ['./upcoming-schedule-student.component.scss']
})
export class UpcomingScheduleStudentComponent {

  constructor() {}

  public upcomingSchedule = [
    {
      image: 'assets/images/dashboard/user/4.jpg',
      title: 'Web Design',
      date: 'January 3, 2022',
      time: '09.00 - 12.00 AM',
      colorClass: 'primary'
    },
    {
      image: "assets/images/dashboard/user/2.jpg",
      title: "UI/UX Design",
      date: "Febuary 10, 2022",
      time: "11.00 - 1.00 PM",
      colorClass: "warning"
    }
  ]
}
