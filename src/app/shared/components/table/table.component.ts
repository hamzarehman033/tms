import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatTableModule } from '@angular/material/table';
import { IconComponent } from '../icon/icon.component';
import { OutgoingMessage } from 'http';


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
  @Input() reActivate_button: any;

  @Output() delete_button = new EventEmitter<any>();
  @Output() update_button = new EventEmitter<any>();

  deleteButton(id: any){
    this.delete_button.emit(id);
  }

  updateButton(id: any){
    this.update_button.emit(id);
  }
}
