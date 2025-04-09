import { Component } from '@angular/core';

@Component({
  selector: 'app-restriction',
  templateUrl: './restriction.component.html',
  standalone: true,
  imports: [],
  styleUrl: './restriction.component.scss'
})
export class RestrictionComponent {
  columnsToDisplay = ['ID', 'Name', 'Phone_number', 'Documents', 'Reason', 'Action'];
}
