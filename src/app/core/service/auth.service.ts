import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = environment.baseURL;
  public token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoxLCJ0eXBlIjoiYXV0aCIsInNlc3Npb25faWQiOjksImlhdCI6MTc0NDI3ODc2NywiZXhwIjoxNzQ0NzEwNzY3fQ.Q5DQrIkiP6Ir5EDBb5jp3YYZjh7GInZ8oTPYZs8c4DM';
  constructor(private http: HttpClient) { }

}
