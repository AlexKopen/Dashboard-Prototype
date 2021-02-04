export interface Record {
  id: number;
  title: string;
  division: string;
  project_owner: string;
  budget: number;
  status: string;
  created: string;
  modified: string;
}

export enum FilterType {
  text,
  number,
  date
}

export class RecordFilter<T> {
  filterType: FilterType;
  key: string;
  value: T;

  constructor(filterType: FilterType, key: string, value: T) {
    this.filterType = filterType;
    this.key = key;
    this.value = value;
  }
}

export interface DashboardStateModel {
  allRecords: Record[];
  filters: RecordFilter<any>[];
  filteredRecords: Record[];
}
