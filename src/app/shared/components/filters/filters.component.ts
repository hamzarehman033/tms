import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { filterObj } from '../../../core/types';
import { IconComponent } from '../icon/icon.component';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent]
})
export class FiltersComponent implements OnInit {
  collapse: boolean = true;
  newFields: any = [];

  @Input() fields: filterObj[] = [];
  @Input() showFilter: boolean = true;

  @Output() applyFilter = new EventEmitter<any>();
  @Output() resetFilter = new EventEmitter<any>();

  ngOnInit(): void {
    this.filter_fields();
  }

  clickFilterButton() {
    this.applyFilter.emit();
  }
  clickResetButton() {
    this.resetFilter.emit();
  }

  filter_fields() {
    if (this.fields.length <= 4) {
      this.newFields = this.fields;
    }
    else if (this.fields.length > 4 && this.collapse) {
      for (let i = 0; i < 4; i++) {
        this.newFields.push(this.fields[i]);
      }
    }
    else if (this.fields.length > 4 && !this.collapse) {
      this.newFields = this.fields;
    }
  }

  toggleFilter() {
    this.collapse = !this.collapse;
    this.newFields = [];
    this.filter_fields();
  }

  filterMapper: any = {
    id: 'ID',
    company_name: 'Company Name',
    license_status: 'Status',
    user_email: 'Email',
    user_ip: 'IP Address',
    createdAt: 'Created At',
    start_date: 'Start Date',
    end_date: 'End Date',
    module_name: 'Module Name',
    email: 'Email Address'
  }
}
