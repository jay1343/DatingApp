import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as Highcharts from 'highcharts';
import type { Options, SeriesPieOptions } from 'highcharts';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/_services/shared.service';
Chart.register(...registerables);

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  @Output() onChange = new EventEmitter<any>();
  @Input() chartData: any;
  @ViewChild('chartContainer') chartContainer!: ElementRef;

  private pieChart: any;
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

  handleChildChange(event: any) {
    console.log('Child data:')
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

  renderChartJS(labels: string[], values: number[]) {
    setTimeout(() => {
      if (this.pieChart) {
        this.pieChart.destroy();
      }
  
      const data = {
        labels: labels,
        datasets: [{
          label: 'Pie Chart',
          data: values,
          hoverOffset: 4,
          borderWidth: 0
        }]
      };
      this.pieChart = new Chart("pieChart", {
        type: 'doughnut',
        data: data,
        options: {
          plugins: {
            legend: {
              position: 'right',
              labels: {
                usePointStyle: true,
                pointStyle: 'circle'
              }
            }
          }
          , cutout: 75,
          onClick: (event, elements, chart) => {
            if (elements[0] && chart.data.labels) {
              const i = elements[0].index;
              // alert(chart.data.labels[i] + ': ' + chart.data.datasets[0].data[i]);
              this.onChange.emit(chart.data.labels[i]);
            }
          }
        }
      });
    }, 0);
  }

  renderHighchart(labels: string[], values: number[]) {
    setTimeout(() => {
      const labels = Array.from(this.chartData.keys());
      const values = Array.from(this.chartData.values());
      const chartOptions: Options = {
        chart: {
          type: 'pie',
          renderTo: this.chartContainer.nativeElement
        },
        title: {
          text: 'Sample Pie Chart',
        },
        plotOptions: {
          series: {
            point: {
              events: {
                click: (event) => {
                  this.onChange.emit(event.point.name);
                }
              }
            }
          }
        },
        series: [{
          name: 'Data',
          colorByPoint: true,
          data: labels.map((label, index) => ({
            name: label as string,
            y: values[index] as number,
          })),
        }] as unknown as Highcharts.SeriesPieOptions[],
      };
      Highcharts.chart(chartOptions);
    }, 0);
  }

  onParentEvent(data: any): void {
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
