import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { DepartmentComponent } from './components/department/department.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { ErrorComponent } from './components/error/error.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';
import { ProjectComponent } from './components/project/project.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthService]},
  { path: "", redirectTo: "dashboard", pathMatch: "full"},
  { path: "employee", component: EmployeeComponent, canActivate: [AuthService]},
  { path: "error", component: ErrorComponent, canActivate: [AuthService]},
  { path: "employee/add", component: AddEmployeeComponent, canActivate: [AuthService]},
  { path: "employee/view", component: ViewEmployeeComponent, canActivate: [AuthService]},
  { path: "department", component: DepartmentComponent, canActivate: [AuthService]},
  { path: "department/add", component: AddDepartmentComponent, canActivate: [AuthService]},
  { path: "project", component: ProjectComponent, canActivate: [AuthService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
