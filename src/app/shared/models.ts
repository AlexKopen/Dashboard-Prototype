export interface Record {
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
  number
}

export interface RecordFilter<T> {
  filterType: FilterType;
  key: string;
  value: T;
}

export interface DashboardStateModel {
  allRecords: Record[];
  filters: RecordFilter<any>[];
  filteredRecords: Record[];
}
