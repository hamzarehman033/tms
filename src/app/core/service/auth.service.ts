import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = environment.baseURL;
  public token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJuYW1lIjoidGVzdDAxIHVzZXIiLCJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJBZG1pbiIsInVzZXJfcGVybWlzc2lvbnMiOlsxLDIsMyw0LDUsN10sInBlcm1pc3Npb25zIjpbImRhc2hib2FyZCIsIlN1cHBsaWVyIE1hbmFnZW1lbnQiLCJEcml2ZXIgTWFuYWdlbWVudCIsIkZhcm0gTWFuYWdlbWVudCIsIlpvbmUgTWFuYWdlbWVudCIsIlJlc3RyaWN0aW9uIE1hbmFnZW1lbnQiXSwidHlwZSI6ImF1dGgiLCJzZXNzaW9uX2lkIjoxNTYsImlhdCI6MTc0NzAzMzQ1NiwiZXhwIjoxNzQ3NDY1NDU2fQ.2nvp5RUiv7m2zmc1lxG0DZ7PN0qov-3CA-kH9S9Mrl4';
  constructor(private http: HttpClient) { }

}
