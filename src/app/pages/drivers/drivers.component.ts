import { Component } from '@angular/core';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss'
})
export class DriversComponent {
  columnsToDisplay = ['ID', 'Name', 'Age', 'Current_Allocated_Truck', 'Phone_number', 'License_Status', 'Created_at', 'Driving_License_Expiry', 'Status', 'Action'];
}
