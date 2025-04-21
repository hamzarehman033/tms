import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = environment.baseURL;
  public token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJuYW1lIjoidGVzdDAxIHVzZXIiLCJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJBZG1pbiIsInVzZXJfcGVybWlzc2lvbnMiOlsxLDIsMyw0LDUsN10sInBlcm1pc3Npb25zIjpbImRhc2hib2FyZCIsIlN1cHBsaWVyIE1hbmFnZW1lbnQiLCJEcml2ZXIgTWFuYWdlbWVudCIsIkZhcm0gTWFuYWdlbWVudCIsIlpvbmUgTWFuYWdlbWVudCIsIlJlc3RyaWN0aW9uIE1hbmFnZW1lbnQiXSwidHlwZSI6ImF1dGgiLCJzZXNzaW9uX2lkIjo3OSwiaWF0IjoxNzQ1MjMwOTYzLCJleHAiOjE3NDU2NjI5NjN9.1uG_YF6XNZvwlrIlD2Nw0PgNHpfg8TG7aTRJiWUy-Qk';
  constructor(private http: HttpClient) { }

}
