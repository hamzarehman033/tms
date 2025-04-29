import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  dashboard_heading: boolean = false;

  @Output() toggleDrawer = new EventEmitter<void>();
  @Input() user_name = 'Kane';

  constructor( private router: Router){}

  onToggle() {
    this.toggleDrawer.emit();
  }

  get pageHeading(): string {
    const currentRoute = this.router.url;

    if (currentRoute.includes("dashboard")) {
      this.dashboard_heading = true;
      return '';
    } else if (currentRoute.includes("farm")) {
      this.dashboard_heading = false;
      return "Farms";
    } else if (currentRoute.includes("supplier")) {
      this.dashboard_heading = false;
      return "Trucking Company";
    } else if (currentRoute.includes("driver")) {
      this.dashboard_heading = false;
      return "Drivers";
    } else if (currentRoute.includes("zone")) {
      this.dashboard_heading = false;
      return "Zones";
    } else if (currentRoute.includes("restriction")) {
      this.dashboard_heading = false;
      return "Restrictions";
    } else if (currentRoute.includes("audit-trail")) {
      this.dashboard_heading = false;
      return "Audit Trails";
    } else {
      return ''; 
    }
  }
}