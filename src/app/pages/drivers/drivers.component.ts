import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../core/service/app.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { filterObj, modalObj, Pagination } from '../../core/types';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { ToastrService } from 'ngx-toastr';
import { title } from 'process';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [TableComponent, CommonModule, MatButtonModule, ReactiveFormsModule, FiltersComponent, ModalComponent, PaginatorComponent],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss'
})
export class DriversComponent implements OnInit {
  @ViewChild('modalRef') modalComponent!: ModalComponent;

  isAddDriver: boolean = false;
  columnsToDisplay = ['Driver_ID', 'Driver_Name', 'age', 'Driver_Phone_Number', 'license_status', 'createdAt', 'Driving_License_Expiry', 'Driver_Status', 'Action'];
  dataSource: any = [];
  driverFilter: any = {};
  editMode: any;

  fields: filterObj[] = [
    { type: 'text', key: 'id', placeholder: 'Enter Id here', value: '' },
    { type: 'text', key: 'name', placeholder: 'Name', value: '' },
    { type: 'text', key: 'age', placeholder: 'Age', value: '' },
    { type: 'text', key: 'license_status', placeholder: 'Status', value: '' }
  ];

  add_fields: modalObj[] = [
    { type: 'text', key: 'first_name', placeholder: 'First Name', value: '' },
    { type: 'text', key: 'last_name', placeholder: 'Last Name', value: '' },
    { type: 'text', key: 'email', placeholder: 'Email', value: '' },
    { type: 'dropdown', key: 'role_id', placeholder: 'Role', value: '', options: [{ label: 1, value: 1 }, { label: 2, value: 2 }, { label: 3, value: 3 }, { label: 4, value: 4 }, { label: 5, value: 5 }], hidden: true },
    { type: 'dropdown', key: 'zone_id', placeholder: 'Zone', value: '', options: [{ label: 1, value: 1 }, { label: 2, value: 2 }, { label: 3, value: 3 }, { label: 4, value: 4 }, { label: 5, value: 5 }] },
    { type: 'text', key: 'license_number', placeholder: 'License Number', value: '' },
    { type: 'date', key: 'license_expiry', placeholder: 'License Expiry Date', value: '' },
    { type: 'text', key: 'age', placeholder: 'Age', value: '' },
    { type: 'text', key: 'phone_number', placeholder: 'Phone Number', value: '' }
  ];

  update_fields: modalObj[] = [
    { type: 'text', key: 'id', placeholder: 'ID', value: '', hidden: true },
    { type: 'text', key: 'first_name', placeholder: 'First Name', value: '', validators: [Validators.required] },
    { type: 'text', key: 'last_name', placeholder: 'Last Name', value: '', validators: [Validators.required] },
    { type: 'text', key: 'email', placeholder: 'Email', value: '', validators: [Validators.required, Validators.email] },
    { type: 'text', key: 'license_number', placeholder: 'License Number', value: '', validators: [Validators.required] },
    { type: 'date', key: 'license_expiry', placeholder: 'License Expiry Date', value: '', validators: [Validators.required] },
    { type: 'text', key: 'age', placeholder: 'Age', value: '' },
    { type: 'text', key: 'phone_number', placeholder: 'Phone Number', value: '', validators: [Validators.required,Validators.minLength(11), Validators.pattern(/^[0-9]+$/)] },
    { type: 'dropdown', key: 'status', placeholder: 'Status', value: '', options: [{ label: 'Active', value: 1 }, { label: 'In Active', value: 0 }] },
    { type: 'text', key: 'restriction_reason', placeholder: 'Restriction Reason', value: '', hidden: true },
  ];

  dataObject: any = {
    add_modal: {
      button_name: 'Add Driver',
      heading: 'Add New Driver',
      description: 'Kindly fill the below details to add Driver.'
    },
    update_modal: {
      button_name: 'Update Driver',
      heading: 'Update Driver',
      description: 'Kindly fill the below details to update Driver.'
    }
  };

  // Pagination
  pagination: Pagination = {
    current_page: 1,
    per_page: 10,
    total_pages: [],
    total_records: 10,
  }
  pageCount:number = 10;

  constructor(private appService: AppService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.driverList();
  }

  openModal() {
    this.editMode = false;
    this.modalComponent.open('','add'); // Call the open method from the modal component
  }

  driverList() {
    const payload: any = {
      limit: this.pagination.per_page,
      page: this.pagination.current_page
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
      this.pagination.total_records = data.data.count;
      let pagesCount = Math.ceil(this.pagination.total_records / this.pagination.per_page);
      this.pagination.total_pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    })
  }

  getDriver(id: any) {
    this.editMode = true;
    const payload: any = {
      id: id
    }
    this.appService.getDriver(payload).subscribe((data: any) => {
    this.modalComponent.open(data, 'update');
    })
  }

  addDriver(data: any) {
    const payload: any = {};

    if (data.first_name) payload['first_name'] = data.first_name;
    if (data.last_name) payload['last_name'] = data.last_name;
    if (data.email) payload['email'] = data.email;
    if (data.role_id) payload['role_id'] = data.role_id;
    if (data.zone_id) payload['zone_id'] = data.zone_id;
    if (data.license_number) payload['license_number'] = data.license_number;
    if (data.license_expiry) payload['license_expiry'] = data.license_expiry;
    if (data.age) payload['age'] = data.age;
    if (data.phone_number) payload['phone_number'] = data.phone_number;

    this.appService.addDriver(payload).subscribe((data: any) => {
      console.log("Driver data: ", data.data.rows);
      this.modalComponent.close();
      this.driverList();
      this.toastr.success("Driver added successfully!", 'Success');
    }, (err)=>{
      this.toastr.error(err.error.message, 'Error');
    })
  }

  updateDriver(data: any) {
    const payload: any = {};
    
    if (data.id) payload['id'] = data.id;
    if (data.first_name) payload['first_name'] = data.first_name;
    if (data.last_name) payload['last_name'] = data.last_name;
    if (data.email) payload['email'] = data.email;
    if (data.license_number) payload['license_number'] = data.license_number;
    if (data.license_expiry) payload['license_expiry'] = data.license_expiry;
    if (data.age) payload['age'] = data.age;
    if (data.phone_number) payload['phone_number'] = data.phone_number;
    if (data.status) payload['status'] = data.status;
    if (data.restriction_reason) payload['restriction_reason'] = data.restriction_reason;
    
    this.appService.updateDriver(payload).subscribe((data: any) => {
      this.driverList();
      this.toastr.success("Record updated!");
    })
  }

  deleteDriver(id: any) {
    const payload = {
      id: id
    }
    this.appService.deleteDriver(payload).subscribe((data: any) => {
      console.log("Delete driver API", data?.data);
      this.driverList();
      this.toastr.success("Recoed deleted!");
    })
  }

  reset() {
    this.fields.forEach(field => {
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

    this.pagination.current_page = 1;
    this.pagination.per_page = 10;
    this.pageCount = 10;
    this.driverList();
  }

  goToPage(page: number): void {
    this.pagination.current_page = page;
    this.driverList();
  }

  selectedPage(pages_Selected: number){
    this.pagination.per_page = pages_Selected;
    this.pagination.current_page = 1;
    this.driverList();
  }
}
