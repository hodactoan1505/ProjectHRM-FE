import { HttpReponse } from './../../models/response/http-reponse';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { error } from 'protractor';
import { ProjectResponse } from 'src/app/models/response/project-response';
import { Constants } from './../../config/constants';
import { EmployeeService } from 'src/app/services/employee.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ActionService } from 'src/app/services/action.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeRequest } from 'src/app/models/request/employee-request';
import { Exception } from 'src/app/config/exception';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {


  /*
    Danh sách cài đặt của selectbox
  */
  SettingsSingle:IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
  };

  constructor(
    private router : Router,
    private translate : TranslateService,
    private authService : AuthService,
    private action : ActionService,
    private employeeService : EmployeeService
  ) { 
    this.translate.setDefaultLang("vi");
  }

  ngOnInit(): void {
    this.setRole();
  }


  employeeRequest : EmployeeRequest = new EmployeeRequest;
  setRole(){
    this.authService.currentUser.subscribe(
      (user) => {
        if(user != null) {
          if(user.role.id == Constants.getRoleLeaderId || user.role.id == Constants.getRoleMemberId) {
            this.router.navigate(['error']);
          }

          if(user.role.id == Constants.getRoleDepartmentId) {
            this.employeeRequest.department = [user.department];
          }

          this.getData();
          this.getDepartment();
        }
      }
    )
  }

  projects : ProjectResponse[]= [];
  getData() {
    this.action.updateLoading(true);
    this.employeeService.getProject(this.employeeRequest).subscribe(
      (data : HttpReponse) => {
        this.action.updateLoading(false);
        if(data.code == Exception.success) {
          this.projects = data.data;
          console.log(this.projects);
        }
      },
      (error) => {
        this.action.updateMessage(error.status);
        this.router.navigate(['error']);
      }
    )
  }
  isAdmin;
  changeProject(value) {

  }

  view(item) {

  }

  listProjectDelete = null;
  deleteProjects() {

  }

  onItemDepartmentSelect(value) {

  }

  departments;
  getDepartment() {
    this.employeeService.getDepartment(this.employeeRequest).subscribe(
      (data : HttpReponse) => {
        if(data.code == Exception.success) {
          this.departments = data.data
        }
      }
    )
  }

  search() {
    console.log(this.employeeRequest);
  }
}
