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

  labelMapper: { [key: string]: string } = {
    license_status: 'Status',
    name: 'Name',
    id: 'ID',
    zone: 'Zone'
  };

  form_title_Mapper:  { [key: string]: string } = {
    farm: 'Add Farm',
    driver: 'Add Driver',
    zone: 'Add Zone',
    restrictions: 'Restrictions',
    trucking_company: 'Trucking Company'
  }

  modal_title: { [key: string]: string} = {
    farm: 'Add  New Farm',
    documents: 'Add  New Documents',
    driver: 'Add New Driver',
    zone: 'Add New Zone',
    restrictions: 'Restrictions',
    trucking_company: 'Add  New Trucking Company'
  }
}
