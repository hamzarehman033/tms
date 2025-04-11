import { CommonModule, PathLocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatTableModule } from '@angular/material/table';
import { AppService } from '../../core/service/app.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  standalone: true,
  imports: [CommonModule, MatTableModule,MatHeaderCell, MatCell, MatRow, MatHeaderRow],
  styleUrl: './supplier.component.scss'
})

export class SupplierComponent implements OnInit{

  supplier_id: any = 1;
  supplier_data: any;

  constructor(private appService : AppService){ }
  ngOnInit(): void {
    this.supplierList();
  }

  displayedColumns: string[] = ['id', 'company_name', 'company_address', 'Documentation_Status', 'Activation', 'Phone_Number', 'Action'];
  dataSource: any = [];

  supplierList(){
    const payload = {
      limit: 5
    };
    this.appService.supplierList(payload).subscribe((data: any)=>{
      this.dataSource = data?.data?.suppliers;
      console.log(data);
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
      first_name: "supplier",
      last_name: "user",
      email: "supplier212996@gmail.com",
      role_id: 3,
      zone_id: 1,
      status: 1,
      company_name: "AbcTech",
      company_address: "abc, mycity"
  }
    this.appService.addSupplier(payload).subscribe((data: any)=>{
      console.log(data?.data?.suppliers);
    })
  }
  
  updateSupplier(){
    const payload = {
      id: 1,
      first_name: "supplier01",
      last_name: "test",
      company_name: "FreshDelmonte"
    }
    this.appService.updateSupplier(payload).subscribe((data: any)=>{
      console.log(data?.data?.suppliers);
    })
  }

  deleteSupplier(){
    const payload = {
      id: 3
    }
    this.appService.deleteSupplier(payload).subscribe((data: any)=>{
      console.log(data?.data?.suppliers);
    })
  }
}
