import { HttpReponse } from 'src/app/models/response/http-reponse';
import { EmployeeService } from 'src/app/services/employee.service';
import { MessageException } from 'src/app/config/message-exception';
import { DepartmentRequest } from 'src/app/models/request/department-request';
import { Constants } from './../../config/constants';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActionService } from 'src/app/services/action.service';
import { error } from 'protractor';
import { Exception } from 'src/app/config/exception';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  constructor(
    private router : Router,
    private translate : TranslateService,
    private authService : AuthService,
    private actionService : ActionService,
    private employeeService : EmployeeService
  ) { 
    this.translate.setDefaultLang("vi");
  }

  ngOnInit(): void {
    this.setRole();
  }

  setRole() {
    this.authService.currentUser.subscribe(
      (user) => {
        if(user != null) {
          if(user.role.id != Constants.getRoleAdminId) {
            this.router.navigate(['error']);
          }
        }
      }
    );
  }

  /*
    Tạo mới phòng ban
  */ 
  department : DepartmentRequest = new DepartmentRequest;
  create() {
    if(this.department.name == null || this.department.name.trim() == "") {
      this.actionService.updateMessage(MessageException.messageNameEmpty);
      return;
    }

    if(this.department.startdate == null) {
      this.actionService.updateMessage(MessageException.messageStartDateEmpty);
      return;
    }

    this.employeeService.addDepartment(this.department).subscribe(
      (data : HttpReponse) => {
        if(data.code == Exception.departmentAlreadyExist) {
          this.actionService.updateMessage(MessageException.messageNameAlreadyExist)
        }

        if(data.code == Exception.success) {
          this.router.navigate(['department']);
        }

      },
      (error) => {
        this.actionService.updateMessage(error.status);
        this.router.navigate(['error']);
      }
    )


  }



  /*
    Quay lại trang danh sách phòng ban
  */ 
  exit() {
    this.router.navigate(['department']);
  }
}
