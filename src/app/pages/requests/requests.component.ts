import { Component } from '@angular/core';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent {
  columnsToDisplay = ['Request_Id', 'Farm_Name', 'Deput', 'Date', 'Vessel', 'Veat', 'Status' ,'Action'];
}
