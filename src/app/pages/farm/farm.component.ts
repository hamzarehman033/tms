import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/service/app.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  standalone: true,
  imports: [TableComponent, FormsModule],
  styleUrl: './farm.component.scss'
})
export class FarmComponent implements OnInit {
  farm_id: any = 1;
  first_name: any = "farm 99";
  last_name: any = "last farm";
  email: any = "farm99999@gmail.com";
  role_id: any = 4;
  zone_id: any = 1;
  status: any = 1;
  farm_address: any = 'Farm location, city xyz';
  latitude: any = '43.343';
  longitude: any = '43.343';

  dataSource: any = [];
  columnsToDisplay = ['Farm_ID', 'Farm_Name', 'createdAt', 'Farm_Zone', 'Farm_Location', 'Farm_Suppliers', 'Action'];

  constructor(private appService: AppService) { }
  ngOnInit(): void {
    this.farmList();
  }
  farmFilters = {
    id: '',
    name: ''
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
      this.farmList();
    })
  }

  farmList() {
    const payload: any = {
      limit: 10
    }

    if(this.farmFilters.id) payload['id'] = Number(this.farmFilters.id);
    if(this.farmFilters.name) payload['name'] = this.farmFilters.name;

    this.appService.farmList(payload).subscribe((data: any) => {
      this.dataSource = data?.data?.farms;     
      console.log("Farm Data: ", this.dataSource);
    })
  }

  updateFarm() {
    const payload = {
      id: 2,
      first_name: "second farm updated",
      address: "updated address"
    }
    this.appService.updateFarm(payload).subscribe((data: any) => {
      console.log(data?.data);
      this.farmList();
    })
  }

  deleteFarm() {
    const payload = {
      id: 5
    }
    this.appService.deleteFarm(payload).subscribe((data: any) => {
      console.log(data.data);
      this.farmList();
    })
  }

  getFarm(){
    const payload = {
      id: this.farm_id,
    }
    this.appService.getFarm(payload).subscribe((data: any)=>{ 
      this.dataSource = data;
    })
  }
  reset(){
    this.farmFilters.id = '';
    this.farmFilters.name = '';
    this.farmList();
  }
}
