import { Component } from '@angular/core';

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.scss'
})
export class DocumentationComponent {
  columnsToDisplay = ['ID', 'Name', 'User_Id', 'Role', 'Created_at', 'Truck_Number', 'Type', 'Status' ,'Action'];
}
