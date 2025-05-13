import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { filterObj, modalObj, Pagination } from '../../core/types';
import { Validators } from '@angular/forms';
import { AppService } from '../../core/service/app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-farm-users',
  templateUrl: './farm-users.component.html',
  styleUrl: './farm-users.component.scss',
  standalone: true,
  imports: [TableComponent, FiltersComponent, ModalComponent, CommonModule, PaginatorComponent, IconComponent],
})
export class FarmUsersComponent implements OnInit {

  @ViewChild('modalRef') modalComponent!: ModalComponent;
  farmFilters: any = {};
  dataSource: any = [];
  columnsToDisplay = ['farm_user_ID', 'farm_userName', 'farm_user_email', 'user_ph_no', 'farm_user_status', 'Action'];

  editMode: any;
  zone_data: any = [];
  fields: filterObj[] = [
    { type: 'text', key: 'name', placeholder: 'Name', value: '' },
    { type: 'text', key: 'id', placeholder: 'Enter Id here', value: '' }
  ];

  add_fields: modalObj[] = [
    { type: 'text', key: 'farm_id', placeholder: 'Farm ID', value: '', validators: [Validators.required] },
    { type: 'text', key: 'first_name', placeholder: 'First Name', value: '', validators: [Validators.required] },
    { type: 'text', key: 'last_name', placeholder: 'Last Name', value: '', validators: [Validators.required] },
    { type: 'text', key: 'email', placeholder: 'Email', value: '', validators: [Validators.required, Validators.email] },
    { type: 'dropdown', key: 'zone_id', placeholder: 'Zone', value: '', options: [], validators: [Validators.required] },
    { type: 'text', key: 'phone_number', placeholder: 'Contact Number', value: '', validators: [Validators.required, Validators.minLength(11), Validators.pattern(/^[0-9]+$/)] },
    { type: 'dropdown', key: 'status', placeholder: 'Status', value: '', options: [{ label: 'Active', value: 1 }, { label: 'In Active', value: 0 }], validators: [Validators.required] },
    { type: 'text', key: 'restriction_reason', placeholder: 'Restriction Reason', value: '', hidden: true }
  ];

  update_fields: modalObj[] = [
    { type: 'text', key: 'id', placeholder: 'ID', value: '', hidden: true },
    { type: 'text', key: 'farm_id', placeholder: 'Farm ID', value: '', validators: [Validators.required] },
    { type: 'text', key: 'first_name', placeholder: 'First Name', value: '', validators: [Validators.required] },
    { type: 'text', key: 'last_name', placeholder: 'Last Name', value: '', validators: [Validators.required] },
    { type: 'text', key: 'email', placeholder: 'Email', value: '', validators: [Validators.required] },
    { type: 'text', key: 'phone_number', placeholder: 'Contact Number', value: '', validators: [Validators.required, Validators.minLength(11), Validators.pattern(/^[0-9]+$/)] },
    { type: 'dropdown', key: 'status', placeholder: 'Status', value: '', options: [{ label: 'Active', value: 1 }, { label: 'In Active', value: 0 }], validators: [Validators.required] },
    { type: 'text', key: 'restriction_reason', placeholder: 'Restriction Reason', value: '', hidden: true }
  ];

  dataObject: any = {
    add_modal: {
      button_name: 'Add Farm User',
      heading: 'Add New Farm User',
      description: 'Kindly fill the below details to add Farm User.'
    },
    update_modal: {
      button_name: 'Update Farm',
      heading: 'Update Farm',
      description: 'Kindly fill the below details to update farm user.'
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
    this.farmUserList();
    this.zoneList();
  }

  openModal() {
    this.editMode = false;
    this.modalComponent.open('', 'add'); // Call the open method from the modal component
  }

  addFarmUser(data: any) {
    const payload: any = {}
    if (data.farm_id) payload['farm_id'] = data.farm_id;
    if (data.first_name) payload['first_name'] = data.first_name;
    if (data.last_name) payload['last_name'] = data.last_name;
    if (data.email) payload['email'] = data.email;
    if (data.phone_number) payload['phone_number'] = data.phone_number;
    if (data.zone_id) payload['zone_id'] = data.zone_id;
    if (data.status) payload['status'] = data.status;

    this.appService.addFarmUser(payload).subscribe((data: any) => {
      console.log("Farm User Data", data);
      this.modalComponent.close();
      this.farmUserList();
      this.toastr.success("Record added successfully!", 'Success');
    }, (err) => {
      this.toastr.error(err.error.message, 'Error');
    })
  }

  farmUserList() {
    const payload: any = {
      limit: this.pagination.per_page,
      page: this.pagination.current_page
    }
    this.fields.forEach(field => {
      if (field.value) this.farmFilters[field.key] = field.value;
    });

    if (this.farmFilters.id) payload['id'] = [Number(this.farmFilters.id)];
    if (this.farmFilters.name) payload['name'] = this.farmFilters.name;

    this.appService.farmUserList(payload).subscribe((data: any) => {
      this.dataSource = data?.data?.rows;
      console.log("Farm User Data: ", this.dataSource);
      this.pagination.total_records = data.data.count;
      let pagesCount = Math.ceil(this.pagination?.total_records / this.pagination.per_page);
      this.pagination.total_pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    })
  }

  zoneList() {
    const payload: any = {};
    this.appService.zoneList(payload).subscribe((data: any) => {
      let row = data.data.rows;
      this.zone_data = row.map((r: any) => ({
        name: r.name,
        id: r.id
      }));

      console.log("this.zone_data", this.zone_data);

      // Now update the dropdown options in add_fields
      const zoneOptions = this.zone_data.map((zone: any) => ({
        label: zone.name,
        value: zone.id
      }));

      ['zone_id', 'zone'].forEach(key => {
        [this.add_fields, this.update_fields, this.fields].forEach(fieldArray => {
          const field = fieldArray.find(f => f.key === key);
          if (field) field.options = zoneOptions;
        });
      });


    });
  }

  updateFarmUser(data: any) {
    const payload: any = {};

    if (data.first_name) payload['id'] = Number(data.id);
    if (data.first_name) payload['first_name'] = data.first_name;
    if (data.last_name) payload['last_name'] = data.last_name;
    if (data.email) payload['email'] = data.email;
    if (data.address) payload['address'] = data.address;

    this.appService.updateFarmUser(payload).subscribe((data: any) => {
      this.farmUserList();
      this.toastr.success("Record updated", 'Success');
    }, (err) => {
      this.toastr.error(err.error.message, 'Error');
    })
  }

  deleteFarmUser(id: any) {
    const payload = {
      id: id
    }
    this.appService.deleteFarmUser(payload).subscribe((data: any) => {
      console.log(data.data);
      this.farmUserList();
      this.toastr.success("Farm deleted successfully!", 'Success');
    }, (err) => {
      this.toastr.error(err.error.message, 'Error');
    });
  }

  getFarmUser(id: any) {
    this.editMode = true;
    const payload = {
      id: id,
    }
    this.appService.getFarmUser(payload).subscribe((data: any) => {
      this.modalComponent.open(data, 'update');
    })
  }

  getDetails(id: any) {
    this.editMode = true;
    this.modalComponent.openSharedModal(id);
    let subscription = this.modalComponent.result$.subscribe(data => {
      if (data == 'update') {
        this.farmUserList();
        subscription.unsubscribe();
      }
    }
    );
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
    this.farmUserList();
  }

  goToPage(page: number): void {
    this.pagination.current_page = page;
    this.farmUserList();
  }

  selectedPage(pages_Selected: number) {
    this.pagination.per_page = pages_Selected;
    this.pagination.current_page = 1;
    this.farmUserList();
  }

}
