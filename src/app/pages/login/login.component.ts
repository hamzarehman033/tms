import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {

  email: any;
  password: any;
  rememberMe: boolean = false;
  showPassword: boolean = false;
  key = "7fmNevUzHlxa6km!135790Fun";
  passwordExpired = false;
  ResetMessage = "Password has expired. Reset your password.";
  resetLink = 'https://adfsazure.freshdelmonte.com/adfs/portal/updatepassword/';

  constructor(
    private router: Router,
  ) {
    const storedRememberMe = localStorage.getItem('rememberMe');
    if (storedRememberMe) {
      this.rememberMe = true;
    }
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    this.login();
  }

  login() {
    if (!this.email || !this.password) {
      alert("Please enter correct details!")
    } else {
      this.router.navigateByUrl("/dashboard")
    }
  }

  onRememberMeChange(event: any): void {
    if (event.target.checked) {
      // Save 'rememberMe' status in localStorage
      localStorage.setItem('rememberMe', 'true');
    } else {
      // Remove 'rememberMe' status from localStorage
      localStorage.removeItem('rememberMe');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
