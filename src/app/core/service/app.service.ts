import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlEnums } from '../url-enum';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseURL = environment.baseURL
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
    return this.http.post(`${this.baseURL}${urlEnums.getSupplier}`, formData);

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
