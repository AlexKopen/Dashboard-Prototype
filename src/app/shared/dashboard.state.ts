import {
  Action,
  NgxsOnChanges,
  NgxsSimpleChange,
  State,
  StateContext
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DashboardStateModel, RecordFilter, Record } from './models';
import { RecordsService } from './records.service';

export class UpdateAllRecords {
  static readonly type = '[Dashboard] Update All Records';
  constructor(public records: Record[]) {}
}

export class UpdateFilters {
  static readonly type = '[Dashboard] Update Filters';
  constructor(public filters: RecordFilter<any>[]) {}
}

export class UpdateFilteredRecords {
  static readonly type = '[Dashboard] Update Filtered Records';
  constructor(public records: Record[]) {}
}

@State<DashboardStateModel>({
  name: 'dashboard',
  defaults: {
    allRecords: [],
    filters: [],
    filteredRecords: []
  }
})
@Injectable()
export class DashboardState implements NgxsOnChanges {
  constructor(private recordsService: RecordsService) {}

  ngxsOnChanges(change: NgxsSimpleChange): void {
    this.recordsService.filterRecords(change.currentValue.filters);
  }

  @Action(UpdateAllRecords)
  updateAllRecords(
    ctx: StateContext<DashboardStateModel>,
    action: UpdateAllRecords
  ): void {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      allRecords: [...action.records]
    });
  }

  @Action(UpdateFilters)
  updateFilters(
    ctx: StateContext<DashboardStateModel>,
    action: UpdateFilters
  ): void {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      filters: [...action.filters]
    });
  }

  @Action(UpdateFilteredRecords)
  updateFilteredRecords(
    ctx: StateContext<DashboardStateModel>,
    action: UpdateFilteredRecords
  ): void {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      filteredRecords: [...action.records]
    });
  }
}
