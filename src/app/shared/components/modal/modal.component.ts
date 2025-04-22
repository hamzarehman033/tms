import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { modalObj } from '../../../core/types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ModalComponent {
  @Input() modal_fields: modalObj[] = [];
  @Input() modal_heading = '';
  @Input() description = '';
  @Input() button_name = '';

  // Input delete id from table componenet
  selectedId: any;

  @Output() addModalDetails = new EventEmitter<any>();
  @Output() yesClicked = new EventEmitter<any>();

  @ViewChild('exampleModal', { static: true }) modalElement!: ElementRef;
  @ViewChild('deleteModal', { static: true }) deleteModalElement!: ElementRef;

  private modal: any;
  private deleteModal: any;
  parameter: any;

  // Add modal details
  addDetails() {
    this.addModalDetails.emit();
  }
  open() {
    if (!this.modal) {
      this.modal = new bootstrap.Modal(this.modalElement?.nativeElement);
    }
    this.modal.show();
  }
  close() {
    if (this.modal) {
      this.modal.hide();
    }
  }

  // Delete details
  deleteDetails() {
    this.yesClicked.emit();
  }
  openDelete(id: any, param: any) {
    this.parameter = param;
    this.selectedId = id;
    if (this.selectedId) {
      this.deleteModal = new bootstrap.Modal(this.deleteModalElement?.nativeElement);
    }
    this.deleteModal.show();
  }
  closeDelete() {
    if (this.deleteModal) {
      this.deleteModal.hide();
    }
  }
}
