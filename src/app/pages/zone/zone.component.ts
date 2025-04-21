import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '../../shared/components/table/table.component';
import { AppService } from '../../core/service/app.service';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { filterObj, modalObj } from '../../core/types';
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
    
  zoneFilter: any = {};
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
  button_name = 'Add Zone';
  heading = 'Add  New Zone'
    description = 'Kindly fill the below details to add the Zone.';
    modal_fields: modalObj[] = [
      { type: 'text', key: 'legal_id', placeholder: 'Legal ID', value: '' },
      { type: 'text', key: 'name', placeholder: 'Zone Name', value: '' },
      { type: 'text', key: 'email', placeholder: 'Email', value: '' },
      { type: 'text', key: 'contact_number', placeholder: 'Phone Number', value: '' },
      { type: 'text', key: 'location', placeholder: 'Location', value: '' }
  ];

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
      if (field.value) this.zoneFilter[field.key] = field.value;
    })

    if (this.zoneFilter.id) payload["id"] = [Number(this.zoneFilter.id)];
    if (this.zoneFilter.name) payload["name"] = this.zoneFilter.name;

    this.appService.zoneList(payload).subscribe((data: any) => {
      this.dataSource = data?.data?.rows;
      console.log("zone data", this.dataSource);
    })
  }

  addZone() {
    const payload: any = {};
    this.modal_fields.forEach(field =>{
      if (field.value) this.zoneFilter[field.key] = field.value;
    })
    if (this.zoneFilter.legal_id) payload['legal_id'] = this.zoneFilter.legal_id;
    if (this.zoneFilter.name) payload['name'] = this.zoneFilter.name;
    if (this.zoneFilter.email) payload['email'] = this.zoneFilter.email;
    if (this.zoneFilter.contact_number) payload['contact_number'] = this.zoneFilter.contact_number;
    if (this.zoneFilter.location) payload['location'] = this.zoneFilter.location;


    this.appService.addZone(payload).subscribe((data: any) => {
      console.log("Add zone working", data?.data?.rows);
      this.modalComponent.close();
      this.reset();
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
    this.fields.forEach(f => {
      f.value = '';
    });

    this.modal_fields.forEach(f => {
      f.value = '';
    });
    this.zoneFilter.legal_id = '';
    this.zoneFilter.email = '';
    this.zoneFilter.contact_number = '';
    this.zoneFilter.location = '';
    this.zoneFilter.id = '';
    this.zoneFilter.name = '';
    this.zoneList();
  }
}
