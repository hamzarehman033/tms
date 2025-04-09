import { Component } from '@angular/core';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  standalone: true,
  imports: [],
  styleUrl: './supplier.component.scss'
})
export class SupplierComponent {
  columnsToDisplay = ['ID', 'Name', 'Documentation_Status', 'Activation', 'Phone_Number', 'Action'];
}
