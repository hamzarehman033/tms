import { Component } from '@angular/core';
import { LineGraphComponent } from '../../shared/components/line-graph/line-graph.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LineGraphComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
