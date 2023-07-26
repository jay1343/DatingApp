import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as Highcharts from 'highcharts';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/_services/shared.service';
Chart.register(...registerables);

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {
  @Input() chartData: any;
  @ViewChild('chartContainer') chartContainer!: ElementRef;

  private lineChart: any;
  protected chartProvider: string | undefined;

  private subscriptions: Subscription[] = [];

  constructor(private sharedService: SharedService) {
    this.subscriptions.push(
      this.sharedService.dataChangedEvent.subscribe(data => {
        this.onParentEvent(data);
      }),
      this.sharedService.chartChangedEvent.subscribe(data => {
        this.chartProviderChanged(data);
      })
    );
  }

  ngOnInit(): void {
    this.renderChart();
  }

  renderChart() {

    const labels: string[] = Array.from(this.chartData.keys());
    const values: number[] = Array.from(this.chartData.values());

    switch (this.chartProvider) {
      case 'chartjs':
        this.renderChartJS(labels, values);
        break;
      case 'highcharts':
        this.renderHighchart(labels, values);
        break;
    }
  }

  renderChartJS(labels: string[], values: number[]){
    setTimeout(() => {
      if (this.lineChart) {
        this.lineChart.destroy();
      }
  
      const data = {
        labels: labels,
        datasets: [
          {
            label: 'Line Chart',
            data: values,
            fill: false,
            borderColor: 'blue',
            borderWidth: 2
          }
        ]
      };
  
      this.lineChart = new Chart("lineChart", {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Month'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Value'
              }
            }
          }
        }
      });
    }, 0);
  }

  renderHighchart(labels: string[], values: number[]){
    setTimeout(() => {
      const chartOptions: Highcharts.Options = {
        chart: {
          type: 'line',
          renderTo: this.chartContainer.nativeElement
        },
        title: {
          text: 'Sample Line Chart'
        },
        xAxis: {
          categories: labels
        },
        yAxis: {
          title: {
            text: 'Value'
          }
        },
        series: [
          {
            name: 'Data Series 1',
            type: 'line',
            data: values
          }
        ],
      };
      Highcharts.chart(chartOptions);
    }, 0);
  }

  onParentEvent(data:any): void {
    this.chartData = data
    this.renderChart();
  }

  chartProviderChanged(chartProvider: string): void {
    this.chartProvider = chartProvider;
    if (this.chartData) {
      this.renderChart();
    }
  }

}
