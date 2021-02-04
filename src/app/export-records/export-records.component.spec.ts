import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportRecordsComponent } from './export-records.component';

describe('ExportRecordsComponent', () => {
  let component: ExportRecordsComponent;
  let fixture: ComponentFixture<ExportRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExportRecordsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
