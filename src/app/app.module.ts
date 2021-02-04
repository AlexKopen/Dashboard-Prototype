import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterComponent } from './filter/filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { DashboardState } from './shared/dashboard.state';

@NgModule({
  declarations: [AppComponent, FilterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([DashboardState], {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
