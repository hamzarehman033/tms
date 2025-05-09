import { Component, OnInit } from '@angular/core';
import { LineGraphComponent } from '../../shared/components/line-graph/line-graph.component';
import { PieChartComponent } from '../../shared/components/pie-chart/pie-chart.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { AppService } from '../../core/service/app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LineGraphComponent, PieChartComponent, TableComponent, IconComponent, PaginatorComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  stats_obj: any = [];
  columnsToDisplay = ['Division', 'Farm', 'Creation_Time', 'Depot', 'status', 'Action'];

  constructor(private appService: AppService) { }
  ngOnInit(): void {
    this.getStatus();
  }

  getStatus() {
    const payload: any = {};
    this.appService.getStats(payload).subscribe((data: any) => {
      data.data.forEach((item: any) => {
        this.stats_obj[item.key] = item.value;
      });
      console.log("this.stats_obj",this.stats_obj);
    })
  }
}
