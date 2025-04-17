import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatTableModule } from '@angular/material/table';
import { IconComponent } from '../icon/icon.component';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  imports: [CommonModule, MatTableModule,MatHeaderCell, MatCell, MatRow, MatHeaderRow, IconComponent]
})


export class TableComponent {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any;
}
