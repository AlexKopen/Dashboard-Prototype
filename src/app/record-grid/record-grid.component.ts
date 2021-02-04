import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DashboardStateModel, Record } from '../shared/models';
import { MatDialog } from '@angular/material/dialog';
import { CreateRecordComponent } from '../create-record/create-record.component';
import { ExportRecordsComponent } from '../export-records/export-records.component';

@Component({
  selector: 'app-record-grid',
  templateUrl: './record-grid.component.html',
  styleUrls: ['./record-grid.component.scss']
})
export class RecordGridComponent implements OnInit {
  private dashboardState$: Observable<DashboardStateModel>;
  recordsToDisplay: Record[] = [];

  constructor(private store: Store, public dialog: MatDialog) {
    this.dashboardState$ = this.store.select(state => state.dashboard);
  }

  ngOnInit(): void {
    this.dashboardState$.subscribe((dashboardState: DashboardStateModel) => {
      this.recordsToDisplay = dashboardState.filteredRecords;
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
}
