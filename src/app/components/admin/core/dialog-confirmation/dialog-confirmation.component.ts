import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from '@angular/router';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss']
})
export class DialogConfirmationComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogConfirmationComponent>) { }

  ngOnInit() {
  }

  yesAction() {
    this.dialogRef.close(true);
  }

  noAction() {
    this.dialogRef.close(false);
  }

}
