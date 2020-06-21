import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { ErrorComponent } from './components/error/error.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthService]},
  { path: "", redirectTo: "dashboard", pathMatch: "full"},
  { path: "employee", component: EmployeeComponent, canActivate: [AuthService]},
  { path: "error", component: ErrorComponent, canActivate: [AuthService]},
  { path: "employee/add", component: AddEmployeeComponent, canActivate: [AuthService]},
  { path: "employee/view/:id", component: ViewEmployeeComponent, canActivate: [AuthService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
