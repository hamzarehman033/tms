import { Component } from '@angular/core';
import { IconifyIcon } from '@iconify/types';
import homeIcon from '@iconify/icons-mdi/home';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // icon: IconifyIcon = homeIcon;
  title = 'tms';
}
