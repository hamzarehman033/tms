import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = environment.baseURL;
  public token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJuYW1lIjoidGVzdDAxIHVzZXIiLCJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJBZG1pbiIsInVzZXJfcGVybWlzc2lvbnMiOlsxLDJdLCJwZXJtaXNzaW9ucyI6WyJWaWV3IFVzZXIiLCJBZGQgVXNlciJdLCJ0eXBlIjoiYXV0aCIsInNlc3Npb25faWQiOjQ4LCJpYXQiOjE3NDQ3OTg4NjQsImV4cCI6MTc0NTIzMDg2NH0.GsklM3Fw0nFxMjq9G602JYcRm266P50WilcRpULvVMo';
  constructor(private http: HttpClient) { }

}
