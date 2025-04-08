import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() type: string = '';
  @Input() color: string = '';
  @Input() label: string = 'Click';
  @Input() size: string = '';
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';

  
  @Output() click = new EventEmitter<void>();
  onClick(){
    if (!this.disabled) {
      this.click.emit();
    }
  }
}
