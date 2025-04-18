import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '../../shared/components/table/table.component';
import { AppService } from '../../core/service/app.service';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { filterObj } from '../../core/types';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  standalone: true,
  imports: [TableComponent, FormsModule, FiltersComponent, ModalComponent],
  styleUrl: './zone.component.scss'
})
export class ZoneComponent implements OnInit {
  @ViewChild('modalRef') modalComponent!: ModalComponent;
  fields: filterObj[] = [
    { type: 'text', key: 'name', placeholder: 'Enter name here', value: '' },
    { type: 'text', key: 'id', placeholder: 'Enter Id here', value: '' }
    ];

  legal_id = "zone_123";
  name = "zone_123";
  email = "zone_123@gmail.com";
  contact_number = "032950900000321";
  location = "zone location 123";
  id: any;

  columnsToDisplay = ['Zone_ID', 'Zone_Name', 'Created_at', 'Legal_Id', 'Contact_Number', 'Zone_Email', 'Zone_Location', 'Action'];
  dataSource: any = [];

  zoneFilters: any = { }

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.zoneList();
  }

  openModal() {
    this.modalComponent.open(); // Call the open method from the modal component
  }
  
  zoneList() {
    const payload: any = {
      limit: 10
    }
    this.fields.forEach(field =>{
      if (field.value) this.zoneFilters[field.key] = field.value;
    })

    if (this.zoneFilters.id) payload["id"] = [Number(this.zoneFilters.id)];
    if (this.zoneFilters.name) payload["name"] = this.zoneFilters.name;

    this.appService.zoneList(payload).subscribe((data: any) => {
      this.dataSource = data?.data?.rows;
      console.log("zone data", this.dataSource);
    })
  }

  addZone() {
    const payload = {
      legal_id: this.legal_id,
      name: this.name,
      email: this.email,
      contact_number: this.contact_number,
      location: this.location
    };

    this.appService.addZone(payload).subscribe((data: any) => {
      console.log("Add zone working");
      this.zoneList();
    })
  }

  updateZone() {
    const payload = {
      id: 1,
      name: this.name,
      contact_number: this.contact_number,
      location: this.location
    }
    this.appService.updateZone(payload).subscribe((data: any) => {
      console.log("Update Zone Called", data?.zone);
      this.zoneList();
    })
  }

  deleteZone(del_id: any) {
    const payload = {
      id: del_id
    }
    this.appService.deleteZone(payload).subscribe((data: any) => {
      console.log("Delete zone api called: ", data?.zone);
      this.zoneList();
    })
  }

  getZone() {
    const payload = {
      id: 1
    }
    this.appService.getZone(payload).subscribe((data: any) => {
      console.log("Get Zone API call: ", data?.zone);
      this.zoneList();
    })
  }

  reset() {
    this.fields.forEach(field=>{
      field.value = '';
    })
    this.zoneFilters.id = '';
    this.zoneFilters.name = '';
    this.zoneList();
  }
}
