import {Injectable, OnInit} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {DayPilot} from '@daypilot/daypilot-lite-angular';
import {HttpClient} from '@angular/common/http';
import {TimeTableModelDayCellService} from '../../school/study/services/time-table-model-day-cell.service';
import {TimeTableModelDayCell} from '../../school/study/interface/time-table-model-day-cell';
import {map} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Injectable()
export class DataService{

    public timeTableModelDayCells!: TimeTableModelDayCell[];
    temp = [];
    rows = [];
    items: DayPilot.EventData[] = [];
    loadingIndicator = true;
    id: number;
    test: any;

    constructor(
    private http: HttpClient,
    public timeTableDayCellService: TimeTableModelDayCellService,
    public router: ActivatedRoute,
    private route: Router
) {
    // this.getTimeTableModelDayCelllist()
}

    // Change the return type of your method to Observable<any[]>
    getTimeTableModelDayCelllist(modelId): Observable<any[]> {
        return this.timeTableDayCellService.getCalendar(modelId).pipe(
            map((res: any) => {
                console.log(res);
                this.timeTableModelDayCells = res['hydra:member'];

                // cache our list
                this.temp = [...res['hydra:member']];
                this.items = [];
                this.rows = this.timeTableModelDayCells;

                console.log(this.items);

                const eventData = this.rows.map((v) => {
                    const dates: Date[] = getDatesByDayOfWeek(v.date.date, v.modelDay);
                    console.log(dates);
                    return dates.map((d) => {
                        return {
                            id: v.id,
                            start: setTime(d, v.startAt.date),
                            end: setTime(d, v.endAt.date),
                            text: `Course : ${v.course},
                             Teacher : ${ v.teacher},
                             Room : ${ v.room},
                             Start Time : ${ new Date(v.startAt.date).toLocaleTimeString()},
                             End Time : ${ new Date(v.endAt.date).toLocaleTimeString()}`,
                            tags: {
                                color: '#f9cb9c'
                            }
                        };
                    });
                });

                for (const eventDatum of eventData) {
                    this.items.push(...eventDatum);
                }
                console.log(this.items);

                // Return this.items as the result of the Observable
                return this.items;
            }),
        );
    }

    getTimeTableModelDayCelllistOfCurrentUser(): Observable<any[]> {
        return this.timeTableDayCellService.getCalendarCurrentUser().pipe(
            map((res: any) => {
                console.log(res);
                this.timeTableModelDayCells = res['hydra:member'];

                // cache our list
                this.temp = [...res['hydra:member']];
                this.items = [];
                this.rows = this.timeTableModelDayCells;

                console.log(this.items);
                const eventData = this.rows.map((v) => {
                    const dates: Date[] = getDatesByDayOfWeek(v.date.date, v.modelDay);
                    console.log(dates);
                    return dates.map((d) => {
                        return {
                            id: v.id,
                            start: setTime(d, v.startAt.date),
                            end: setTime(d, v.endAt.date),
                            text: `Course : ${v.course},
                             Teacher : ${ v.teacher},
                             Room : ${ v.room},
                             Start Time : ${ new Date(v.startAt.date).toLocaleTimeString()},
                             End Time : ${ new Date(v.endAt.date).toLocaleTimeString()}`,
                            tags: {
                                color: '#f9cb9c'
                            }
                        };
                    });
                });

                for (const eventDatum of eventData) {
                    this.items.push(...eventDatum);
                }
                console.log(this.items);

                // Return this.items as the result of the Observable
                return this.items;
            }),
        );
    }


    getEvents(from: DayPilot.Date, to: DayPilot.Date, modelId: number): Observable<any[]> {
        // Create a new Subject
        const subject = new Subject<any[]>();
        // Subscribe to this.events
        this.getTimeTableModelDayCelllist(modelId).subscribe(events => {
            // Emit the events through the Subject
            setTimeout(() => {
                subject.next(events);
                subject.complete();
            }, 2000);
        });

        // Return the Subject as an Observable
        return subject.asObservable();
    }

  getEventsCurrent(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {
        // Create a new Subject
        const subject = new Subject<any[]>();
        // Subscribe to this.events
        this.getTimeTableModelDayCelllistOfCurrentUser().subscribe(events => {
            // Emit the events through the Subject
            setTimeout(() => {
                subject.next(events);
                subject.complete();
            }, 2000);
        });

        // Return the Subject as an Observable
       return subject.asObservable();
    }

}

// tslint:disable-next-line:typedef
function getDatesByDayOfWeek(date, dayOfWeek: string) {
    const dateArray: Date[] = [];
    const currentDate = new Date(date);
    // Days of the week in JavaScript are 0 (Sunday) - 6 (Saturday)
    const daysOfWeek = {
        SUNDAY: 0,
        MONDAY: 1,
        TUESDAY: 2,
        WEDNESDAY: 3,
        THURSDAY: 4,
        FRIDAY: 5,
        SATURDAY: 6
    };

    while (currentDate <= new Date(date)) {
        if (currentDate.getDay() === daysOfWeek[dayOfWeek.toUpperCase()]) {
            console.log(currentDate);
            dateArray.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log(dateArray);
    return dateArray;
}

// tslint:disable-next-line:typedef
function setTime(date: Date, time) {
    console.log(date);
    time = new Date(time);
    const [hours, mins, sec] = time.toTimeString().split(':');
    date.setHours(hours);
    date.setMinutes(mins);
    date.setSeconds(0);
    date.setMilliseconds(0);
    const datePipe = new DatePipe('en-US');
    const dateFormat =  datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
    console.log(dateFormat);
    return dateFormat;
}
