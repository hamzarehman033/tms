import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/service/app.service';
import { TableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  standalone: true,
  imports: [TableComponent],
  styleUrl: './farm.component.scss'
})
export class FarmComponent implements OnInit {
  farm_id: any;
  first_name: any = "first name";
  last_name: any = "last name";
  email: any = "farm03246@gmail.com";
  role_id: any = 4;
  zone_id: any = 23654;
  status: any = 1;
  farm_address: any = 'AbcFarm, city xyz';
  latitude: any = '43.343';
  longitude: any = '43.343';

  dataSource: any = [];
  columnsToDisplay = ['id', 'Farm_Name', 'createdAt', 'Farm_Zone', 'Farm_Location', 'Suppliers', 'Action'];

  constructor(private appService: AppService) { }
  ngOnInit(): void {
    // this.addFarm();
    this.farmList();
  }

  addFarm() {
    const payload = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      role_id: this.role_id,
      zone_id: this.zone_id,
      status: this.status,
      farm_address: this.farm_address,
      latitude: this.latitude,
      longitude: this.longitude
    };
    this.appService.addFarm(payload).subscribe((data: any) => {
      console.log("Farm Data", data);
    })
  }

  farmList() {
    const payload = {
      limit: 5
    }
    this.appService.farmList(payload).subscribe((data: any) => {
      this.dataSource = data?.data?.farms;
      console.log("Farm Data: ", this.dataSource);
    })
  }

  updateFarm() {
    const payload = {
      id: 1,
      first_name: "updated_farm",
      address: "abc xyz address"
    }
    this.appService.updateFarm(payload).subscribe((data: any) => {
      console.log(data?.data);
    })
  }

  deleteFarm() {
    const payload = {
      id: 4
    }
    this.appService.deleteFarm(payload).subscribe((data: any) => {
      console.log(data.data);
    })
  }

  getFarm(){
    const payload = {
      "id": this.farm_id
    }
    this.appService.getFarm(payload).subscribe((data: any)=>{
      console.log("Get Farm API working", data?.data);
      
    })
  }
}
