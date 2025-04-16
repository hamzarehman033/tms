import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { filterObj } from '../../../core/types';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class FiltersComponent {

  @Input() form_name: string = '';
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
}
