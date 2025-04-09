import { Component } from '@angular/core';

@Component({
  selector: 'app-trucks',
  standalone: true,
  imports: [],
  templateUrl: './trucks.component.html',
  styleUrl: './trucks.component.scss'
})
export class TrucksComponent {
  columnsToDisplay = ['ID', 'Farm_Name', 'Created_at', 'Truck_Number', 'Truck_Status', 'Document_Status' ,'Action'];
}
