import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/components/table/table.component';
import { AppService } from '../../core/service/app.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  standalone: true,
  imports: [TableComponent],
  styleUrl: './zone.component.scss'
})
export class ZoneComponent implements OnInit {
  legal_id = "qwer_0001";
  name = "zone@qwer_0001";
  email = "Zoqwer_0001@gmail.com";
  contact_number = "9577731321";
  location = "abc ahsdku 241";
  id: any;

  columnsToDisplay = ['Zone_ID', 'Zone_Name', 'createdAt', 'Geographical_Map', 'Zone_Location', 'Action'];
  dataSource: any = [];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.zoneList();
    this.addZone();
    // this.updateZone();
    // this.deleteZone();
    // this.getZone();
  }

  zoneList() {
    const payload = {
    }
    this.appService.zoneList(payload).subscribe((data: any) => {
      this.dataSource = data?.zone?.zones;
      console.log("zone data", this.dataSource);
    })
  }

  addZone() {
    const payload = {
      legal_id: this.legal_id,
      name: this.name,
      email: this.email,
      contact_number: this.contact_number,
      location: this.location
    };

    this.appService.addZone(payload).subscribe((data: any) => {
      console.log("Add zone working");
    })
  }

  updateZone() {
    const payload = {
      id: 56,
      name: this.name,
      contact_number: this.contact_number,
      location: this.location
    }
    this.appService.updateZone(payload).subscribe((data: any) => {
      console.log("Update Zone Called", data?.zone);

    })
  }
  deleteZone() {
    const payload = {
      "id": 1
    }
    this.appService.deleteZone(payload).subscribe((data: any) => {
      console.log("Delete zone api called: ", data?.zone);
    })
  }
  getZone(){
    const payload = {
      "id": 1
    }
    this.appService.getZone(payload).subscribe((data: any)=>{
      console.log("Get Zone API call: ", data?.zone);
      
    })
  }
}
