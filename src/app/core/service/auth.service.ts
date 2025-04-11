import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = environment.baseURL;
  public token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJuYW1lIjoidGVzdDAxIHVzZXIiLCJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJBZG1pbiIsInpvbmVfaWQiOjIsInpvbmVfbmFtZSI6InRlc3Qgem9uZTIiLCJ1c2VyX3Blcm1pc3Npb25zIjpbMSwyXSwicGVybWlzc2lvbnMiOlsiVmlldyBVc2VyIiwiQWRkIFVzZXIiXSwidHlwZSI6ImF1dGgiLCJzZXNzaW9uX2lkIjoxMCwiaWF0IjoxNzQ0MjgyMzQxLCJleHAiOjE3NDQ3MTQzNDF9.s38R7DTq8P0U_MvXXwn71R4u0J1w10fSSPfJ5CXKfVc';
  constructor(private http: HttpClient) { }

}
