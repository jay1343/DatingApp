import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { NavComponent } from './nav/nav.component'
import { FormsModule } from '@angular/forms';
import { ExcelComponent } from './excel/excel.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BarchartComponent } from './_shared/dashboard/barchart/barchart.component';
import { PiechartComponent } from './_shared/dashboard/piechart/piechart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LinechartComponent } from './_shared/dashboard/linechart/linechart.component';
import { RadarchartComponent } from './_shared/dashboard/radarchart/radarchart.component';
import { ScatterchartComponent } from './_shared/dashboard/scatterchart/scatterchart.component';
import { CardsComponent } from './_shared/dashboard/cards/cards.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './_guards/auth-interceptor';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ExcelComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    DashboardComponent,
    BarchartComponent,
    PiechartComponent,
    SideNavComponent,
    LinechartComponent,
    RadarchartComponent,
    ScatterchartComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    HighchartsChartModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
