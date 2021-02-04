import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.scss']
})
export class CreateRecordComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<CreateRecordComponent>) {}

  cancelClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
