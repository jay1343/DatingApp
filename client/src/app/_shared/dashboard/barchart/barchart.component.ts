import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/_services/shared.service';
import * as Highcharts from 'highcharts';

Chart.register(...registerables);

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements AfterViewInit {
  @Output() onChange = new EventEmitter<any>();
  @Input() chartData: any;
  @ViewChild('chartContainer') chartContainer!: ElementRef;

  private subscriptions: Subscription[] = [];
  private barChart: any;
  protected chartProvider: string | undefined;

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

  ngAfterViewInit(): void {
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData'] || changes['chartProvider']) {
      this.renderChart();
    }
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
    if (this.barChart) {
      this.barChart.destroy();
    }

    setTimeout(() => {
      const data = {
        labels: labels,
        datasets: [{
          label: 'Bar Chart',
          data: values,
          borderWidth: 1
        }]
      };

      this.barChart = new Chart("barChart", {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          onClick: (event, elements, chart) => {
            if (elements[0] && chart.data.labels) {
              const i = elements[0].index;
              this.onChange.emit(chart.data.labels[i]);
            }
          }
        }
      });
      
    }, 0);
  }

  renderHighchart(labels: string[], values: number[]) {
    if (Highcharts.charts[0]) {
      Highcharts.charts[0].destroy();
    }

    setTimeout(() => {
      const chartOptions: Highcharts.Options = {
        chart: {
          type: 'bar',
          renderTo: this.chartContainer.nativeElement // Use the container element
        },
        title: {
          text: 'Bar Chart Example'
        },
        xAxis: {
          categories: labels
        },
        yAxis: {
          title: {
            text: 'Values'
          }
        },
        plotOptions: {
          series: {
            point: {
              events: {
                click: (event) => {
                  this.onChange.emit(event.point.category);
                }
              }
            }
          }
        },
        series: [{
          name: 'Data',
          type: 'column',
          data: values
        }]
      };

      Highcharts.chart(chartOptions);
    }, 0);
  }

  onParentEvent(data: any): void {
    this.chartData = data;
    this.renderChart();
  }

  chartProviderChanged(chartProvider: string): void {
    this.chartProvider = chartProvider;
    if (this.chartData) {
      this.renderChart();
    }
  }
}
