import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = environment.baseURL;
  public token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJuYW1lIjoidGVzdDAxIHVzZXIiLCJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJBZG1pbiIsInVzZXJfcGVybWlzc2lvbnMiOlsxLDIsMyw0LDUsN10sInBlcm1pc3Npb25zIjpbImRhc2hib2FyZCIsIlN1cHBsaWVyIE1hbmFnZW1lbnQiLCJEcml2ZXIgTWFuYWdlbWVudCIsIkZhcm0gTWFuYWdlbWVudCIsIlpvbmUgTWFuYWdlbWVudCIsIlJlc3RyaWN0aW9uIE1hbmFnZW1lbnQiXSwidHlwZSI6ImF1dGgiLCJzZXNzaW9uX2lkIjoxMDksImlhdCI6MTc0NTgzMzEwNiwiZXhwIjoxNzQ2MjY1MTA2fQ.W3Wz1bR_daS5sKsUyZt5Z-E5hPevK0_fOC7U-55x3o0';
  constructor(private http: HttpClient) { }

}
