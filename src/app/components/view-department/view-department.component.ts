import { error } from 'protractor';
import { HttpReponse } from './../../models/response/http-reponse';
import { Constants } from './../../config/constants';
import { EmployeeService } from './../../services/employee.service';
import { AuthService } from './../../services/auth.service';
import { DepartmentRequest } from './../../models/request/department-request';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeRequest } from 'src/app/models/request/employee-request';
import { Exception } from 'src/app/config/exception';
import { ActionService } from 'src/app/services/action.service';
import { MessageException } from 'src/app/config/message-exception';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.css']
})
export class ViewDepartmentComponent implements OnInit {
  
  constructor(
    private translate : TranslateService,
    private authService : AuthService,
    private employeeService : EmployeeService,
    private router : Router,
    private activatedRoute: ActivatedRoute,
    private actionService : ActionService
  ) { 
    this.translate.setDefaultLang("vi");
  }

  ngOnInit(): void {
    this.setRole();
  }

  isAdmin = false;
  setRole() {
    this.authService.currentUser.subscribe(
      (user) => {
        if(user != null) {
          if(user.role.id == Constants.getRoleLeaderId 
              || user.role.id == Constants.getRoleMemberId 
              || user.role.id == Constants.getRoleDepartmentId) {
            this.router.navigate(['error']);
          }

          if(user.role.id != Constants.getRoleAdminId) {
            this.isAdmin = true;
          } 
          this.getDepartment();
          
        }
      }
    )
  }


  // Xét phòng ban để query lấy dữ liệu
  employeeRequest : EmployeeRequest = new EmployeeRequest;
  department : DepartmentRequest = new DepartmentRequest;
  getDepartment() {
    let department = new DepartmentRequest;
    department.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.employeeRequest.department = [department];

    this.employeeService.getDepartment(this.employeeRequest).subscribe(
      (data : HttpReponse) => {
        if(data.code == Exception.success) {
          this.department = data.data[0];
          console.log(data.data[0])
        }
      },
      (error) => {
        this.actionService.updateMessage(error.status);
        this.router.navigate(['error']);
      }
    )
  }
  update() {
    this.actionService.updateLoading(true);
    if(this.department.name == null || this.department.name.trim() == "") {
      this.actionService.updateMessage(MessageException.messageNameEmpty);
      this.actionService.updateLoading(false);
      return;
    }

    if(this.department.startdate == null) {
      this.actionService.updateMessage(MessageException.messageStartDateEmpty);
      this.actionService.updateLoading(false);
      return;
    }

    this.employeeService.updateDepartment(this.department).subscribe(
      (data : HttpReponse) => {
        if(data.code == Exception.departmentAlreadyExist) {
          this.actionService.updateMessage(MessageException.messageNameAlreadyExist);
        }

        if(data.code == Exception.departmentNotFound) {
          this.actionService.updateMessage(data.message);
        }
        this.actionService.updateLoading(false);
        this.router.navigate(['department']);
        
      },
      (error) => {
        this.actionService.updateMessage(error.status);
        this.actionService.updateLoading(false);
        this.router.navigate(['error']);
      }
    )

  }

  exit() {

  }

}
