import { HttpReponse } from 'src/app/models/response/http-reponse';
import { EmployeeRequest } from 'src/app/models/request/employee-request';
import { Constants } from './../../config/constants';
import { EmployeeService } from 'src/app/services/employee.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Exception } from 'src/app/config/exception';
import { DepartmentRequest } from 'src/app/models/request/department-request';
import { ActionService } from 'src/app/services/action.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  constructor(
    private employeeService : EmployeeService,
    private authService : AuthService,
    private router : Router,
    private actionService :ActionService
  ) { }

  ngOnInit(): void {
    this.getRole();
  }


  getRole() {
    this.authService.currentUser.subscribe(
      (user) => {
        if(user != null) {
          if(user.role.id == Constants.getRoleMemberId 
            || user.role.id == Constants.getRoleLeaderId
            || user.role.id == Constants.getRoleDepartmentId) {
            this.router.navigate(['error']);
          }

          this.getDepartment();
        }
      }
    )
  }

  employeeRequest : EmployeeRequest = new EmployeeRequest;
  departments : DepartmentRequest[];
  getDepartment() {
    this.employeeService.getDepartment(this.employeeRequest).subscribe(
      (data : HttpReponse) => {
        if(data.code == Exception.success) {
          this.departments = data.data;
        }
      },
      (error) => {
        this.actionService.updateMessage(error);
        this.router.navigate(['error']);
      }
    )
  }

}
