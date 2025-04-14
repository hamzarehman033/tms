import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/service/app.service';
import { TableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  standalone: true,
  imports: [TableComponent],
  styleUrl: './supplier.component.scss'
})

export class SupplierComponent implements OnInit{

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
      this.dataSource = data?.data?.suppliers;
      console.log("Supplier data:", data?.data?.suppliers);
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
      first_name: "supplier_0232",
      last_name: "user_0223",
      email: "supplier_223@gmail.com",
      role_id: 3,
      zone_id: 1,
      status: 1,
      company_name: "Supplier_023",
      company_address: "werty address, mycity",
      phone_number: "6545678"
  }
    this.appService.addSupplier(payload).subscribe((data: any)=>{
      console.log(data?.data?.suppliers);
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
