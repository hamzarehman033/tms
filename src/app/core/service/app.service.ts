import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlEnums } from '../url-enum';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseURL = environment.baseURL;
  constructor(private http: HttpClient) { }

  createUser(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.createUser}`, formData);
  }

  updateUser(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.updateUser}`, formData);
  }

  loginURL(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.loginURL}`, formData);
  }

  logoutUser(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.logoutUser}`, formData);
  }

  deleteUser(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.deleteUser}`, formData);
  }

  userList(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.userList}`, formData);
  }

  getUser(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.getUser}`, formData);
  }

  addDriver(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.addDriver}`, formData);
  }
  getDriver(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.getDriver}`, formData);
  }
  updateDriver(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.updateDriver}`, formData);
  }
  driverList(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.driverList}`, formData);
  }
  deleteDriver(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.deleteDriver}`, formData);

  }
  addSupplier(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.addSupplier}`, formData);
  }

  supplierList(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.supplierList}`, formData)
  }

  updateSupplier(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.updateSupplier}`, formData);
  }

  deleteSupplier(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.deleteSupplier}`, formData);
  }

  getSupplier(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.getSupplier}`, formData);
  }

  addFarm(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.addFarm}`, formData);
  }

  farmList(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.farmList}`, formData);
  }
  
  updateFarm(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.updateFarm}`, formData);
  }

  deleteFarm(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.deleteFarm}`, formData);
  }

  getFarm(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.getFarm}`, formData);
  }

  addFarmUser(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.addFarmUser}`, formData);
  }

  deleteFarmUser(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.deleteFarmUser}`, formData);
  }

  updateFarmUser(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.updateFarmUser}`, formData);
  }

  getFarmUser(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.getFarmUser}`, formData);
  }

  farmUserList(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.farmUserList}`, formData);
  }

  getPermission(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.getPermission}`, formData);
  }

  updatePermission(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.updatePermission}`, formData);
  }

  addPermission(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.addPermission}`, formData);
  }

  deletePermission(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.deletePermission}`, formData);
  }

  getUserPermission(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.getUserPermission}`, formData);
  }

  updateUserPermission(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.updateUserPermission}`, formData);
  }

  deleteUserPErmission(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.deleteUserPErmission}`, formData);
  }

  addUserPermission(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.addUserPermission}`, formData);
  }

  addZone(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.addZone}`, formData);
  }

  updateZone(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.updateZone}`, formData);
  }

  deleteZone(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.deleteZone}`, formData);
  }

  getZone(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.getZone}`, formData);
  }

  zoneList(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.zoneList}`, formData);
  }

  addRestriction(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.addRestriction}`, formData);
  }

  getRestriction(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.getRestriction}`, formData);
  }

  removeRestriction(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.removeRestriction}`, formData);
  }

  addTruckRestriction(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.addTruckRestriction}`, formData);
  }

  removeTruckRestriction(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.removeTruckRestriction}`, formData);
  }
  
  // Audit Trail
  getAuditTrail(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.getAuditTrail}`, formData);
  }

  getAllAuditTrail(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.getAllAuditTrails}`, formData);
  }

  // Add/Delete farm suppliers
  addFarmSupplier(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.addFarmSupplier}`, formData);
  }

  deleteFarmSupplier(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.deleteFarmSupplier}`, formData);
  }

  // Dashboard Stats
  getStats(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.getStats}`, formData);
  }

  getAverageTravelTime(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.getAverageTravelTime}`, formData);
  }

  getAverageWaitingTime(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.getAverageWaitingTime}`, formData);
  }

  getWeeklyAverageTrips(formData: any){
    return this.http.post(`${this.baseURL}${urlEnums.getWeeklyAverageTrips}`, formData);
  }
}
