import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../core/service/app.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { filterObj, modalObj } from '../../core/types';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  standalone: true,
  imports: [TableComponent, FormsModule, FiltersComponent, ModalComponent, CommonModule],
  styleUrl: './farm.component.scss'
})
export class FarmComponent implements OnInit {
  @ViewChild('modalRef') modalComponent!: ModalComponent;
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

  button_name = 'Add Farm';
  farmFilters: any = {};
  dataSource: any = [];
  columnsToDisplay = ['Farm_ID', 'Farm_Name', 'createdAt', 'Farm_Zone', 'Farm_Location', 'Farm_Suppliers', 'Action'];

  fields: filterObj[] = [
    { type: 'text', key: 'name', placeholder: 'Enter Name here', value: '' },
    { type: 'text', key: 'id', placeholder: 'Enter Id here', value: '' },
    { type: 'dropdown', key: 'zone', placeholder: 'Select Zone', value: '',
      options: [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 }
      ]
    }
  ];

  heading = 'Add New Farm';
  description = 'Kindly fill the below details to add the farm.';
  modal_fields: modalObj[] = [
    { type: 'text', key: 'first_name', placeholder: 'First Name', value: '' },
    { type: 'text', key: 'last_name', placeholder: 'Last Name', value: '' },
    { type: 'text', key: 'email', placeholder: 'Email', value: '' },
    { type: 'dropdown', key: 'role_id', placeholder: 'Role', value: '', options: [ { label: 1, value: 1 }, { label: 2, value: 2 }, { label: 3, value: 3 }, { label: 4, value: 4 } ] },
    { type: 'dropdown', key: 'zone_id', placeholder: 'Zone', value: '', options: [ { label: 1, value: 1 }, { label: 2, value: 2 }, { label: 3, value: 3 }, { label: 4, value: 4 } ] },
    { type: 'dropdown', key: 'status', placeholder: 'Status', value: '', options: [ { label: 'Active', value: 0 }, { label: 'Inactive', value: 1 } ] },
    { type: 'text', key: 'farm_address', placeholder: 'Farm Address', value: '' },
    { type: 'text', key: 'latitude', placeholder: 'Latitude', value: '' },
    { type: 'text', key: 'longitude', placeholder: 'Longitude', value: '' }
  ];
  
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.farmList();
  }
  openModal() {
    this.modalComponent.open(); // Call the open method from the modal component
  }

  addFarm() {
    this.modal_fields.forEach(field => {
      if (field.value) this.farmFilters[field.key] = field.value;
    });
    const payload: any ={}
    if (this.farmFilters.first_name) payload['first_name'] = this.farmFilters.first_name;
    if (this.farmFilters.last_name) payload['last_name'] = this.farmFilters.last_name;
    if (this.farmFilters.email) payload['email'] = this.farmFilters.email;
    if (this.farmFilters.role_id) payload['role_id'] = Number(this.farmFilters.role_id);
    if (this.farmFilters.zone_id) payload['zone_id'] = Number(this.farmFilters.zone_id);
    if (this.farmFilters.status) payload['status'] = Number(this.farmFilters.status);
    if (this.farmFilters.farm_address) payload['farm_address'] = this.farmFilters.farm_address;
    if (this.farmFilters.latitude) payload['latitude'] = this.farmFilters.latitude;
    if (this.farmFilters.longitude) payload['longitude'] = this.farmFilters.longitude;
    this.appService.addFarm(payload).subscribe((data: any) => {
      console.log("Farm Data", data);
      this.modalComponent.close();
      this.reset();
    })
  }

  farmList() {
    const payload: any = {
      limit: 10
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

  getFarm() {
    const payload = {
      id: this.farm_id,
    }
    this.appService.getFarm(payload).subscribe((data: any) => {
      this.dataSource = data;
    })
  }

  reset() {
    this.fields.forEach(f => {
      f.value = '';
    });

    this.modal_fields.forEach(f => {
      f.value = '';
    });
    this.farmFilters.first_name = '';
    this.farmFilters.last_name = '';
    this.farmFilters.email = '';
    this.farmFilters.role_id = '';
    this.farmFilters.zone_id = '';
    this.farmFilters.status = '';
    this.farmFilters.farm_address = '';
    this.farmFilters.latitude = '';
    this.farmFilters.longitude = '';
    this.farmFilters.id = '';
    this.farmFilters.name = '';
    this.farmFilters.zone = '';
    this.farmList();
  }
}
