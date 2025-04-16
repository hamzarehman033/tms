import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/service/app.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { filterObj } from '../../core/types';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  standalone: true,
  imports: [TableComponent, FiltersComponent],
  styleUrl: './supplier.component.scss'
})

export class SupplierComponent implements OnInit{
  
  fields: filterObj[] = [
    { type: 'text', key: 'Booking Id', placeholder: 'Enter Id here', value: '' },
    { type: 'text', key: 'Company name', placeholder: 'Enter name here', value: '' },
    { type: 'text', key: 'email', placeholder: 'Select Email here', value: '' }
  ];

  form_name: string = 'Trucking Company'
  supplier_id: any = 1;
  supplier_data: any;
  columnsToDisplay: string[] = ['Booking_Id', 'Company_Name', 'Supplier_Contact_Person', 'Supplier_Email', 'Supplier_Phone_Number', 'Action'];
  dataSource: any = [];

  constructor(private appService : AppService){ }
  ngOnInit(): void {
    this.supplierList();
  }

  supplierFilter = {
    booking_id: '',
    company_name: '',
    email: ''
  }

  supplierList(){
    const payload = {
      limit: 10
    };
    this.appService.supplierList(payload).subscribe((data: any)=>{
      this.dataSource = data?.data?.rows;
      console.log("Supplier data:", data?.data?.rows);
    })
  }

  getSupplier(){
    const payload = {
      id: this.supplier_id 
    };
    this.appService.getSupplier(payload).subscribe((data: any)=>{
      console.log(data?.data?.suppliers);
    })
  }

  addSupplier(){
    const payload = {
      first_name: "new_Supplier",
      last_name: "last name",
      email: "supplier_NEW_@gmail.com",
      role_id: 3,
      zone_id: 1,
      status: 1,
      company_name: "Supplier Company",
      company_address: "New Supplier address, mycity",
      phone_number: "0646545678"
  }
    this.appService.addSupplier(payload).subscribe((data: any)=>{
      console.log(data?.data?.rows);
      this.supplierList();
    })
  }
  
  updateSupplier(){
    const payload = {
      id: 9,
      first_name: "supplier01",
      last_name: "test",
      company_name: "FreshDelmonte",
      email: "supplier01@gmail.com",
      phone_number: "345678987"
    }
    this.appService.updateSupplier(payload).subscribe((data: any)=>{
      console.log(data?.data?.suppliers);
      this.supplierList();
    })
  }

  deleteSupplier(){
    const payload = {
      id: 1
    }
    this.appService.deleteSupplier(payload).subscribe((data: any)=>{
      console.log(data?.data?.suppliers);
      this.supplierList();
    })
  }
}
