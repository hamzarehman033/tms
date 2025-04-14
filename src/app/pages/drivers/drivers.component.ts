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
  driver_id: any = 5;
  columnsToDisplay = ['Driver_ID', 'Driver_Name', 'age', 'Driver_Phone_Number', 'license_status', 'createdAt', 'Driving_License_Expiry', 'Driver_Status', 'Action'];
  dataSource: any = [];

  constructor(private appService: AppService){}
  ngOnInit(): void {
    this.driverList();
  }

  driverList(){
    const payload = {
      limit: 10
    }
    this.appService.driverList(payload).subscribe((data: any)=>{
      this.dataSource = data?.data?.drivers;
      console.log(this.dataSource);
    })
  }

  getDriver(){
    this.appService.getDriver(this.driver_id).subscribe((data: any)=>{
      console.log(data);
      this.driverList();
    })
  }

  addDriver(){
    const payload = {
      first_name: "driver_002",
      last_name: "driverrr 002",
      email: "driver_02@gmail.com",
      role_id: 5,
      zone_id: 1,
      license_number: "abclicense0002",
      license_expiry : "12/08/2026",
      age: 31,
      phone_number: "983458327"
  }
    this.appService.addDriver(payload).subscribe((data: any)=>{
      console.log(data);
      this.driverList();
    })
  }
  
  updateDriver(){
    const payload = {
      id: 3,
      first_name: "updated Driver",
      last_name: "user0623",
      email: "driver0643@gmail.com",
      zone_id: 2,
      license_number: "12345678",
      license_expiry : "12/03/2026",
      age: 21
  }
    this.appService.updateDriver(payload).subscribe((data: any)=>{
      console.log(data);
      this.driverList();
    })
  }
  
  deleteDriver(){
    const payload = {
      "id": this.driver_id
  }
    this.appService.deleteDriver(payload).subscribe((data: any)=>{
      console.log("Delete driver API", data?.data);
      this.driverList();
    })
  }
}
