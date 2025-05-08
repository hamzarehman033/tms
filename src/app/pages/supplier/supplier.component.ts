import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../core/service/app.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { filterObj, modalObj, Pagination } from '../../core/types';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { Validators } from '@angular/forms';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { ToastrService } from 'ngx-toastr';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  standalone: true,
  imports: [TableComponent, FiltersComponent, ModalComponent, PaginatorComponent, IconComponent],
  styleUrl: './supplier.component.scss'
})

export class SupplierComponent implements OnInit {
  @ViewChild('modalRef') modalComponent!: ModalComponent;
  fields: filterObj[] = [
    { type: 'text', key: 'id', placeholder: 'Enter Id here', value: '' },
    { type: 'text', key: 'company_name', placeholder: 'Name', value: '' },
    { type: 'text', key: 'email', placeholder: 'Email', value: '' }
  ];

  supplierFilter: any = {};
  columnsToDisplay: string[] = ['Booking_Id', 'Company_Name', 'Supplier_Contact_Person', 'Supplier_Email', 'Action'];
  dataSource: any = [];
  editMode: any;
  zone_data: any = [];

  add_fields: modalObj[] = [
    { type: 'text', key: 'first_name', placeholder: 'First Name', value: '', validators: [Validators.required] },
    { type: 'text', key: 'last_name', placeholder: 'Last Name', value: '', validators: [Validators.required] },
    { type: 'text', key: 'email', placeholder: 'Email', value: '', validators: [Validators.required, Validators.email] },
    { type: 'dropdown', key: 'zone_id', placeholder: 'Zone', value: '', options: [], validators: [Validators.required] },
    { type: 'dropdown', key: 'status', placeholder: 'Status', value: '', options: [{ label: 'Active', value: 0 }, { label: 'Inactive', value: 1 }], validators: [Validators.required] },
    { type: 'text', key: 'company_name', placeholder: 'Company Name', value: '', validators: [Validators.required] },
    { type: 'text', key: 'company_address', placeholder: 'Location', value: '', validators: [Validators.required] },
    { type: 'text', key: 'phone_number', placeholder: 'Phone Number', value: '', validators: [Validators.required, Validators.minLength(11), Validators.pattern(/^[0-9]+$/)] },
    { type: 'text', key: 'restriction_reason', placeholder: 'Restriction Reason', value: '', hidden: true }
  ];

  update_fields: modalObj[] = [
    { type: 'text', key: 'id', placeholder: 'ID', value: '', hidden: true },
    { type: 'text', key: 'first_name', placeholder: 'First Name', value: '', validators: [Validators.required] },
    { type: 'text', key: 'last_name', placeholder: 'Last Name', value: '', validators: [Validators.required] },
    { type: 'text', key: 'email', placeholder: 'Email', value: '', validators: [Validators.required, Validators.email] },
    { type: 'text', key: 'company_name', placeholder: 'Company Name', value: '', validators: [Validators.required] },
    { type: 'text', key: 'company_address', placeholder: 'Company Address', value: '', validators: [Validators.required] },
    {
      type: 'text', key: 'phone_number', placeholder: 'Phone Number', value: '', validators: [Validators.required, Validators.minLength(11),
      Validators.pattern(/^[0-9]+$/)]
    },
    { type: 'dropdown', key: 'status', placeholder: 'Status', value: '', options: [{ label: 'Active', value: 1 }, { label: 'In Active', value: 0 }], validators: [Validators.required] },
    { type: 'text', key: 'restriction_reason', placeholder: 'Restriction Reason', value: '', hidden: true }
  ];

  dataObject: any = {
    add_modal: {
      button_name: 'Add Trucking Company',
      heading: 'Add New Trucking Company',
      description: 'Kindly fill the below details to add the Trucking Company.'
    },
    update_modal: {
      button_name: 'Update Trucking Company',
      heading: 'Update Trucking Company',
      description: 'Kindly fill the below details to update the Trucking Company.'
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
    this.supplierList();
    this.zoneList();
  }

  openModal() {
    this.editMode = false;
    this.modalComponent.open('', 'add'); // Call the open method from the modal component
  }

  supplierList() {
    const payload: any = {
      limit: this.pagination.per_page,
      page: this.pagination.current_page
    };

    this.fields.forEach(field => {
      if (field.value) this.supplierFilter[field.key] = field.value;
    });

    if (this.supplierFilter.id) payload['id'] = [Number(this.supplierFilter.id)];
    if (this.supplierFilter.company_name) payload['company_name'] = this.supplierFilter.company_name;
    if (this.supplierFilter.email) payload['email'] = this.supplierFilter.email;

    this.appService.supplierList(payload).subscribe((data: any) => {
      this.dataSource = data?.data?.rows;
      console.log("Supplier data:", data?.data?.rows);
      this.pagination.total_records = data.data.count;
      let pagesCount = Math.ceil(this.pagination.total_records / this.pagination.per_page);
      this.pagination.total_pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    })
  }

  zoneList() {
    const payload: any = {
      limit: this.pagination.per_page,
      page: this.pagination.current_page
    };
  
    this.appService.zoneList(payload).subscribe((data: any) => {
      let row = data.data.rows;
      this.zone_data = row.map((r: any) => ({
        name: r.name,
        id: r.id
      }));
  
      console.log("this.zone_data", this.zone_data);
  
      // Now update the dropdown options in add_fields
      const zoneField = this.add_fields.find(f => f.key === 'zone_id');
      if (zoneField) {
        zoneField.options = this.zone_data.map((zone: any) => ({
          label: zone.name,
          value: zone.id
        }));
      }
    });
  }

  getSupplier(id: any) {
    this.editMode = true;
    const payload = {
      id: id
    };
    this.appService.getSupplier(payload).subscribe((data: any) => {
      this.modalComponent.open(data, 'update');
    })
  }

  addSupplier(data: any) {

    const payload: any = {
      role_id: 3
    }
    if (data.first_name) payload['first_name'] = data.first_name;
    if (data.last_name) payload['last_name'] = data.last_name;
    if (data.email) payload['email'] = data.email;
    if (data.zone_id) payload['zone_id'] = Number(data.zone_id);
    if (data.status) payload['status'] = Number(data.status);
    if (data.company_name) payload['company_name'] = data.company_name;
    if (data.company_address) payload['company_address'] = data.company_address;
    if (data.phone_number) payload['phone_number'] = data.phone_number;

    this.appService.addSupplier(payload).subscribe((data: any) => {
      // console.log(data?.data?.rows);
      this.modalComponent.close();
      this.toastr.success("Record Added Successfully!", 'Success');
      this.reset();
    },
    (err) => {
      this.toastr.error(err.error.message, 'Error')
    });
  }

  updateSupplier(data: any) {

    const payload: any = {}
    if (data.first_name) payload['id'] = data.id;
    if (data.first_name) payload['first_name'] = data.first_name;
    if (data.last_name) payload['last_name'] = data.last_name;
    if (data.email) payload['email'] = data.email;
    if (data.status) payload['status'] = Number(data.status);
    if (data.restriction_reason) payload['restriction_reason'] = data.restriction_reason;
    if (data.company_name) payload['company_name'] = data.company_name;
    if (data.company_address) payload['company_address'] = data.company_address;
    if (data.phone_number) payload['phone_number'] = data.phone_number;

    this.appService.updateSupplier(payload).subscribe((data: any) => {
      this.supplierList();
      this.toastr.success("Record Updated!", 'Success');
    },
    (err) => {
      this.toastr.error(err.error.message, 'Error')
    });
  }

  deleteSupplier(id: any) {
    const payload = {
      id: id
    }
    this.appService.deleteSupplier(payload).subscribe((data: any) => {
      // console.log(data?.data?.suppliers);
      this.supplierList();
      this.toastr.success("Record Deleted Successfully!", 'Success');
    },
    (err) => {
      this.toastr.error(err.error.message, 'Error')
    });
  }

  reset() {
    this.fields.forEach(f => {
      f.value = '';
    });
    this.supplierFilter.id = '';
    this.supplierFilter.first_name = '';
    this.supplierFilter.last_name = '';
    this.supplierFilter.email = '';
    this.supplierFilter.zone_id = '';
    this.supplierFilter.status = '';
    this.supplierFilter.company_name = '';
    this.supplierFilter.company_address = '';
    this.supplierFilter.phone_number = '';

    this.pagination.current_page = 1;
    this.pagination.per_page = 10;
    this.pageCount = 10;
    this.supplierList();
  }

  goToPage(page: number): void {
    this.pagination.current_page = page;
    this.supplierList();
  }

  selectedPage(pages_Selected: number) {
    this.pagination.per_page = pages_Selected;
    this.pagination.current_page = 1;
    this.supplierList();
  }
}