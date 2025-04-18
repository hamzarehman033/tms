import { Component, ElementRef, ViewChild } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  standalone: true
})
export class ModalComponent {
  @ViewChild('exampleModal', { static: true }) modalElement!: ElementRef;

  open() {
    const modal = new bootstrap.Modal(this.modalElement.nativeElement);
    modal.show();
  }
}
