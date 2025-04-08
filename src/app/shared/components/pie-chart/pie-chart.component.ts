import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
  @Input() pie_heading: string = '';
  @Input() pie_Data: any[] = [];               
  @Input() pie_Labels: string[] = [];           
  @Input() colors: string[] = [];              
  @Input() showLabels: boolean = true;
}
