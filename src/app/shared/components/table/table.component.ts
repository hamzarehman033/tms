import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatTableModule } from '@angular/material/table';

const ELEMENT_DATA = [
  {Division: 1, Farm: 'Hydrogen', Creation: 1.0079, Depot: 'H'},
  {Division: 2, Farm: 'Helium', Creation: 4.0026, Depot: 'He'},
  {Division: 3, Farm: 'Lithium', Creation: 6.941, Depot: 'Li'},
  {Division: 4, Farm: 'Beryllium', Creation: 9.0122, Depot: 'Be'},
  {Division: 5, Farm: 'Boron', Creation: 10.811, Depot: 'B'},
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  imports: [CommonModule, MatTableModule,MatHeaderCell, MatCell, MatRow, MatHeaderRow, FormsModule]
})


export class TableComponent {
  displayedColumns: string[] = ['Division', 'Creation'];
  dataSource = ELEMENT_DATA;
}
