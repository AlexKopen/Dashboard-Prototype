import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-export-records',
  templateUrl: './export-records.component.html',
  styleUrls: ['./export-records.component.scss']
})
export class ExportRecordsComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ExportRecordsComponent>) {}

  cancelClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
