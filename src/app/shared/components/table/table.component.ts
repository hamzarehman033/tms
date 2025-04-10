import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatTableModule } from '@angular/material/table';

const TABLE_DATA = [
  { Division: 1, Farm: 'Hydrogen', Creation_Time: 1.0079, Depot: 'H', Status: 'abc', Action: 'approved' },
  { Division: 2, Farm: 'Helium', Creation_Time: 4.0026, Depot: 'He', Status: 'N/A', Action: 'N/A' },
  { Division: 3, Farm: 'Lithium', Creation_Time: 6.941, Depot: 'Li', Status: 'N/A', Action: 'N/A' },
  { Division: 4, Farm: 'Beryllium', Creation_Time: 9.0122, Depot: 'Be', Status: 'N/A', Action: 'N/A' },
  { Division: 5, Farm: 'Boron', Creation_Time: 10.811, Depot: 'B', Status: 'N/A', Action: 'N/A' },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  imports: [CommonModule, MatTableModule,MatHeaderCell, MatCell, MatRow, MatHeaderRow]
})


export class TableComponent {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource = TABLE_DATA;
}
