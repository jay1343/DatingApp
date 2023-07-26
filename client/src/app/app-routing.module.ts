import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { BarchartComponent } from './_shared/dashboard/barchart/barchart.component';
import { PiechartComponent } from './_shared/dashboard/piechart/piechart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RadarchartComponent } from './_shared/dashboard/radarchart/radarchart.component';
import { ScatterchartComponent } from './_shared/dashboard/scatterchart/scatterchart.component';
import { AuthGuard } from './_guards/auth.guard';
import { ExcelComponent } from './excel/excel.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'members', component: MemberListComponent,canActivate:[AuthGuard]},
  {path: 'members/:id', component: MemberDetailComponent},
  {path: 'lists', component: ListsComponent},
  {path: 'messages', component: MessagesComponent},
  {path: 'barchart', component: BarchartComponent},
  {path: 'piechart', component: PiechartComponent},
  {path: 'radarchart', component: RadarchartComponent},
  {path: 'scatterchart', component: ScatterchartComponent},

  // Routing to the Assignments
  {path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
  {path: 'excel', component: ExcelComponent,canActivate:[AuthGuard]},

  // If nothing matches then initially go for HomeComponent
  {path: '**', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
