import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  @Input() title: string = '';
  @Input() color: string = '';
  @Input() records: number = 0;
  @Input() description: string = '';
}
