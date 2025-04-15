import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/service/app.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [TableComponent, FormsModule, CommonModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss'
})
export class DriversComponent implements OnInit{
  isModalOpen = false;
  driver_id: any = 5;
  isAddDriver: boolean = false;
  columnsToDisplay = ['Driver_ID', 'Driver_Name', 'age', 'Driver_Phone_Number', 'license_status', 'createdAt', 'Driving_License_Expiry', 'Driver_Status', 'Action'];
  dataSource: any = [];
  driverFilters = {
    id:'',
    name: '',
    age: '',
    license_status: ''
  }

  constructor(private appService: AppService, private fb: FormBuilder){}
  driverForm !: FormGroup;

  ngOnInit(): void {
    this.driverList();
    this.driverForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      role_id: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      zone_id: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      license_number: ['', [Validators.required]],
      license_expiry: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
    })
  }

  openModal(){
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
  }

  driverList(){
    const payload: any = {
      limit: 10
    }

    if(this.driverFilters.id) payload["id"] = [Number (this.driverFilters.id)];
    if(this.driverFilters.name) payload["name"] = this.driverFilters.name;
    if(this.driverFilters.age) payload["age"] = Number (this.driverFilters.age);
    if(this.driverFilters.license_status) payload["license_status"] = this.driverFilters.license_status;

    this.appService.driverList(payload).subscribe((data: any)=>{
      this.dataSource = data?.data?.rows;
      console.log("Drivers data: ", this.dataSource);
    })
  }

  getDriver(){
    this.appService.getDriver(this.driver_id).subscribe((data: any)=>{
      console.log(data);
      this.driverList();
    })
  }

  addDriver(){
    if(this.driverForm.valid){
      const payload = this.driverForm.value;
      this.appService.addDriver(payload).subscribe((data: any)=>{
        console.log(data);
        this.driverList();
      })
    }
    else{
      alert("All fields are required")
    }
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

  reset(){
    this.driverFilters.id = '';
    this.driverFilters.name = '';
    this.driverFilters.age = '';
    this.driverFilters.license_status = '';
    this.driverList();
  }
}
