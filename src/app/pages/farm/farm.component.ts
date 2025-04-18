import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/service/app.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { filterObj } from '../../core/types';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  standalone: true,
  imports: [TableComponent, FormsModule, FiltersComponent],
  styleUrl: './farm.component.scss'
})
export class FarmComponent implements OnInit {
  farm_id: any = 1;
  first_name: any = "new farm added";
  last_name: any = "last farm";
  email: any = "newFarm@gmail.com";
  role_id: any = 4;
  zone_id: any = 1;
  status: any = 1;
  user_id: any;
  farm_address: any = 'Farm location, Farm address';
  latitude: any = '43.343';
  longitude: any = '43.343';

  dataSource: any = [];
  columnsToDisplay = ['Farm_ID', 'Farm_Name', 'createdAt', 'Farm_Zone', 'Farm_Location', 'Farm_Suppliers', 'Action'];

  fields: filterObj[] = [
    { type: 'text', key: 'name', placeholder: 'Enter Name here', value: ''},
    { type: 'text', key: 'id', placeholder: 'Enter Id here', value: ''},
    { type: 'dropdown', key: 'zone', placeholder: 'Select Zone', value: '', 
      options: [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 }
      ]
    }
  ];
  
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.farmList();
  }

  farmFilters: any = {};

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
    this.fields.forEach(field => {
      if (field.value) this.farmFilters[field.key] = field.value;
    });
    
    if(this.farmFilters.id) payload['id'] = [Number(this.farmFilters.id)];
    if(this.farmFilters.name) payload['name'] = this.farmFilters.name;
    if (this.farmFilters.zone) payload['zone'] = Number(this.farmFilters.zone);

    this.appService.farmList(payload).subscribe((data: any) => {
      this.dataSource = data?.data?.rows;     
      console.log("Farm Data: ", this.dataSource);
    })
  }

  updateFarm() {
    const payload = {
      id: this.user_id,
      first_name: "second farm updated",
      address: "updated address for farm 8"
    }
    this.appService.updateFarm(payload).subscribe((data: any) => {
      console.log(data?.data);
      this.farmList();
    })
  }

  deleteFarm(del_id: any) {
    const payload = {
      id: del_id
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
    this.fields.forEach(field =>{
      field.value = '';
    })
    this.farmFilters.id = '';
    this.farmFilters.name = '';
    this.farmFilters.zone = '';
    this.farmList();
  }
}
