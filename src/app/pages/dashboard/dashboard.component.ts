import { Component } from '@angular/core';
import { LineGraphComponent } from '../../shared/components/line-graph/line-graph.component';
import { PieChartComponent } from '../../shared/components/pie-chart/pie-chart.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LineGraphComponent, PieChartComponent, TableComponent, IconComponent, PaginatorComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  columnsToDisplay = ['Division', 'Farm', 'Creation_Time', 'Depot', 'status', 'Action'];
}
