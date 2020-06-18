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
// Import TranslateModule
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { EmployeeComponent } from './components/employee/employee.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    MenuComponent,
    LoadingComponent,
    EmployeeComponent
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
  })
  ],
  providers: [
    AuthService,
    EmployeeService,
    ActionToken,
    { provide: HTTP_INTERCEPTORS, useClass: FilterService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory( http: HttpClient ) {
  return new TranslateHttpLoader(http);
}
