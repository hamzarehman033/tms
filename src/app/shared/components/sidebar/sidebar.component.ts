import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})




export class SidebarComponent {
  dashboard_heading: boolean = false;
  pageHeadingText: string = '';

  @Output() toggleDrawer = new EventEmitter<void>();
  @Input() user_name = 'Kane';

  constructor(private router: Router) { }

  ngOnInit() {
    // Set initial values based on current route
    this.updatePageHeading(this.router.url);

    // Listen for route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updatePageHeading(event.url);
      });
  }

  onToggle() {
    this.toggleDrawer.emit();
  }

  // This method updates both properties at once
  private updatePageHeading(currentRoute: string): void {
    if (currentRoute.includes("dashboard")) {
      this.dashboard_heading = true;
      this.pageHeadingText = '';
    } else if (currentRoute.includes("farm")) {
      this.dashboard_heading = false;
      this.pageHeadingText = "Farms";
    } else if (currentRoute.includes("supplier")) {
      this.dashboard_heading = false;
      this.pageHeadingText = "Trucking Company";
    } else if (currentRoute.includes("driver")) {
      this.dashboard_heading = false;
      this.pageHeadingText = "Drivers";
    } else if (currentRoute.includes("zone")) {
      this.dashboard_heading = false;
      this.pageHeadingText = "Zones";
    } else if (currentRoute.includes("restriction")) {
      this.dashboard_heading = false;
      this.pageHeadingText = "Restrictions";
    } else if (currentRoute.includes("audit-trail")) {
      this.dashboard_heading = false;
      this.pageHeadingText = "Audit Trails";
    } else {
      this.dashboard_heading = false;
      this.pageHeadingText = '';
    }
  }
  // Getter that doesn't change any state
  get pageHeading(): string {
    return this.pageHeadingText;
  }
}
