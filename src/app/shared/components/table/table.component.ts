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
  imports: [CommonModule, MatTableModule, MatHeaderCell, MatCell, MatRow, MatHeaderRow, IconComponent, ModalComponent]
})


export class TableComponent {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any;
  @Input() reActivate_button: any;

  @Output() get_button = new EventEmitter<any>();
  @Output() deleteModalDetails = new EventEmitter<any>();
  @Output() getDetails = new EventEmitter<any>();

  @ViewChild('deleteModal') modalComponent !: ModalComponent;
  @ViewChild('sharedModal') sharedModalComponent !: ModalComponent;

  selectedId: any;

  deleteButton(id: any, param: any) {
    this.selectedId = id;
    this.modalComponent.openDelete(this.selectedId, param);
  }

  getButton(id: any) {
    this.get_button.emit(id);
  }

  confirmDelete() {
    this.deleteModalDetails.emit(this.selectedId);
    this.modalComponent.closeDelete();
  }

  getSupplierText(list: any): string {
    if (!list.suppliers || !Array.isArray(list.suppliers)) return '';
    const names: string[] = [];
    for (let j = 0; j < 2; j++) {
      names.push(list.suppliers[j]?.company_name);
    }
    let preview: any;
    const names_array = names.filter(item => item !== undefined && item !== null && item !== '');

    if (names_array.length > 1) preview = names_array.join(', ');
    return names_array.length > 1 ? `${preview}, ...` : names_array[0];
  }

  // Returns the full list (used in tooltip)
  getFullSupplierText(list: any): string {
    if (!list.suppliers || !Array.isArray(list.suppliers)) return '';
    const names: string[] = [];
    for (let j = 0; j < list.suppliers?.length; j++) {
      names.push(list.suppliers[j]?.company_name);
    }
    const preview = names.join(', ');
    return preview;
  }

  openSharedModal(id: any) {
    this.getDetails.emit(id);
  }
}
