import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../core/service/app.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { filterObj } from '../../core/types';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [TableComponent, FormsModule, CommonModule, MatButtonModule, ReactiveFormsModule, FiltersComponent, ModalComponent],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss'
})
export class DriversComponent implements OnInit{
  @ViewChild('modalRef') modalComponent!: ModalComponent;
  fields: filterObj[] = [
    { type: 'text', key: 'id', placeholder: 'Enter Id here', value: ''},
    { type: 'text', key: 'name', placeholder: 'Enter Name here', value: ''},
    { type: 'text', key: 'age', placeholder: 'Enter Age here', value: ''},
    { type: 'text', key: 'license_status', placeholder: 'Status', value: ''}
  ];

  isModalOpen = false;
  isUpdateModal = false;
  driver_id: any = 5;
  isAddDriver: boolean = false;
  columnsToDisplay = ['Driver_ID', 'Driver_Name', 'age', 'Driver_Phone_Number', 'license_status', 'createdAt', 'Driving_License_Expiry', 'Driver_Status', 'Action'];
  dataSource: any = [];
  driverFilters: any = {}

  constructor(private appService: AppService, private fb: FormBuilder){}
  driverForm !: FormGroup;

  ngOnInit(): void {
    this.driverList();
    this.driverForm = this.fb.group({
      id: ['',[Validators.required]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      role_id: ['', [Validators.required, Validators.pattern('^[0-9]$') ]],
      zone_id: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      license_number: ['', [Validators.required]],
      license_expiry: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], 
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  openModal() {
    this.modalComponent.open(); // Call the open method from the modal component
  }
  openUpdateModal(){
    this.isUpdateModal = true;
  }

  closeModal(){
    this.isModalOpen = false;
    this.isUpdateModal = false;
  }

  driverList(){
    const payload: any = {
      limit: 10
    }
    this.fields.forEach(field => {
      if(field.value) this.driverFilters[field.key] = field.value;
    });

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
      // const payload = this.driverForm.value;
      const payload = {
        first_name: this.driverForm.value.first_name,
        last_name: this.driverForm.value.last_name,
        email: this.driverForm.value.email,
        role_id: this.driverForm.value.role_id,
        zone_id: this.driverForm.value.zone_id,
        license_number: this.driverForm.value.license_number,
        license_expiry : this.driverForm.value.license_expiry,
        age: this.driverForm.value.age,
        phone_number: this.driverForm.value.phone_number
      }
      this.appService.addDriver(payload).subscribe((data: any)=>{
        console.log(data);
        this.isModalOpen = false;
        this.driverList();
      })
    }
    else{
      alert("Invalid details, please check!")
    }
  }
  
  updateDriver(){
    if(this.driverForm.valid){
      // const payload: any = this.driverForm.value;
      const payload = {
        id: this.driverForm.value.id,
        first_name: this.driverForm.value.first_name,
        last_name: this.driverForm.value.last_name,
        email: this.driverForm.value.email,
        zone_id: this.driverForm.value.zone_id,
        license_number: this.driverForm.value.license_number,
        license_expiry : this.driverForm.value.license_expiry,
        age: this.driverForm.value.age
    }
    this.appService.updateDriver(payload).subscribe((data: any)=>{
      console.log(data);
      this.driverList();
    })
    }else{
      alert("Invalid details, please check!")
    }
  }
  
  deleteDriver(del_id: any){
    const payload = {
      id: del_id
  }
    this.appService.deleteDriver(payload).subscribe((data: any)=>{
      console.log("Delete driver API", data?.data);
      this.driverList();
    })
  }

  reset(){
    this.fields.forEach(field => {
      field.value = '';
    });
    this.driverFilters.id = '';
    this.driverFilters.name = '';
    this.driverFilters.age = '';
    this.driverFilters.license_status = '';
    this.driverList();
  }
}
