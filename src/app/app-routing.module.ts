import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'assignments',
    loadComponent: () =>
      import('./pages/assignments/assignments.component').then(m => m.AssignmentsComponent),
  },
  {
    path: 'documentation',
    loadComponent: () =>
      import('./pages/documentation/documentation.component').then(m => m.DocumentationComponent),
  },
  {
    path: 'drivers',
    loadComponent: () =>
      import('./pages/drivers/drivers.component').then(m => m.DriversComponent),
  },
  {
    path: 'requests',
    loadComponent: () =>
      import('./pages/requests/requests.component').then(m => m.RequestsComponent),
  },
  {
    path: 'trucks',
    loadComponent: () =>
      import('./pages/trucks/trucks.component').then(m => m.TrucksComponent),
  },
  {
    path: 'farm',
    loadComponent: () =>
      import('./pages/farm/farm.component').then(m => m.FarmComponent),
  },
  {
    path: 'farm-users',
    loadComponent: () =>
      import('./pages/farm-users/farm-users.component').then(m => m.FarmUsersComponent),
  },
  {
    path: 'supplier',
    loadComponent: () =>
      import('./pages/supplier/supplier.component').then(m => m.SupplierComponent),
  },
  {
    path: 'zone',
    loadComponent: () =>
      import('./pages/zone/zone.component').then(m => m.ZoneComponent),
  },
  {
    path: 'restriction',
    loadComponent: () =>
      import('./pages/restriction/restriction.component').then(m => m.RestrictionComponent),
  },
  {
    path: 'trucking_requests',
    loadComponent: () =>
      import('./pages/trucking-requests/trucking-requests.component').then(m => m.TruckingRequestsComponent),
  },
  {
    path: 'audit-trail',
    loadComponent: () =>
      import('./pages/audit-trail/audit-trail.component').then(m => m.AuditTrailComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
