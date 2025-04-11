import { Component } from '@angular/core';

@Component({
  selector: 'app-trucks',
  standalone: true,
  imports: [],
  templateUrl: './trucks.component.html',
  styleUrl: './trucks.component.scss'
})
export class TrucksComponent {
  columnsToDisplay = ['id', 'Farm_Name', 'createdAt', 'Truck_Number', 'Truck_Status', 'Document_Status' ,'Action'];
}
