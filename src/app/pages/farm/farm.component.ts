import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../core/service/app.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { Validators } from '@angular/forms';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { filterObj, modalObj, Pagination } from '../../core/types';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { ToastrService } from 'ngx-toastr';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  standalone: true,
  imports: [TableComponent, FiltersComponent, ModalComponent, CommonModule, PaginatorComponent, IconComponent],
  styleUrl: './farm.component.scss'
})
export class FarmComponent implements OnInit {
  @ViewChild('modalRef') modalComponent!: ModalComponent;
  farmFilters: any = {};
  dataSource: any = [];
  columnsToDisplay = ['Farm_ID', 'Farm_Name', 'createdAt', 'Farm_Zone', 'Farm_Location', 'Farm_Suppliers', 'Action'];

  editMode: any;
  fields: filterObj[] = [
    { type: 'text', key: 'name', placeholder: 'Name', value: '' },
    { type: 'text', key: 'id', placeholder: 'Enter Id here', value: '' },
    {
      type: 'dropdown', key: 'zone', placeholder: 'Zone', value: '',
      options: [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 }
      ]
    }
  ];

  add_fields: modalObj[] = [
    { type: 'text', key: 'first_name', placeholder: 'First Name', value: '', validators: [Validators.required] },
    { type: 'text', key: 'last_name', placeholder: 'Last Name', value: '', validators: [Validators.required] },
    { type: 'text', key: 'email', placeholder: 'Email', value: '', validators: [Validators.required, Validators.email] },
    { type: 'dropdown', key: 'zone_id', placeholder: 'Zone', value: '', options: [{ label: 1, value: 1 }, { label: 2, value: 2 }, { label: 3, value: 3 }, { label: 4, value: 4 }], validators: [Validators.required] },
    { type: 'text', key: 'farm_address', placeholder: 'Farm Address', value: '', validators: [Validators.required] },
    { type: 'text', key: 'latitude', placeholder: 'Latitude', value: '', validators: [Validators.required] },
    { type: 'text', key: 'longitude', placeholder: 'Longitude', value: '', validators: [Validators.required] }
  ];

  update_fields: modalObj[] = [
    { type: 'text', key: 'id', placeholder: 'ID', value: '', hidden: true },
    { type: 'text', key: 'first_name', placeholder: 'First Name', value: '', validators: [Validators.required] },
    { type: 'text', key: 'last_name', placeholder: 'Last Name', value: '', validators: [Validators.required] },
    { type: 'text', key: 'email', placeholder: 'Email', value: '', validators: [Validators.required] },
    { type: 'text', key: 'address', placeholder: 'Address', value: '', validators: [Validators.required] },
  ];

  dataObject: any = {
    add_modal: {
      button_name: 'Add Farm',
      heading: 'Add New Farm',
      description: 'Kindly fill the below details to add Farm.'
    },
    update_modal: {
      button_name: 'Update Farm',
      heading: 'Update Farm',
      description: 'Kindly fill the below details to update farm.'
    }
  };

  // Pagination
  pagination: Pagination = {
    current_page: 1,
    per_page: 10,
    total_pages: [],
    total_records: 10,
  }
  pageCount: number = 10;
  constructor(private appService: AppService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.farmList();
  }

  openModal() {
    this.editMode = false;
    this.modalComponent.open('', 'add'); // Call the open method from the modal component
  }

  addFarm(data: any) {
    const payload: any = {
      role_id: 4
    }
    if (data.first_name) payload['first_name'] = data.first_name;
    if (data.last_name) payload['last_name'] = data.last_name;
    if (data.email) payload['email'] = data.email;
    if (data.zone_id) payload['zone_id'] = Number(data.zone_id);
    if (data.status) payload['status'] = Number(data.status);
    if (data.farm_address) payload['farm_address'] = data.farm_address;
    if (data.latitude) payload['latitude'] = data.latitude;
    if (data.longitude) payload['longitude'] = data.longitude;

    this.appService.addFarm(payload).subscribe((data: any) => {
      console.log("Farm Data", data);
      this.modalComponent.close();
      this.farmList();
      this.toastr.success("Record added successfully!");
    },(err)=>{
      this.toastr.error(err.error.message, 'Error');
    })
  }

  farmList() {
    const payload: any = {
      limit: this.pagination.per_page,
      page: this.pagination.current_page
    }
    this.fields.forEach(field => {
      if (field.value) this.farmFilters[field.key] = field.value;
    });

    if (this.farmFilters.id) payload['id'] = [Number(this.farmFilters.id)];
    if (this.farmFilters.name) payload['name'] = this.farmFilters.name;
    if (this.farmFilters.zone) payload['zone'] = Number(this.farmFilters.zone);

    this.appService.farmList(payload).subscribe((data: any) => {
      this.dataSource = data?.data?.rows;
      console.log("Farm Data: ", this.dataSource);
      this.pagination.total_records = data.data.count;
      let pagesCount = Math.ceil(this.pagination.total_records / this.pagination.per_page);
      this.pagination.total_pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    })
  }

  updateFarm(data: any) {
    const payload: any = {};

    if (data.first_name) payload['id'] = Number(data.id);
    if (data.first_name) payload['first_name'] = data.first_name;
    if (data.last_name) payload['last_name'] = data.last_name;
    if (data.email) payload['email'] = data.email;
    if (data.address) payload['address'] = data.address;

    this.appService.updateFarm(payload).subscribe((data: any) => {
      this.farmList();
      this.toastr.success("Record updated");
    },(err)=>{
      this.toastr.error(err.error.message, 'Error');
    })
  }

  deleteFarm(id: any) {
    const payload = {
      id: id
    }
    this.appService.deleteFarm(payload).subscribe((data: any) => {
      console.log(data.data);
      this.farmList();
      this.toastr.success("Farm deleted successfully!");
    })
  }

  getFarm(id: any) {
    this.editMode = true;
    const payload = {
      id: id,
    }
    this.appService.getFarm(payload).subscribe((data: any) => {
      this.modalComponent.open(data, 'update');
    })
  }

  reset() {
    this.fields.forEach(f => {
      f.value = '';
    });

    this.farmFilters.first_name = '';
    this.farmFilters.last_name = '';
    this.farmFilters.email = '';
    this.farmFilters.zone_id = '';
    this.farmFilters.status = '';
    this.farmFilters.farm_address = '';
    this.farmFilters.latitude = '';
    this.farmFilters.longitude = '';
    this.farmFilters.id = '';
    this.farmFilters.name = '';
    this.farmFilters.zone = '';

    this.pagination.current_page = 1;
    this.pagination.per_page = 10;
    this.pageCount = 10;
    this.farmList();
  }

  goToPage(page: number): void {
    this.pagination.current_page = page;
    this.farmList();
  }

  selectedPage(pages_Selected: number){
    this.pagination.per_page = pages_Selected;
    this.pagination.current_page = 1;
    this.farmList();
  }
}