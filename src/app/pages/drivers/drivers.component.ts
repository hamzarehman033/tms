import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/service/app.service';
import { TableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss'
})
export class DriversComponent implements OnInit{
  driver_id: any = 1;
  columnsToDisplay = ['id', 'Name', 'age', 'Current_Allocated_Truck', 'phone_number', 'license_status', 'createdAt', 'Driving_License_Expiry', 'status', 'Action'];
  dataSource: any = [];

  constructor(private appService: AppService){}
  ngOnInit(): void {
    this.driverList();
  }

  driverList(){
    const payload = {
      limit: 5
    }
    this.appService.driverList(payload).subscribe((data: any)=>{
      this.dataSource = data?.data?.drivers;
      console.log(this.dataSource);
    })
  }

  getDriver(){
    this.appService.getDriver(this.driver_id).subscribe((data: any)=>{
      console.log(data);
    })
  }

  addDriver(){
    const payload = {
      first_name: "driver",
      last_name: "user06",
      email: "driver06@gmail.com",
      role_id: 5,
      zone_id: 1,
      license_number: 123456,
      license_expiry : "12/08/2026",
      age: 26
  }
    this.appService.addDriver(payload).subscribe((data: any)=>{
      console.log(data);
    })
  }
  
  updateDriver(){
    const payload = {
      id: 3,
      first_name: "updated Driver",
      last_name: "user06",
      email: "driver06@gmail.com",
      zone_id: 2,
      license_number: 12345678,
      license_expiry : "12/03/2026",
      age: 26
  }
    this.appService.updateDriver(payload).subscribe((data: any)=>{
      console.log(data);
    })
  }
  
  deleteDriver(){
    const payload = {
      "id": this.driver_id
  }
    this.appService.deleteDriver(payload).subscribe((data: any)=>{
      console.log(data);
    })
  }
}
