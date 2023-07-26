import { Component } from '@angular/core';
import { SharedService } from '../_services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{

  constructor(private sharedService: SharedService) {}

  chartData: Map<string, number> = new Map([
    ['Eating', 65],
    ['Drinking', 59],
    ['Sleeping', 90],
    ['Designing', 81],
    ['Coding', 56],
    ['Cycling', 55],
    ['Running', 40]
  ]);
  valueFromChild: any;
  data: any;

  childClickEvent(event: any) {
    this.data = event;
    this.chartData.delete(this.data)
    this.triggerDataChangedEvent();
  }
  chartChangeEvent(chartProvider: string) {
    // alert(chartProvider.textContent);
    this.sharedService.chartChangedEvent.emit(chartProvider);
  }

  triggerDataChangedEvent(): void {
    // Emit the event when called from the parent component
    this.sharedService.dataChangedEvent.emit(this.chartData);
  }
  triggerChartChangedEvent(): void {
    // Emit the event when called from the parent component
    this.sharedService.chartChangedEvent.emit(this.chartData);
  }
}
