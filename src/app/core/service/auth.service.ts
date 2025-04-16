import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = environment.baseURL;
  public token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJuYW1lIjoidGVzdDAxIHVzZXIiLCJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJBZG1pbiIsInVzZXJfcGVybWlzc2lvbnMiOlsxLDJdLCJwZXJtaXNzaW9ucyI6WyJWaWV3IFVzZXIiLCJBZGQgVXNlciJdLCJ0eXBlIjoiYXV0aCIsInNlc3Npb25faWQiOjMxLCJpYXQiOjE3NDQ3ODE3ODQsImV4cCI6MTc0NTIxMzc4NH0.VK7PFe6nqdTqWlgnLGMqpUtc4T7z0F_1oPLDrr6HMxc';
  constructor(private http: HttpClient) { }

}
