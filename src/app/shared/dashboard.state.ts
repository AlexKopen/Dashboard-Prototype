import {
  Action,
  NgxsOnChanges,
  NgxsSimpleChange,
  State,
  StateContext
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DashboardStateModel, Record, RecordFilter } from './models';
import { RecordsService } from './records.service';

export class UpdateAllRecords {
  static readonly type = '[Dashboard] Update All Records';

  constructor(public records: Record[]) {}
}

export class UpdateFilters {
  static readonly type = '[Dashboard] Update Filters';

  constructor(public filters: RecordFilter<any>[]) {}
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
    // console.log('change triggered');
  }

  @Action(UpdateAllRecords)
  updateAllRecords(
    ctx: StateContext<DashboardStateModel>,
    action: UpdateAllRecords
  ): void {
    let state = ctx.getState();
    ctx.setState({
      ...state,
      allRecords: [...action.records]
    });

    state = ctx.getState();
    const filteredValues = this.recordsService.filterRecords(state);
    ctx.setState({
      ...state,
      filteredRecords: filteredValues
    });
  }

  @Action(UpdateFilters)
  updateFilters(
    ctx: StateContext<DashboardStateModel>,
    action: UpdateFilters
  ): void {
    let state = ctx.getState();
    ctx.setState({
      ...state,
      filters: [...action.filters]
    });

    state = ctx.getState();
    const filteredValues = this.recordsService.filterRecords(state);
    ctx.setState({
      ...state,
      filteredRecords: filteredValues
    });
  }
}
