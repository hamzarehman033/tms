import { CommonModule } from '@angular/common';
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
  // columnsToDisplay = ['ID', 'Name', 'Documentation_Status', 'Activation', 'Phone_Number', 'Action'];

  displayedColumns: string[] = ['id', 'Name', 'Documentation_Status', 'Activation', 'Phone_Number', 'Action'];
  dataSource: any = [];
  supplierList(){
    const payload = {
      limit: 2
    };
    this.appService.supplierList(payload).subscribe((data: any)=>{
      this.dataSource = data?.data?.suppliers;
      console.log("dataSource",data);
      
    })
  }

  getSupplier(){
    this.appService.getSupplier(this.supplier_id).subscribe((data)=>{
      console.log(data);
    })
  }

  addSupplier(){
    this.appService.addSupplier(this.supplier_data).subscribe((data)=>{
      console.log(data);
    })
  }
  
  updateSupplier(){
    this.appService.updateSupplier(this.supplier_id).subscribe((data)=>{
      console.log(data);
    })
  }

  deleteSupplier(){
    this.appService.deleteSupplier(this.supplier_id).subscribe((data)=>{
      console.log(data);
    })
  }
}
