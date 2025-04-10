import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatTableModule } from '@angular/material/table';
import { AppService } from '../../core/service/app.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from '../../core/interceptor/interceptor';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  standalone: true,
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  imports: [CommonModule, MatTableModule,MatHeaderCell, MatCell, MatRow, MatHeaderRow],
  styleUrl: './supplier.component.scss'
})

export class SupplierComponent implements OnInit{

  supplier_id = '1';
  supplier_data: any;
  constructor(private appService : AppService){ }
  ngOnInit(): void {
    this.getSupplier();
  }
  // columnsToDisplay = ['ID', 'Name', 'Documentation_Status', 'Activation', 'Phone_Number', 'Action'];

  displayedColumns: string[] = ['ID', 'Name', 'Documentation_Status', 'Activation', 'Phone_Number', 'Action'];
  dataSource: any = [];

  getSupplier(){
    this.appService.getSupplier(this.supplier_id).subscribe((data)=>{
      this.dataSource = data;
      console.log(this.dataSource);
      
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
