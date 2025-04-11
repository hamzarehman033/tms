import { Component } from '@angular/core';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.scss'
})
export class AssignmentsComponent {
  columnsToDisplay = ['id', 'Form_Name', 'Deput', 'Request_Id', 'Truck_Number', 'Driver', 'Depot_Status','Action'];
}
