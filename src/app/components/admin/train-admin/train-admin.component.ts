import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DialogConfirmationComponent} from '../core/dialog-confirmation/dialog-confirmation.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TrainService} from '../../../services/train.service';
import {InsertTrainAdminComponent} from './insert-train-admin/insert-train-admin.component';
import {UpdateTrainAdminComponent} from './update-train-admin/update-train-admin.component';
import {Subscription} from "rxjs";
import {HotelData} from "../../../models/hotel-interface";
import {TrainData} from "../../../models/train-interface";

@Component({
  selector: 'app-train-admin',
  templateUrl: './train-admin.component.html',
  styleUrls: ['./train-admin.component.scss']
})
export class TrainAdminComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private trainService: TrainService,
              private dialogInsert: MatDialog,
              private dialogUpdate: MatDialog,
              private dialogConfirm: MatDialog,
              private dialogError: MatDialog) {
  }

  private dialogConfirmRef: MatDialogRef<DialogConfirmationComponent>;
  private dialogInsertRef: MatDialogRef<InsertTrainAdminComponent>;
  private dialogUpdateRef: MatDialogRef<UpdateTrainAdminComponent>;

  dataTrain$: Subscription;
  dataTrain: any;
  dataTrainArr: TrainData[] = [];

  allColumns = ['name', 'departName', 'departTime', 'arriveName', 'arriveTime', 'trainClass', 'update', 'delete'];
  dataSource = new MatTableDataSource();

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.getTrainData();
  }

  setDataSource(hotels: object[]) {
    this.dataSource = new MatTableDataSource(hotels);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getTrainData() {
    this.dataTrainArr = [];
    this.dataTrain$ = this.trainService.getAllTrain().subscribe(async query => {
      await this.fetchTrainData(query);
    });
  }

  fetchTrainData(query) {
    this.dataTrain = query.data.AllTrain;

    for (const train of this.dataTrain) {
      this.dataTrainArr.push(this.createNewTrain(train));
    }

    this.setDataSource(this.dataTrainArr);
    this.dataTrain$.unsubscribe();
  }

  createNewTrain(train: any): TrainData {

    let classes = '';
    for (const cls of train.class) {
      classes += cls.name + ', ';
    }
    classes = classes.substring(0, classes.length - 2);

    return {
      id: train.id,
      seat: train.seat,
      arrivalName: train.arrival.name + ' (' + train.arrival.code + ')',
      arrivalTime: train.arrivalTime,
      departureName: train.departure.name + ' (' + train.departure.code + ')',
      departureTime: train.departureTime,
      class: classes,
      nameCode: train.name + ' ' +  train.code,
      price: train.price,
      transit: train.transit.name
    };
  }

  insertAction() {
    this.dialogInsertRef = this.dialogInsert.open(InsertTrainAdminComponent);

    this.dialogInsertRef.afterClosed().subscribe(data => {
      this.getTrainData();
    });

  }

  updateAction(train) {
    this.dialogUpdateRef = this.dialogUpdate.open(UpdateTrainAdminComponent, {data: train});

    this.dialogUpdateRef.afterClosed().subscribe(async data => {
        await this.getTrainData();
    });

  }

  deleteAction(train) {
    this.dialogConfirmRef = this.dialogConfirm.open(DialogConfirmationComponent);

    this.dialogConfirmRef.afterClosed().subscribe(temp => {
      if (temp === true) {
        this.trainService.deleteTrainByID(train.id).subscribe(async query => {
          await this.afterRemoveTrainData(query);
        });
      } else {
        return;
      }
    });

  }

  afterRemoveTrainData(query) {
    this.getTrainData();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
