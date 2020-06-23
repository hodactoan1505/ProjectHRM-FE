import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { error } from 'protractor';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private employeeService : EmployeeService,
    private translate : TranslateService
  ) {
    this.translate.setDefaultLang("vi");
   }

  ngOnInit(): void {
  }

}
