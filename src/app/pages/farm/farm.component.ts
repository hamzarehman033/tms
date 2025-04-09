import { Component } from '@angular/core';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  standalone: true,
  imports: [],
  styleUrl: './farm.component.scss'
})
export class FarmComponent {
  columnsToDisplay = ['ID', 'Name', 'Created_at', 'Farm-Zone', 'Location', 'Suppliers', 'Action'];
}
