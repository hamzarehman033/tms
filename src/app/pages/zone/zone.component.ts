import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '../../shared/components/table/table.component';
import { AppService } from '../../core/service/app.service';
import { FormsModule, Validators } from '@angular/forms';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { filterObj, modalObj, Pagination } from '../../core/types';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  standalone: true,
  imports: [TableComponent, FormsModule, FiltersComponent, ModalComponent, PaginatorComponent],
  styleUrl: './zone.component.scss'
})
export class ZoneComponent implements OnInit {
  @ViewChild('modalRef') modalComponent!: ModalComponent;
  editMode: any;
  zoneFilter: any = {};

  fields: filterObj[] = [
    { type: 'text', key: 'name', placeholder: 'Name', value: '' },
    { type: 'text', key: 'id', placeholder: 'Enter Id here', value: '' }
  ];

  columnsToDisplay = ['Zone_ID', 'Zone_Name', 'Created_at', 'Legal_Id', 'Contact_Number', 'Zone_Email', 'Zone_Location', 'Action'];
  dataSource: any = [];

  dataObject: any = {
    add_modal: {
      button_name: 'Add Zone',
      heading: 'Add  New Zone',
      description: 'Kindly fill the below details to add the Zone.'
    },
    update_modal: {
      button_name: 'Update Zone',
      heading: 'Update Zone',
      description: 'Kindly fill the below details to update Zone.'
    }
  };

  add_fields: modalObj[] = [
    { type: 'text', key: 'legal_id', placeholder: 'Legal ID', value: '', validators: [Validators.required] },
    { type: 'text', key: 'name', placeholder: 'Zone Name', value: '', validators: [Validators.required] },
    { type: 'text', key: 'email', placeholder: 'Email', value: '', validators: [Validators.required, Validators.required] },
    { type: 'text', key: 'contact_number', placeholder: 'Phone Number', value: '', validators: [Validators.required, Validators.minLength(11), Validators.pattern(/^[0-9]+$/)] },
    { type: 'text', key: 'location', placeholder: 'Location', value: '', validators: [Validators.required] }
  ];

  update_fields: modalObj[] = [
    { type: 'text', key: 'id', placeholder: 'ID', value: '', hidden: true },
    { type: 'text', key: 'name', placeholder: 'Name', value: '', validators: [Validators.required] },
    { type: 'text', key: 'contact_number', placeholder: 'Contact Number', value: '', validators: [Validators.required, Validators.minLength(11), Validators.pattern(/^[0-9]+$/)] },
    { type: 'text', key: 'location', placeholder: 'Location', value: '', validators: [Validators.required] },
    { type: 'dropdown', key: 'status', placeholder: 'Status', value: '', options: [{ label: 'Active', value: 1 }, { label: 'In Active', value: 0 }], validators: [Validators.required] },
    { type: 'text', key: 'restriction_reason', placeholder: 'Restriction Reason', value: '', hidden: true }
  ];

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
    this.zoneList();
  }

  openModal() {
    this.editMode = false;
    this.modalComponent.open('', 'add'); // Call the open method from the modal component
  }

  zoneList() {
    const payload: any = {
      limit: this.pagination.per_page,
      page: this.pagination.current_page
    }
    this.fields.forEach(field => {
      if (field.value) this.zoneFilter[field.key] = field.value;
    })

    if (this.zoneFilter.id) payload["id"] = [Number(this.zoneFilter.id)];
    if (this.zoneFilter.name) payload["name"] = this.zoneFilter.name;

    this.appService.zoneList(payload).subscribe((data: any) => {
      this.dataSource = data?.data?.rows;
      console.log("zone data", this.dataSource);
      this.pagination.total_records = data.data.count;
      let pagesCount = Math.ceil(this.pagination.total_records / this.pagination.per_page);
      this.pagination.total_pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    })
  }

  addZone(data: any) {
    const payload: any = {};

    if (data.legal_id) payload['legal_id'] = data.legal_id;
    if (data.name) payload['name'] = data.name;
    if (data.email) payload['email'] = data.email;
    if (data.contact_number) payload['contact_number'] = data.contact_number;
    if (data.location) payload['location'] = data.location;


    this.appService.addZone(payload).subscribe((data: any) => {
      console.log("zone added", data?.data?.rows);
      this.modalComponent.close();
      this.zoneList();
      this.toastr.success("Zone added successfully!");
    }, (err)=>{
      this.toastr.error(err.error.message, 'Error');
    })
  }

  updateZone(data: any) {
    const payload: any = {};

    if (data.id) payload['id'] = data.id;
    if (data.name) payload['name'] = data.name;
    if (data.contact_number) payload['contact_number'] = data.contact_number;
    if (data.location) payload['location'] = data.location;

    this.appService.updateZone(payload).subscribe((data: any) => {
      this.zoneList();
      this.toastr.success("Zone updated!");
    })
  }

  deleteZone(id: any) {
    const payload = {
      id: id
    }
    this.appService.deleteZone(payload).subscribe((data: any) => {
      console.log("Delete zone api called: ", data?.zone);
      this.zoneList();
      this.toastr.success("Zone deleted!");
    })
  }

  getZone(id: any) {
    this.editMode = true;
    const payload = {
      id: id
    }
    this.appService.getZone(payload).subscribe((data: any) => {
    this.modalComponent.open(data, 'update');
    })
  }

  reset() {
    this.fields.forEach(f => {
      f.value = '';
    });

    this.zoneFilter.legal_id = '';
    this.zoneFilter.email = '';
    this.zoneFilter.contact_number = '';
    this.zoneFilter.location = '';
    this.zoneFilter.id = '';
    this.zoneFilter.name = '';

    this.pagination.current_page = 1;
    this.pagination.per_page = 10;
    this.pageCount = 10;

    this.zoneList();
  }

  goToPage(page: number): void {
    this.pagination.current_page = page;
    this.zoneList();
  }

  selectedPage(pages_Selected: number){
    this.pagination.per_page = pages_Selected;
    this.pagination.current_page = 1;
    this.zoneList();
  }
}
