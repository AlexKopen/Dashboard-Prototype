import { Component, OnInit } from '@angular/core';
import { RecordsService } from './shared/records.service';
import { SAMPLE_DATA } from './shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private recordsService: RecordsService) {}

  ngOnInit(): void {
    this.recordsService.records$.next(JSON.parse(SAMPLE_DATA));
  }
}
