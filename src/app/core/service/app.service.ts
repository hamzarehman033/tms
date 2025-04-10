import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlEnums } from '../url-enum';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseURL = environment.baseURL;
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoxLCJ0eXBlIjoiYXV0aCIsInNlc3Npb25faWQiOjcsImlhdCI6MTc0NDI3MTA0OSwiZXhwIjoxNzQ0NzAzMDQ5fQ.ZB_eH5t69lBMn0J0UZ4qy71itN3qidlX1wW77pUHr5I';
  constructor(private http: HttpClient) { }

  createUser(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.createUser}`, formData);
  }

  updateUser(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.updateUser}`, formData);
  }

  loginURL(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.loginURL}`, formData);
  }

  deleteUser(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.deleteUser}`, formData);
  }

  userList(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.userList}`, formData);
  }

  getUser(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.getUser}`, formData);
  }

  addDriver(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.addDriver}`, formData);
  }
  getDriver(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.getDriver}`, formData);
  }
  updateDriver(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.updateDriver}`, formData);
  }
  driverList(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.driverList}`, formData);
  }
  deleteDriver(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.deleteDriver}`, formData);

  }
  addSupplier(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.addSupplier}`, formData);
  }

  supplierList(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.supplierList}`, formData);
  }

  updateSupplier(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.updateSupplier}`, formData);
  }

  deleteSupplier(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.deleteSupplier}`, formData);
  }

  getSupplier(formData: string){
    // // return this.http.post(`${this.baseURL}${urlEnums.getSupplier}`, formData);

    //  // Set up the headers with the Authorization token
    //  const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${this.token}`
    // });

    // // Pass the headers as part of the request
    // return this.http.post(`${this.baseURL}${urlEnums.getSupplier}`, formData, { headers });

    // Create the initial request
    const req = new HttpRequest('POST', `${this.baseURL}${urlEnums.getSupplier}`, formData);

    // Clone the request and add the Authorization token to the headers
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`
      }
    });

    // Return the cloned request with the token added
    return this.http.request(clonedRequest);
  }

  addFarm(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.addFarm}`, formData);
  }

  getPermission(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.getPermission}`, formData);
  }

  updatePermission(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.updatePermission}`, formData);
  }

  addPermission(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.addPermission}`, formData);
  }

  deletePermission(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.deletePermission}`, formData);
  }

  getUserPermission(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.getUserPermission}`, formData);
  }

  updateUserPermission(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.updateUserPermission}`, formData);
  }

  deleteUserPErmission(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.deleteUserPErmission}`, formData);
  }

  addUserPermission(formData: string){
    return this.http.post(`${this.baseURL}${urlEnums.addUserPermission}`, formData);
  }
}
