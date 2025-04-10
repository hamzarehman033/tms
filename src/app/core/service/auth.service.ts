import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { urlEnums } from '../url-enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = environment.baseURL;
  public token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoxLCJ0eXBlIjoiYXV0aCIsInNlc3Npb25faWQiOjcsImlhdCI6MTc0NDI3MTA0OSwiZXhwIjoxNzQ0NzAzMDQ5fQ.ZB_eH5t69lBMn0J0UZ4qy71itN3qidlX1wW77pUHr5I';
  constructor(private http: HttpClient) { }

}
