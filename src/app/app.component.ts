import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tms';
  showLayout: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showLayout = this.router.url !== '/login';
    });
  }
}
