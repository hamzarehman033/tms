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
  @Output() addModalDetails = new EventEmitter<any>();
  @ViewChild('exampleModal', { static: true }) modalElement!: ElementRef;

  private modal: any;
  // Add modal details
  addDetails(){
    this.addModalDetails.emit();
  }

  open() {
    this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
    this.modal.show();
  }
  
  close(){
    if (this.modal) {
      this.modal.hide();
    }
  }
}
