import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  // Safe method to get token from localStorage
  getToken(): string {
    try {
      const userItem = localStorage.getItem('user');
      if (userItem) {
        const user = JSON.parse(userItem);
        return user?.token || '';
      }
      return '';
    } catch (error) {
      console.error('Error retrieving token from localStorage:', error);
      return '';
    }
  }
}