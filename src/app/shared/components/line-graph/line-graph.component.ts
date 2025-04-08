
import { AfterViewInit, Component, Input } from '@angular/core';
import { Chart, ChartComponent } from 'chart.js/auto';

@Component({
  selector: 'app-line-graph',
  standalone: true,
  templateUrl: './line-graph.component.html',
  styleUrl: './line-graph.component.scss'
})
export class LineGraphComponent  implements AfterViewInit {
  @Input() graph_heading: string = '';
  @Input() graph_type: string = 'Weekly';
  @Input() graph_status: string = 'In Progress';
  @Input() lineColor: string = '';
  @Input() lineWidth: number = 1;
  @Input() xAxisLabel: string = '';
  @Input() yAxisLabel: string = '';
  
  chartOptions: any = { scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } };
  ngAfterViewInit() {
    new Chart('barChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [
          {
            label: 'Line Graph',
            data: [12, 19, 3, 5],
            backgroundColor: '#DA291C',
            borderColor: '#DA291C',
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
