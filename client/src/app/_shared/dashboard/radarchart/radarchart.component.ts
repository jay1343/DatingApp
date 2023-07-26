import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/_services/shared.service';
Chart.register(...registerables);

@Component({
  selector: 'app-radarchart',
  templateUrl: './radarchart.component.html',
  styleUrls: ['./radarchart.component.css']
})
export class RadarchartComponent implements OnInit {
  @Input() chartData: any;

  private radarChart: any;

  private subscription: Subscription;

  constructor(private sharedService: SharedService) {
    // Subscribe to the parentEventEmitter
    this.subscription = this.sharedService.dataChangedEvent.subscribe(data => {
      this.onParentEvent(data);
    });
  }

  ngOnInit(): void {
    this.renderChart();
  }

  renderChart() {
    if (this.radarChart) {
      this.radarChart.destroy();
    }

    const labels: string[] = Array.from(this.chartData.keys());
    const values:number[] = Array.from(this.chartData.values());

    this.renderChartJS(labels, values)
  }

  renderChartJS(labels: string[], values: number[]) {
    const data = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: values,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }]
    };

    this.radarChart = new Chart("radarChart", {
      type: 'radar',
      data: data,
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        }
      },
    });
  }

  onParentEvent(data:any): void {
    this.chartData = data
    this.renderChart();
  }

}
