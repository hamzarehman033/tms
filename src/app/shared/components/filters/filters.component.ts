import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { filterObj } from '../../../core/types';
import { IconComponent } from '../icon/icon.component';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, ModalComponent]
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
}
