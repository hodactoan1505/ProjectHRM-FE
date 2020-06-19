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
  getDepartment() {
    return this.http.get(Constants.baseURL + "/department").pipe();
  }


    /*
    Lấy danh sách dự án
  */
  getProject() {
    return this.http.get(Constants.baseURL + "/project").pipe();
  }

}
