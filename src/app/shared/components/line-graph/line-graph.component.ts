
import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartComponent } from 'chart.js/auto';
import { AppService } from '../../../core/service/app.service';

@Component({
  selector: 'app-line-graph',
  standalone: true,
  templateUrl: './line-graph.component.html',
  styleUrl: './line-graph.component.scss'
})
export class LineGraphComponent  implements OnInit {
  @Input() graph_heading: string = '';
  @Input() graph_type: string = 'Weekly';
  @Input() graph_status: string = 'In Progress';
  @Input() lineColor: string = '';
  @Input() lineWidth: number = 1;
  @Input() xAxisLabel: string = '';
  @Input() yAxisLabel: string = '';
  
  constructor(private appService: AppService) {}
  chartOptions: any = { scales: { y: { beginAtZero: true } }, plugins: { legend: { display: true } } };
  
  ngOnInit(): void {
    this.getAverageTravelTime();
  }

  getAverageTravelTime() {
    const payload: any = {};
    this.appService.getAverageTravelTime(payload).subscribe((res: any) => {
      const responseData = res.data;
  
      // Extract months and average times
      const labels = responseData.map((item: any) => item.month);
      const values = responseData.map((item: any) => parseFloat(item.average_time));
  
      // Render chart with dynamic data
      new Chart('line_graph', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Average Travel Time',
              data: values,
              backgroundColor: this.lineColor || '#DA291C',
              borderColor: this.lineColor || '#DA291C',
              borderWidth: this.lineWidth || 2
            }
          ]
        },
        options: this.chartOptions
      });
    });
  }
}
