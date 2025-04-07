import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
