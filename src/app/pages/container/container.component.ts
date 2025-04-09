import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  standalone: true,
  imports: [],
  styleUrl: './container.component.scss'
})
export class ContainerComponent {
  columnsToDisplay = ['Container_ID', 'Container_Type', 'Container_Weight', 'Container_Number', 'Action'];

}
