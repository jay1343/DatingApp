import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit{
  @Output() onChange = new EventEmitter<any>();

  public chartProvider: string | null | undefined;

  ngOnInit(): void {
    this.chartProvider = 'highcharts';
    this.onChange.emit(this.chartProvider);
  }

  chartProviderChanged(event: any) {
    this.chartProvider = event.target.getAttribute('name');
    this.onChange.emit(this.chartProvider);
  }

}
