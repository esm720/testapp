import { Routes } from '@angular/router';

import { StoreListComponent }        from './stores/store-list/store-list.component';
import { StoreFormComponent }        from './stores/store-form/store-form.component';

import { ManagerListComponent }      from './managers/manager-list/manager-list/manager-list.component';
import { ManagerFormComponent }      from './managers/manager-form/manager-form/manager-form.component';

import { EmployeeListComponent }     from './employees/employee-list/employee-list/employee-list.component';
import { EmployeeFormComponent }     from './employees/employee-form/employee-form/employee-form.component';

export const routes: Routes = [
  // Stores
  { path: 'stores',          component: StoreListComponent },
  { path: 'stores/new',      component: StoreFormComponent },
  { path: 'stores/edit/:id', component: StoreFormComponent },

  // Managers
  { path: 'managers',          component: ManagerListComponent },
  { path: 'managers/new',      component: ManagerFormComponent },
  { path: 'managers/edit/:id', component: ManagerFormComponent },

  // Employees
  { path: 'employees',          component: EmployeeListComponent },
  { path: 'employees/new',      component: EmployeeFormComponent },
  { path: 'employees/edit/:id', component: EmployeeFormComponent },

  // Redirect
  { path: '', redirectTo: 'stores', pathMatch: 'full' },
];
