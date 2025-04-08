import { AfterViewInit, Component } from '@angular/core';
import { Chart, ChartComponent } from 'chart.js/auto';
@Component({
  selector: 'app-line-graph',
  standalone: true,
  templateUrl: './line-graph.component.html',
  styleUrl: './line-graph.component.scss'
})
export class LineGraphComponent  implements AfterViewInit {
  chartOptions: any = { scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } };
  ngAfterViewInit() {
    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [
          {
            label: 'Sales',
            data: [12, 19, 3, 5],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
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