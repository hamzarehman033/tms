import { AfterViewInit, Component, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements AfterViewInit{
  @Input() pie_heading: string = '';
  @Input() pie_Data: any[] = [];
  @Input() pie_Labels: string[] = [];
  @Input() colors: string[] = [];
  @Input() showLabels: boolean = true;

  ngAfterViewInit() {
    new Chart('defectPieChart', {
      type: 'pie',
      data: {
        labels: ['a','b','c'],
        datasets: [{
          data: [10,15,70],
          backgroundColor: [
            '#4CAF50',
            '#2196F3',
            '#F44336'],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 12
            }
          },
          title: {
            display: false
          }
        }
      }
    });
  }
}