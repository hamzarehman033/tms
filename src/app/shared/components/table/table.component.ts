import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatTableModule } from '@angular/material/table';
import { IconComponent } from '../icon/icon.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  imports: [CommonModule, MatTableModule,MatHeaderCell, MatCell, MatRow, MatHeaderRow, IconComponent, ModalComponent]
})


export class TableComponent {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any;
  @Input() reActivate_button: any;

  @Output() update_button = new EventEmitter<any>();
  @Output() deleteModalDetails = new EventEmitter<any>();
 
  @ViewChild('deleteModal') modalComponent !: ModalComponent;

  selectedId: any;

  deleteButton(id: any, param: any){
    this.selectedId = id;
    this.modalComponent.openDelete(this.selectedId, param);
  }

  updateButton(id: any){
    this.update_button.emit(id);
  }

  confirmDelete(){
    this.deleteModalDetails.emit(this.selectedId);
    this.modalComponent.closeDelete();
  }
}
