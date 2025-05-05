import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class FiltersComponent {

  @Input() fields: filterObj[] = [];
  @Input() showFilter: boolean = true;

  @Output() applyFilter = new EventEmitter<any>();
  @Output() resetFilter = new EventEmitter<any>();
  
  clickFilterButton(){
    this.applyFilter.emit();
  }
  clickResetButton(){
    this.resetFilter.emit();
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
