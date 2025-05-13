import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../core/service/app.service';

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

  constructor(private router: Router, private toastr: ToastrService, private appService: AppService) {

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
      this.toastr.error("Please enter correct details!", 'Error')
    } else {
      const payload: any = {}
      if (this.email) payload['email'] = this.email;
      if (this.password) payload['password'] = this.password;

      this.appService.loginURL(payload).subscribe((res: any) => {
        this.toastr.success("Login Successful!", 'Success');
        localStorage.setItem("user", JSON.stringify(res.data));
        this.router.navigateByUrl("/dashboard");
      });
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
