import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/service/app.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from '../../shared/components/filters/filters.component';

@Component({
  selector: 'app-restriction',
  templateUrl: './restriction.component.html',
  standalone: true,
  imports: [TableComponent, FormsModule, FiltersComponent],
  styleUrl: './restriction.component.scss'
})
export class RestrictionComponent implements OnInit{
  form_name: string = 'Restrictions'
  columnsToDisplay = ['ID', 'restriction_name', 'restriction_ph_no', 'Documents', 'Reason', 'Action'];
  dataSource: any;
  rest_id: any
  rest_status: any;
  rest_reason: any;
  showFilter: boolean = false;

  constructor(private appService: AppService ) { }

  ngOnInit(): void {
    this.getRestriction();
  }

  addRestriction(){
    const payload: any = {}
    if (this.rest_id) payload["id"] = this.rest_id;
    if (this.rest_status) payload["status"] = this.rest_status;
    if (this.rest_reason) payload["restriction_reason"] = this.rest_reason;

    this.appService.addRestriction(payload).subscribe((data: any)=>{
      console.log("Add restriction API: ", data);
    })
  }

  getRestriction(){
    const payload =
    {
      user_role: "driver"
    }
    this.appService.getRestriction(payload).subscribe((data: any)=>{
      this.dataSource = data?.data?.rows;
      console.log("Restriction's Data: ", this.dataSource);
    })
  }
}
