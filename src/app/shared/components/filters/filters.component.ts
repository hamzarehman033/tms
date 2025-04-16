import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  standalone: true
})
export class FiltersComponent {
  @Input() division_type: string = '';
  @Input() select_farm: string = '';
  @Input() date_range: Date | undefined;
  @Input() status: string = '';
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() age: number = 0;
  @Input() select_zone: string = '';
  @Input() search: string = '';
  @Input() type: string = '';
  @Input() number: number = 0;
  @Input() form_name: string = '';
  @Input() vehicle_number: string = '';
  @Input() driver_name: string = '';
  @Input() role: string = '';
  @Input() driver_status: string = '';
  @Input() truck_status: string = '';
  @Input() truck_number: string = '';
  @Input() document_status: string = '';
  @Input() request_id: number = 0;
  @Input() company: string = '';
  @Input() destination: string = '';
}
