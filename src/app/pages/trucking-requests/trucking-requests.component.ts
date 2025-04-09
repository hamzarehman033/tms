import { Component } from '@angular/core';

@Component({
  selector: 'app-trucking-requests',
  templateUrl: './trucking-requests.component.html',
  standalone: true,
  imports: [],
  styleUrl: './trucking-requests.component.scss'
})
export class TruckingRequestsComponent {
  columnsToDisplay = ['Division', 'Farm', 'Creation_Time', 'Depot', 'Status', 'Action'];
}
