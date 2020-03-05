import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CalendarView} from 'angular-calendar';
import {
  startOfDay,
  isSameDay,
  isSameMonth,
} from 'date-fns';
import {Subject} from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import {FlightService} from '../../../../services/flight.service';
import {DatePipe} from '@angular/common';

const colors: any = {
  red: {
    primary: '#ad2121',
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
  selector: 'app-calendar-price',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar-price.component.html',
  styleUrls: ['./calendar-price.component.scss'],
  providers: [DatePipe]
})
export class CalendarPriceComponent implements OnInit, AfterViewInit {

  constructor(private flightService: FlightService,
              private datePipe: DatePipe) {

  }

  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  flightData = [];
  activeDayIsOpen = true;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.flightService.getAllFlight().subscribe(async value => {
      await this.getAllFlight(value);
    });
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  getAllFlight(value) {
    this.flightData = value.data.AllFlight
    for (const v of this.flightData) {
      let flag = true;
      for (const c of this.events) {
        if (this.datePipe.transform([c.start], 'yyyy-MM-dd') ===
            this.datePipe.transform([v.arrivalTime], 'yyyy-MM-dd')) {
          if (parseInt(v.price, 10) < parseInt(c.title, 10)) {
            c.title = v.price;
          }
          flag = false;
        }
      }

      if (flag === true) {
        this.events.push({
          start: startOfDay(new Date(v.arrivalTime)),
          title: v.price,
          color: colors.yellow,
        });
      }

    }
  }
}
