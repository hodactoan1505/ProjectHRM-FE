import { FilterService } from './services/filter.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule,HttpInterceptor, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { EmployeeService } from './services/employee.service';
import { ActionToken } from './config/action-token';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoadingComponent } from './components/loading/loading.component';
import {DatePipe} from '@angular/common';

// Import TranslateModule
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { EmployeeComponent } from './components/employee/employee.component';
import { ErrorComponent } from './components/error/error.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MessageComponent } from './components/message/message.component';
import { DepartmentComponent } from './components/department/department.component';
import { ProjectComponent } from './components/project/project.component';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { ViewDepartmentComponent } from './components/view-department/view-department.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    MenuComponent,
    LoadingComponent,
    EmployeeComponent,
    ErrorComponent,
    ViewEmployeeComponent,
    AddEmployeeComponent,
    MessageComponent,
    DepartmentComponent,
    ProjectComponent,
    AddDepartmentComponent,
    ViewDepartmentComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    AuthService,
    EmployeeService,
    ActionToken,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: FilterService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory( http: HttpClient ) {
  return new TranslateHttpLoader(http);
}
