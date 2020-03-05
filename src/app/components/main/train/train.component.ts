import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {TrainService} from '../../../services/train.service';
import {log} from 'util';
import * as moment from 'moment';
import {ChatService} from "../../../services/chat.service";

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss']
})
export class TrainComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private chatService: ChatService,
              private trainService: TrainService) {
    this.activatedRoute.queryParams.subscribe(async params => {
      await this.getAllParameterData(params);
    });

    this.selectedSort = 'sortBy';
  }

  private source: string;
  private destination: string;
  private adult: string;
  private infant: string;
  private departure: Date;
  private arrival: Date;

  private selectedSort: string;

  checkboxClass: boolean[] = [false, false, false];
  checkboxTime: boolean[] = [false, false, false, false];
  checkboxType: boolean[] = [];

  trainData: object[] = [];
  trainDataType: string[] = [];

  ngOnInit() {
    this.chatService.listen('train').subscribe(m => {
      alert(m);
    });
  }

  getAllParameterData(params) {

    if (params.source === undefined) {
      this.router.navigateByUrl('/Train');
      return;
    }

    this.source = params.source;
    this.destination = params.destination;
    this.departure = new Date(params.departure);
    this.arrival = new Date(params.arrival);
    this.adult = params.adult;
    this.infant = params.infant;

    this.arrival.setHours(this.arrival.getHours() + 7);
    const arrivalTime = this.arrival.toISOString().substr(0, 11) + '00:00:00Z';

    this.trainService.getTrainByLocation(this.source, this.destination, arrivalTime).subscribe(async value => {
      await this.getTrainData(value);
    });

  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  getTrainData(value) {
    this.trainData = value.data.GetTrainByLocation;

    for (const train of this.trainData) {
      // @ts-ignore
      this.trainDataType.push(train.name);
      // @ts-ignore
      const dur = moment.duration(moment(train.departureTime).diff(moment(train.arrivalTime))).asMinutes();
      // @ts-ignore
      train.duration = Math.floor(dur / 60) + ' H ' + (dur - ( Math.floor(dur / 60) * 60)) + ' M';
      // @ts-ignore
      train.isOpen = false;
    }

    this.trainDataType = this.trainDataType.filter(this.onlyUnique);
    for (let i = 0 ; i < this.trainDataType.length ; i++) {
      this.checkboxType[i] = false;
    }
  }

  goToSearchTrain() {
    this.router.navigateByUrl('Train');
  }

  resetAll() {
    this.checkboxType.forEach((part, index, data) => {
      this.checkboxType[index] = false;
    })
    this.checkboxClass.forEach((part, index, data) => {
      this.checkboxClass[index] = false;
    })
    this.checkboxTime.forEach((part, index, data) => {
      this.checkboxTime[index] = false;
    })
  }
}
