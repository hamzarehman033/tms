import { Component } from '@angular/core';
import { AppService } from '../../core/service/app.service';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss'
})
export class DriversComponent {
  driver_id: any;
  columnsToDisplay = ['ID', 'Name', 'Age', 'Current_Allocated_Truck', 'Phone_number', 'License_Status', 'Created_at', 'Driving_License_Expiry', 'Status', 'Action'];
  dataSource: any = [];
  driver_data: any = [];

  constructor(private appService: AppService){}

  getDriver(){
    this.appService.getDriver(this.driver_id).subscribe((data)=>{
      this.dataSource = data;
    })
  }

  addDriver(){
    this.appService.addSupplier(this.driver_data).subscribe((data)=>{
      console.log(data);
    })
  }
  
  updateDriver(){
    this.appService.updateDriver(this.driver_id).subscribe((data)=>{
      console.log(data);
    })
  }
  
  deleteDriver(){
    this.appService.deleteDriver(this.driver_id).subscribe((data)=>{
      console.log(data);
    })
  }
}
