import { Component } from '@angular/core';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  standalone: true,
  imports: [],
  styleUrl: './zone.component.scss'
})
export class ZoneComponent {
  columnsToDisplay = ['Zone_ID', 'Zone_Name', 'createdAt', 'Geographical_Map', 'Zone_Location', 'Action'];
}
