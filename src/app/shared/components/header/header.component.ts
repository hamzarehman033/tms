import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  dashboard_heading: boolean = false;
  pageHeadingText: string = '';

  @Input() user_name = 'Kane';

  constructor(private router: Router, private toastr: ToastrService) {}

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


  // This method updates both properties at once
  private updatePageHeading(currentRoute: string): void {
    if (currentRoute.includes("dashboard")) {
      this.dashboard_heading = true;
      this.pageHeadingText = '';
    } else if (currentRoute.includes("farm-users")) {
      this.dashboard_heading = false;
      this.pageHeadingText = "Farm Users";
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

  logout() {
    this.router.navigateByUrl("/login");
    localStorage.removeItem('user');
    this.toastr.success("Logged out successfully!", 'Success');
  }
}