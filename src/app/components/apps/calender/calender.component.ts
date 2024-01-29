import { Component, ViewEncapsulation, ViewChild, OnInit} from '@angular/core';
import {DayPilot, DayPilotCalendarComponent, DayPilotMonthComponent} from '@daypilot/daypilot-lite-angular';
import {DataService} from '../../security/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
//import * as pilotbtn from '../../../../assets/pilotbtn';

const colors: any = {
  red: {
    primary: '#4466f2',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalenderComponent implements OnInit {

  @ViewChild('day') day!: DayPilotCalendarComponent;
  @ViewChild('week') week!: DayPilotCalendarComponent;
  @ViewChild('month') month!: DayPilotMonthComponent;
  @ViewChild('calendar') calendar!: DayPilotCalendarComponent;

  dp: any;

  events: DayPilot.EventData[] = [];

  id: number = this.router.snapshot.params.id;

  configDay: DayPilot.CalendarConfig = {

  };

  configWeek: DayPilot.CalendarConfig = {
    viewType: 'Week',

    onTimeRangeSelected: async (args) => {
      const modal = await DayPilot.Modal.prompt('Create a new event:', 'Event 1');
      const dp = args.control;

      dp.clearSelection();
      if (!modal.result) { return; }
      dp.events.add(new DayPilot.Event({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result,
      }));
    }

  };

  configMonth: DayPilot.MonthConfig = {

  };

  // config: DayPilot.CalendarConfig = {
  //   // viewType: 'Week',
  // };


  configCalendar: DayPilot.CalendarConfig = {
    // viewType: 'Week',
    onTimeRangeSelected: async (args) => {
      const modal = await DayPilot.Modal.prompt('Create a new event:', 'Event 1');
      const dp = args.control;
      dp.clearSelection();
      if (!modal.result) { return; }
      dp.events.add(new DayPilot.Event({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result,
        barColor: "#cc0000"
      }));
    },

  };

  // barColor(i) {
  //   const colors = ['#3c78d8', '#6aa84f', '#f1c232', '#cc0000'];
  //   return colors[i % 4];
  // }

  constructor(private ds: DataService,
              public router: ActivatedRoute, private route: Router) {
    this.viewWeek();
}

testing(): void{
    console.log('test');
    const dp = new DayPilot.Calendar('dp', );
    dp.init();
    // dp.exportAs('jpeg').download();
}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    console.log(this.id);
    this.loadEvents(this.id);
    // pilotbtn.mafunction();
  }

  loadEvents(id: number): void {
    const from = this.calendar.control.visibleStart();
    const to = this.calendar.control.visibleEnd();
    this.ds.getEvents(from, to, id).subscribe(result => {
      this.events = result;
    });
   /* this.ds.getEventsCurrent(from, to, id).subscribe(result => {
      this.events = result;
    });*/
  }

  viewDay(): void {
    this.configDay.visible = true;
    this.configWeek.visible = false;
    this.configMonth.visible = false;
  }

  viewWeek(): void {
    this.configDay.visible = false;
    this.configWeek.visible = true;
    this.configMonth.visible = false;
  }

  viewMonth(): void {
    this.configDay.visible = false;
    this.configWeek.visible = false;
    this.configMonth.visible = true;
  }


}
