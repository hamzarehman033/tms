import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/service/app.service';
import { TableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-restriction',
  templateUrl: './restriction.component.html',
  standalone: true,
  imports: [TableComponent],
  styleUrl: './restriction.component.scss'
})
export class RestrictionComponent implements OnInit{
  columnsToDisplay = ['ID', 'restriction_name', 'restriction_ph_no', 'Documents', 'Reason', 'Action'];
  dataSource: any;

  constructor(private appService: AppService ) { }
  ngOnInit(): void {
    this.getRestriction();
  }

  addRestriction(){
    const payload = {
      id: 50,
      status: 0,
      restriction_reason: "Lorem ispsum dollar"
    }
    this.appService.addRestriction(payload).subscribe((data: any)=>{
      // this.dataSource = data;
      console.log("Add restriction API: ", data);
    })
  }

  getRestriction(){
    const payload =
    {
        user_role: "driver"
    }
    this.appService.getRestriction(payload).subscribe((data: any)=>{
      this.dataSource = data.restrictions.rows;
      console.log("Restriction's Data: ", this.dataSource); 
    })
  }
}
