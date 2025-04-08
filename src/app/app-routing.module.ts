import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'dashboard',
    pathMatch: 'full'
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
  },{
    path: 'supplier',
    loadComponent: () =>
      import('./pages/supplier/supplier.component').then(m => m.SupplierComponent),
  },{
    path: 'zone',
    loadComponent: () =>
      import('./pages/zone/zone.component').then(m => m.ZoneComponent),
  },{
    path: 'container',
    loadComponent: () =>
      import('./pages/container/container.component').then(m => m.ContainerComponent),
  },{
    path: 'restriction',
    loadComponent: () =>
      import('./pages/restriction/restriction.component').then(m => m.RestrictionComponent),
  },{
    path: 'trucking_requests',
    loadComponent: () =>
      import('./pages/trucking-requests/trucking-requests.component').then(m => m.TruckingRequestsComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
