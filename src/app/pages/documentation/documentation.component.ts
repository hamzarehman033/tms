import { Component } from '@angular/core';

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [],
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.scss'
})
export class DocumentationComponent {
  columnsToDisplay = ['id', 'Name', 'User_Id', 'Role', 'createdAt', 'Truck_Number', 'Type', 'status' ,'Action'];
}
