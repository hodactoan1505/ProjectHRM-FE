import { EmployeeComponent } from './components/employee/employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthService]},
  { path: "", redirectTo: "dashboard", pathMatch: "full"},
  { path: "employee", component: EmployeeComponent, canActivate: [AuthService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
