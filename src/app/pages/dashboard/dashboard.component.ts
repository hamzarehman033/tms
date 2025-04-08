import { Component } from '@angular/core';
import { LineGraphComponent } from '../../shared/components/line-graph/line-graph.component';
import { PieChartComponent } from '../../shared/components/pie-chart/pie-chart.component';
import { TableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LineGraphComponent, PieChartComponent, TableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
