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

  @Input() form_name: string = '';
  @Input() button_name: string = '';
  @Input() fields: filterObj[] = [];
  @Input() showFilter: boolean = true;

  @Output() applyFilter = new EventEmitter<any>();
  @Output() resetFilter = new EventEmitter<any>();
  @Output() list_button_type = new EventEmitter<any>();
  @Output() list_type = new EventEmitter<any>();

  activeButton: string = 'supplier';

  setActive(btn: string){
    this.activeButton = btn;
    this.list_type.emit(btn);
    this.list_button_type.emit(btn);
  }
  
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
}
