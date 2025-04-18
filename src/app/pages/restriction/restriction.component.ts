import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../core/service/app.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-restriction',
  templateUrl: './restriction.component.html',
  standalone: true,
  imports: [TableComponent, FormsModule, FiltersComponent, CommonModule, ModalComponent],
  styleUrl: './restriction.component.scss'
})
export class RestrictionComponent implements OnInit {
  @ViewChild('modalRef') modalComponent!: ModalComponent;
  columnsToDisplay: string[] = [];
  activeButton: string = 'supplier';

  dataSource: any;
  rest_id: any
  rest_status: any;
  rest_reason: any;
  showFilter: boolean = false;
  reActivate_button: boolean = true;
  type: any;
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.list_type('supplier');
    this.getRestriction('supplier');
  }
  openModal() {
    this.modalComponent.open(); // Call the open method from the modal component
  }
  
  list_type(type: any) {
    if (type === 'supplier') {
      this.columnsToDisplay = ['ID', 'restriction_name', 'restriction_ph_no', 'Supplier_Documents', 'Reason', 'Action'];
    }
    else if (type === 'truck') {
      this.columnsToDisplay = ['ID', 'truck_number', 'truck_documents', 'Reason', 'Action'];;
    }
    else if (type === 'driver') {
      this.columnsToDisplay = ['ID', 'restriction_name', 'restriction_ph_no', 'Driver_Documents', 'Reason', 'Action'];
    }
    console.log(type, this.columnsToDisplay);
  }

  // Set Active List
  setActive(btn: string){
    this.activeButton = btn;
    this.getRestriction(btn);
  }
  addRestriction() {
    const payload: any = {}
    if (this.rest_id) payload["id"] = this.rest_id;
    if (this.rest_status) payload["status"] = this.rest_status;
    if (this.rest_reason) payload["restriction_reason"] = this.rest_reason;

    this.appService.addRestriction(payload).subscribe((data: any) => {
      console.log("Add restriction API: ", data);
    })
  }

  getRestriction(list: any) {
    this.type = list;
    this.list_type(this.type);
    console.log("Get restrictions: ", this.type);

    const payload =
    {
      user_role: list
    }
    this.appService.getRestriction(payload).subscribe((data: any) => {
      this.dataSource = data?.data?.rows;
      console.log("Restriction's Data: ", this.dataSource);
    })
  }

  // remove supplier/driver restriction
  removeRestriction(del_id: any) {
    const payload = {
      id: del_id
    }
    this.appService.removeRestriction(payload).subscribe((data: any) => {
      console.log("Restrictionnnnnn typeeeeeeee from supplier and driver", this.type);

      this.getRestriction(this.type);
    })
  }

  addTruckRestriction() {
    const payload: any = {}
    if (this.rest_id) payload["id"] = this.rest_id;
    if (this.rest_status) payload["status"] = this.rest_status;
    if (this.rest_reason) payload["restriction_reason"] = this.rest_reason;

    this.appService.addTruckRestriction(payload).subscribe((data: any) => {
      console.log("Add restriction API: ", data);
    })
  }

  // remove truck restriction
  removeTruckRestriction(del_id: any) {
    const payload = {
      id: del_id
    }
    this.appService.removeTruckRestriction(payload).subscribe((data: any) => {
      console.log("Restrictionnnnnn typeeeeeeee from tuckkkkk", this.type);

      this.getRestriction(this.type);
    })
  }

  // Function to call either to remove truck or to remove supplier/driver
  removeRestrictionFunction(del_id: any) {
    if (this.type == 'truck') {
      this.removeTruckRestriction(del_id);
    }
    else {
      this.removeRestriction(del_id);
    }
  }
}
