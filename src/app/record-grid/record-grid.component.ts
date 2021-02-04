import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DashboardStateModel, Record } from '../shared/models';
import { MatDialog } from '@angular/material/dialog';
import { CreateRecordComponent } from '../create-record/create-record.component';
import { ExportRecordsComponent } from '../export-records/export-records.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateAllRecords } from '../shared/dashboard.state';

@Component({
  selector: 'app-record-grid',
  templateUrl: './record-grid.component.html',
  styleUrls: ['./record-grid.component.scss']
})
export class RecordGridComponent implements OnInit {
  private dashboardState$: Observable<DashboardStateModel>;
  allRecords: Record[] = [];
  recordsToDisplay: Record[] = [];
  recordIdsInEdit: Set<number> = new Set<number>();

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dashboardState$ = this.store.select(state => state.dashboard);
  }

  ngOnInit(): void {
    this.dashboardState$.subscribe((dashboardState: DashboardStateModel) => {
      this.recordsToDisplay = dashboardState.filteredRecords;
      this.allRecords = dashboardState.allRecords;
    });
  }

  public createRecordDialog(): void {
    this.dialog.open(CreateRecordComponent, {
      width: '60em'
    });
  }

  public exportDialog(): void {
    this.dialog.open(ExportRecordsComponent, {
      width: '60em'
    });
  }

  public openSnackBar(): void {
    this.snackBar.open('Record updated', '', {
      duration: 2000
    });
  }

  public edit(id: number): void {
    this.recordIdsInEdit.add(id);
  }

  public stopEdit(editedRecord: Record): void {
    const changedRecord = this.allRecords.find((record: Record) => {
      return record.id === editedRecord.id;
    });

    if (changedRecord) {
      changedRecord.status = editedRecord.status;
      changedRecord.project_owner = editedRecord.project_owner;
      changedRecord.budget = +editedRecord.budget;
    }

    this.recordIdsInEdit.delete(editedRecord.id);

    this.store.dispatch(new UpdateAllRecords(this.allRecords));
    this.openSnackBar();
  }

  public recordEditActive(record: Record): boolean {
    return this.recordIdsInEdit.has(record.id);
  }
}
