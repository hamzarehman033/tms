import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../core/service/app.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { filterObj, modalObj } from '../../core/types';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [TableComponent, FormsModule, CommonModule, MatButtonModule, ReactiveFormsModule, FiltersComponent, ModalComponent],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss'
})
export class DriversComponent implements OnInit {
  @ViewChild('modalRef') modalComponent!: ModalComponent;

  fields: filterObj[] = [
    { type: 'text', key: 'id', placeholder: 'Enter Id here', value: '' },
    { type: 'text', key: 'name', placeholder: 'Enter Name here', value: '' },
    { type: 'text', key: 'age', placeholder: 'Enter Age here', value: '' },
    { type: 'text', key: 'license_status', placeholder: 'Status', value: '' }
  ];

  driver_id: any = 5;
  isAddDriver: boolean = false;
  columnsToDisplay = ['Driver_ID', 'Driver_Name', 'age', 'Driver_Phone_Number', 'license_status', 'createdAt', 'Driving_License_Expiry', 'Driver_Status', 'Action'];
  dataSource: any = [];
  driverFilter: any = {};

  button_name = 'Add Driver';
  heading = 'Add  New Trucking Company'
  description = 'Kindly fill the below details to add the Trucking Company.';
  modal_fields: modalObj[] = [
    { type: 'text', key: 'first_name', placeholder: 'First Name', value: '' },
    { type: 'text', key: 'last_name', placeholder: 'Last Name', value: '' },
    { type: 'text', key: 'email', placeholder: 'Email', value: '' },
    { type: 'dropdown', key: 'role_id', placeholder: 'Role', value: '', options: [{ label: 1, value: 1 }, { label: 2, value: 2 }, { label: 3, value: 3 }, { label: 4, value: 4 }, { label: 5, value: 5 }] },
    { type: 'dropdown', key: 'zone_id', placeholder: 'Zone', value: '', options: [{ label: 1, value: 1 }, { label: 2, value: 2 }, { label: 3, value: 3 }, { label: 4, value: 4 }, { label: 5, value: 5 }] },
    { type: 'text', key: 'license_number', placeholder: 'License Number', value: '' },
    { type: 'date', key: 'license_expiry', placeholder: 'license Expiry Date', value: '' },
    { type: 'text', key: 'age', placeholder: 'Age', value: '' },
    { type: 'text', key: 'phone_number', placeholder: 'Phone Number', value: '' }
  ];

  constructor(private appService: AppService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.driverList();
  }

  openModal() {
    this.modalComponent.open(); // Call the open method from the modal component
  }

  driverList() {
    const payload: any = {
      limit: 10
    }
    this.fields.forEach(field => {
      if (field.value) this.driverFilter[field.key] = field.value;
    });

    if (this.driverFilter.id) payload["id"] = [Number(this.driverFilter.id)];
    if (this.driverFilter.name) payload["name"] = this.driverFilter.name;
    if (this.driverFilter.age) payload["age"] = Number(this.driverFilter.age);
    if (this.driverFilter.license_status) payload["license_status"] = this.driverFilter.license_status;

    this.appService.driverList(payload).subscribe((data: any) => {
      this.dataSource = data?.data?.rows;
      console.log("Drivers data: ", this.dataSource);
    })
  }

  getDriver() {
    this.appService.getDriver(this.driver_id).subscribe((data: any) => {
      console.log(data);
      this.driverList();
    })
  }

  addDriver() {
    const payload: any = {};

    this.modal_fields.forEach(field => {
      if (field.value) this.driverFilter[field.key] = field.value;
    });

    if (this.driverFilter.first_name) payload['first_name'] = this.driverFilter.first_name;
    if (this.driverFilter.last_name) payload['last_name'] = this.driverFilter.last_name;
    if (this.driverFilter.email) payload['email'] = this.driverFilter.email;
    if (this.driverFilter.role_id) payload['role_id'] = this.driverFilter.role_id;
    if (this.driverFilter.zone_id) payload['zone_id'] = this.driverFilter.zone_id;
    if (this.driverFilter.license_number) payload['license_number'] = this.driverFilter.license_number;
    if (this.driverFilter.license_expiry) payload['license_expiry'] = this.driverFilter.license_expiry;
    if (this.driverFilter.age) payload['age'] = this.driverFilter.age;
    if (this.driverFilter.phone_number) payload['phone_number'] = this.driverFilter.phone_number;

    this.appService.addDriver(payload).subscribe((data: any) => {
      console.log("Driver data: ", data.data.rows);
      this.modalComponent.close();
      this.reset();
    })
  }

  updateDriver() {

    const payload = {
      // id: this.id,
      // first_name: this.first_name,
      // last_name: this.last_name,
      // email: this.email,
      // zone_id: this.zone_id,
      // license_number: this.license_number,
      // license_expiry : this.license_expiry,
      // age: this.age
    }
    this.appService.updateDriver(payload).subscribe((data: any) => {
      console.log(data);
      this.driverList();
    })
  }

  deleteDriver(del_id: any) {
    const payload = {
      id: del_id
    }
    this.appService.deleteDriver(payload).subscribe((data: any) => {
      console.log("Delete driver API", data?.data);
      this.driverList();
    })
  }

  reset() {
    this.fields.forEach(field => {
      field.value = '';
    });
    this.modal_fields.forEach(field => {
      field.value = '';
    });
    this.driverFilter.id = '';
    this.driverFilter.name = '';
    this.driverFilter.age = '';
    this.driverFilter.license_status = '';
    this.driverFilter.first_name = '';
    this.driverFilter.last_name = '';
    this.driverFilter.email = '';
    this.driverFilter.role_id = '';
    this.driverFilter.zone_id = '';
    this.driverFilter.license_number = '';
    this.driverFilter.license_expiry = '';

    this.driverList();
  }
}
