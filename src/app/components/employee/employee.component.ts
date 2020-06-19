import { HttpReponse } from './../../models/response/http-reponse';
import { EmployeeResponse } from './../../models/response/employee-response';
import { Constants } from 'src/app/config/constants';
import { UserResponse } from './../../models/response/user-response';
import { EmployeeService } from 'src/app/services/employee.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeRequest } from 'src/app/models/request/employee-request';
import { Router } from '@angular/router';
import { ActionService } from 'src/app/services/action.service';
import { Exception } from 'src/app/config/exception';
import { DepartmentResponse } from 'src/app/models/response/department-response';
import { ProjectRequest } from 'src/app/models/request/project-request';
import { ProjectResponse } from 'src/app/models/response/project-response';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  user : UserResponse = new UserResponse;

  

  constructor(
    private employeeService : EmployeeService,
    private authService : AuthService,
    private router : Router,
    private actionService : ActionService
  ) { }

  ngOnInit(): void {
    this.actionService.updateLoading(true);
    setTimeout(() => {
      this.actionService.updateLoading(false);
    }, 3000);
    this.authService.currentUser.subscribe(
      (user) => {
        this.user = user;
        if(this.user != null) {
          this.getData();
          this.getDepartment();
          this.getProject();
        }
       
      }
    )

    // this.employeeSearch.department = null;
    // this.employeeSearch.project = null;
  }

  /*
    Phân quyền chức năng lấy dữ liệu từ Server
    - Admin, Manager sẽ lấy tất cả dữ liệu
    - Department sẽ lấy dữ liệu của phòng ban tương ứng của nhân viên
    - Leader sẽ lấy dữ liệu của project tương ứng của nhân viên
    - Member sẽ redirect về trang Error
  */
  employeeRequest : EmployeeRequest = new EmployeeRequest;
  employees : EmployeeResponse[] = [];
  getData() {
    if(this.user.role.id == Constants.getRoleMemberId && this.user.role.name == Constants.getRoleMemberName) {
      this.router.navigate(['error']);
      return;
    }

    if(this.user.role.id == Constants.getRoleDepartmentId && this.user.role.name == Constants.getRoleDepartmentName) {
      this.employeeRequest.department = this.user.department;
    }

    if(this.user.role.id == Constants.getRoleLeaderId && this.user.role.name == Constants.getRoleLeaderName) {
      this.employeeRequest.department = this.user.department;
      this.employeeRequest.project = this.user.project;
    }

    this.employeeService.getEmployee(this.employeeRequest).subscribe(
      (data : HttpReponse) => {
        if(data.code == Exception.success) {
          this.employees = data.data;
        }      
      },
      (error) => {
        this.router.navigate(['error']);
      }
     );
  }


  /*
    Lấy danh sách bộ phận
  */
  departments : DepartmentResponse[] = [];
  getDepartment() {
    this.employeeService.getDepartment().subscribe(
      (data : HttpReponse) => {
        this.departments = data.data
      }
    );
  }


  /*
    Lấy danh sách bộ phận
  */
  projects : ProjectResponse[] = [];
  getProject() {
    this.employeeService.getProject().subscribe(
      (data : HttpReponse) => {
        this.projects = data.data;
      }
    );
  }

  /*
    Hành động tìm kiếm
  */ 
  employeeSearch : EmployeeRequest = new EmployeeRequest;
  
  search() {
    this.actionService.updateLoading(true);
    this.employeeService.getEmployee(this.employeeSearch).subscribe(
      (data : HttpReponse) => {
        this.employees = data.data;
        
        this.actionService.updateLoading(false);
      }
    )
  }

  compareFn(a : any, b : any) {
    return a && b && a.num == b.num;
  }

}
