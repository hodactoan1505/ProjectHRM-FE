import { AuthService } from 'src/app/services/auth.service';
import { Constants } from './../config/constants';
import { EmployeeRequest } from './../models/request/employee-request';
import { ActionToken } from './../config/action-token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpReponse } from '../models/response/http-reponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http : HttpClient,

  ) { }
  

  /*
    Lấy danh sách user theo tính năng tìm kiếm
  */ 
  getEmployee(employeeRequest : EmployeeRequest) {
    return this.http.post(Constants.baseURL + "/employee", employeeRequest ).pipe();
  }


  /*
    Lấy danh sách bộ phận
  */
  getDepartment(employeeRequest : EmployeeRequest) {
    return this.http.post(Constants.baseURL + "/department", employeeRequest).pipe();
  }


  /*
    Lấy danh sách dự án
  */
  getProject(employeeRequest : EmployeeRequest) {
    return this.http.post(Constants.baseURL + "/project", employeeRequest).pipe();
  }

  /*
    Lấy danh sách skill
  */
  getSkill() {
    return this.http.get(Constants.baseURL + "/skill").pipe();
  }

  /*
    Thêm mới hồ sơ nhân viên
  */
  addEmployee(employeeRequest : EmployeeRequest) {
    return this.http.post(Constants.baseURL + "/employee/add", employeeRequest).pipe();
  }
}
