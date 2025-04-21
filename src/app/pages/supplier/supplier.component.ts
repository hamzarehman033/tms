import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../core/service/app.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { filterObj, modalObj } from '../../core/types';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  standalone: true,
  imports: [TableComponent, FiltersComponent, ModalComponent],
  styleUrl: './supplier.component.scss'
})

export class SupplierComponent implements OnInit {
  @ViewChild('modalRef') modalComponent!: ModalComponent;
  fields: filterObj[] = [
    { type: 'text', key: 'Booking Id', placeholder: 'Enter Id here', value: '' },
    { type: 'text', key: 'Company name', placeholder: 'Enter name here', value: '' },
    { type: 'text', key: 'email', placeholder: 'Select Email here', value: '' }
  ];

  supplierFilter: any = {};
  supplier_id: any = 1;
  supplier_data: any;
  columnsToDisplay: string[] = ['Booking_Id', 'Company_Name', 'Supplier_Contact_Person', 'Supplier_Email', 'Supplier_Phone_Number', 'Action'];
  dataSource: any = [];

  button_name = 'Add Trucking Company';
  heading = 'Add  New Trucking Company';
  description = 'Kindly fill the below details to add the Trucking Company.';
  modal_fields: modalObj[] = [
    { type: 'text', key: 'first_name', placeholder: 'First Name', value: '' },
    { type: 'text', key: 'last_name', placeholder: 'Last Name', value: '' },
    { type: 'text', key: 'email', placeholder: 'Email', value: '' },
    { type: 'dropdown', key: 'role_id', placeholder: 'Role', value: '', options: [{ label: 1, value: 1 }, { label: 2, value: 2 }, { label: 3, value: 3 }, { label: 4, value: 4 }, { label: 5, value: 5 }] },
    { type: 'dropdown', key: 'zone_id', placeholder: 'Zone', value: '', options: [{ label: 1, value: 1 }, { label: 2, value: 2 }, { label: 3, value: 3 }, { label: 4, value: 4 }, { label: 5, value: 5 }] },
    { type: 'dropdown', key: 'status', placeholder: 'Status', value: '', options: [{ label: 'Active', value: 0 }, { label: 'Inactive', value: 1 }] },
    { type: 'text', key: 'company_name', placeholder: 'Company Name', value: '' },
    { type: 'text', key: 'company_address', placeholder: 'Location', value: '' },
    { type: 'text', key: 'phone_number', placeholder: 'Phone Number', value: '' }
  ];

  constructor(private appService: AppService) { }
  ngOnInit(): void {
    this.supplierList();
  }

  openModal() {
    this.modalComponent.open(); // Call the open method from the modal component
  }

  supplierList() {
    const payload: any = {
      limit: 10
    };

    this.fields.forEach(field => {
      if (field.value) this.supplierFilter[field.key] = field.value;
    });

    if (this.supplierFilter.booking_id) payload['booking_id'] = [Number(this.supplierFilter.booking_id)];
    if (this.supplierFilter.company_name) payload['company_name'] = this.supplierFilter.company_name;
    if (this.supplierFilter.email) payload['email'] = this.supplierFilter.email;

    this.appService.supplierList(payload).subscribe((data: any) => {
      this.dataSource = data?.data?.rows;
      console.log("Supplier data:", data?.data?.rows);
    })
  }

  getSupplier() {
    const payload = {
      id: this.supplier_id
    };
    this.appService.getSupplier(payload).subscribe((data: any) => {
      console.log(data?.data?.suppliers);
    })
  }

  addSupplier() {
    this.modal_fields.forEach(field => {
      if (field.value) this.supplierFilter[field.key] = field.value;
    });

    const payload: any = {}
    if (this.supplierFilter.first_name) payload['first_name'] = this.supplierFilter.first_name;
    if (this.supplierFilter.last_name) payload['last_name'] = this.supplierFilter.last_name;
    if (this.supplierFilter.email) payload['email'] = this.supplierFilter.email;
    if (this.supplierFilter.role_id) payload['role_id'] = Number(this.supplierFilter.role_id);
    if (this.supplierFilter.zone_id) payload['zone_id'] = Number(this.supplierFilter.zone_id);
    if (this.supplierFilter.status) payload['status'] = Number(this.supplierFilter.status);
    if (this.supplierFilter.company_name) payload['company_name'] = this.supplierFilter.company_name;
    if (this.supplierFilter.company_address) payload['company_address'] = this.supplierFilter.company_address;
    if (this.supplierFilter.phone_number) payload['phone_number'] = this.supplierFilter.phone_number;

    this.appService.addSupplier(payload).subscribe((data: any) => {
      console.log(data?.data?.rows);
      this.modalComponent.close();
      this.reset();
    })
  }

  updateSupplier() {
    const payload = {
      id: 8,
      first_name: "supplier01",
      last_name: "test",
      company_name: "FreshDelmonte",
      email: "supplier_22@gmail.com",
      phone_number: "345678987"
    }
    this.appService.updateSupplier(payload).subscribe((data: any) => {
      console.log(data?.data?.suppliers);
      this.supplierList();
    })
  }

  deleteSupplier(del_id: any) {
    const payload = {
      id: del_id
    }
    this.appService.deleteSupplier(payload).subscribe((data: any) => {
      console.log(data?.data?.suppliers);
      this.supplierList();
    })
  }

  reset() {
    this.fields.forEach(f => {
      f.value = '';
    });
    this.modal_fields.forEach(f => {
      f.value = '';
    });
    this.supplierFilter.first_name = '';
    this.supplierFilter.last_name = '';
    this.supplierFilter.email = '';
    this.supplierFilter.role_id = '';
    this.supplierFilter.zone_id = '';
    this.supplierFilter.status = '';
    this.supplierFilter.company_name = '';
    this.supplierFilter.company_address = '';
    this.supplierFilter.phone_number = '';
    this.supplierList();
  }
}
