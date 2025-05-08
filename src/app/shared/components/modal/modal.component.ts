import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { filterObj, modalObj } from '../../../core/types';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppService } from '../../../core/service/app.service';
import { IconComponent } from '../icon/icon.component';
import { FiltersComponent } from '../filters/filters.component';
import { Subject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

declare var bootstrap: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IconComponent, FiltersComponent]
})
export class ModalComponent implements OnInit, OnChanges {
  selectedId: any;
  modal_type: any;
  parameter: any;
  form!: FormGroup;
  farm_obj: any[] = [];
  modalFilters: any = {};
  zone_data: any = [];
  farm_id: any;

  dataTable: any;
  supplierFilter: any = {};

  fields: filterObj[] = [
    { type: 'dropdown', key: 'zone', placeholder: 'Zone', value: '', options: [] },
    { type: 'text', key: 'company_name', placeholder: 'Company Name', value: '' }
  ];

  @Input() modal_fields: modalObj[] = [];
  @Input() modal_info: any;

  @Output() addModalDetails = new EventEmitter<any>();
  @Output() updateModalDetails = new EventEmitter<any>();
  @Output() yesClicked = new EventEmitter<any>();

  @ViewChild('exampleModal', { static: true }) modalElement!: ElementRef;
  @ViewChild('deleteModal', { static: true }) deleteModalElement!: ElementRef;
  @ViewChild('sharedModal', { static: true }) sharedModalElement!: ElementRef;


  private modal: any;
  private deleteModal: any;
  private sharedModal: any;

  private result = new Subject<any>();
  public result$: Observable<any> = this.result.asObservable();
  
  constructor(private fb: FormBuilder, private appService: AppService, private toastr: ToastrService) { }

  ngOnInit() {
    this.buildFormFromModalFields();
    this.zoneList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['modal_fields']) {
      this.buildFormFromModalFields();
    }
  }

  private buildFormFromModalFields() {
    this.form = this.fb.group({});

    for (let field of this.modal_fields) {
      const controlValidators = field.validators ?? [];

      this.form.addControl(
        field.key,
        this.fb.control(field.value || '', controlValidators)
      );
    }
  }

  // Add modal details
  addDetails() {
    if (this.form.valid) {
      this.addModalDetails.emit(this.form.value);
      this.close();
    } else {
      this.form.markAllAsTouched(); // shows errors
    }
  }

  updateDetails() {
    if (this.form.valid) {
      this.updateModalDetails.emit(this.form.value);
      this.close();
    } else {
      this.form.markAllAsTouched(); // shows errors
    }
  }

  onFieldChange(event: any) {
    const isRestricted = event.target.value == 0;

    const restrictionField = this.modal_fields.find(field => field.key === 'restriction_reason');
    if (restrictionField) {
      restrictionField.hidden = !isRestricted;
    }
  }

  open(data?: any, mode?: string) {
    this.modal_type = mode === 'add' ? 'add' : 'update';

    if (mode === 'update' && data) {
      data = data.data;
      for (let field of this.modal_fields) {
        if (!field.hidden) {
          const key = field.key;
          const value = data[key] ?? data.user?.[key] ?? '';
          this.form.get(key)?.setValue(value);
        }
        else {
          const key = field.key;
          const value = data[key] ?? data.user?.[key] ?? '';
          this.form.get(key)?.setValue(value);
        }
      }
    }
    if (!this.modal) {
      this.modal = new bootstrap.Modal(this.modalElement?.nativeElement);
    }
    this.modal.show();
  }

  close() {
    if (this.modal) {
      this.modal.hide();
    }
    this.reset();
  }

  // Delete details
  deleteDetails() {
    this.yesClicked.emit();
  }

  openDelete(id: any, param: any) {
    this.parameter = param;
    this.selectedId = id;
    if (this.selectedId) {
      this.deleteModal = new bootstrap.Modal(this.deleteModalElement?.nativeElement);
    }
    this.deleteModal.show();
  }

  closeDelete() {
    if (this.deleteModal) {
      this.deleteModal.hide();
    }
  }

  openSharedModal(id: any) {
    this.farm_id = id;
    this.farmList();
    this.sharedModal = new bootstrap.Modal(this.sharedModalElement?.nativeElement);
    this.sharedModal.show();
  }

  closeSharedModal() {
    if (this.sharedModal) {
      this.reset();
      this.sharedModal.hide();
      this.result.next('update');
    }
  }

  addFarmSupplier(supplier_id: any) {
    const payload: any = {};
    if (supplier_id) payload['supplier_id'] = supplier_id;
    if (this.farm_id) payload['farm_id'] = this.farm_id; 

    this.appService.addFarmSupplier(payload).subscribe((data: any)=>{
      this.toastr.success("Record added successfully!", 'Success');
      this.farmList();
    }, (err)=>{
      this.toastr.error(err.error.message, 'Error');
    });
  }

  deleteFarmSupplier(supplier_id: any) {
    const payload: any = {};
    if (supplier_id) payload['supplier_id'] = supplier_id;
    if (this.farm_id) payload['farm_id'] = this.farm_id; 

    this.appService.deleteFarmSupplier(payload).subscribe((data: any)=>{
      console.log("data: ", data);
      this.farmList();
    });
  }

  farmList() {
    const payload: any = {};

    this.appService.farmList(payload).subscribe((data: any) => {
      let row = data.data.rows.find((f: any) => f.id === this.farm_id);

      this.farm_obj = []; // reset to avoid duplicates
      for (let i = 0; i < row.suppliers.length; i++) {
          const supplier = row.suppliers[i];
          this.farm_obj.push({
            name: supplier?.company_name,
            id: supplier?.id,
            address: supplier?.company_address
          });
      }
    });
  }

  zoneList() {
    const payload: any = {};

    this.appService.zoneList(payload).subscribe((data: any) => {
      let row = data.data.rows;
      this.zone_data = row.map((r: any) => ({
        name: r.name,
        id: r.id
      }));

      // Now update the dropdown options in add_fields
      const zoneOptions = this.zone_data.map((zone: any) => ({
        label: zone.name,
        value: zone.id
      }));

      ['zone'].forEach(key => {
        const field = this.fields.find(f => f.key === key);
        if (field) field.options = zoneOptions;
      });

    });
  }

  farmFilter() {
    const payload: any = {};
    this.fields.forEach(field => {
      if (field.value) this.supplierFilter[field.key] = field.value;
    });

    if (this.supplierFilter.zone) payload['zone_id'] = this.supplierFilter.zone;
    if (this.supplierFilter.company_name) payload['company_name'] = this.supplierFilter.company_name;

    this.appService.supplierList(payload).subscribe((data: any) => {
      console.log("Supplier data:", data?.data?.rows);
      this.dataTable = data.data.rows;
    })

  }

  reset() {
    this.supplierFilter.zone = '';
    this.supplierFilter.company_name = '';
    this.modalFilters.zone = '';
    this.modalFilters.name = '';
    this.fields.forEach(f => {
      f.value = '';
    });

    for (let field of this.modal_fields) {
      field.value = ''; // Reset the field object

      if (this.form.contains(field.key)) {
        this.form.get(field.key)?.setValue(''); // Reset the form control
        this.form.get(field.key)?.markAsPristine(); // Optional: reset touch state
        this.form.get(field.key)?.markAsUntouched();
      }
    }
    this.dataTable = [];
  }
}
