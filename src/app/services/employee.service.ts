import { DepartmentRequest } from 'src/app/models/request/department-request';
import { AuthService } from 'src/app/services/auth.service';
import { Constants } from './../config/constants';
import { EmployeeRequest } from './../models/request/employee-request';
import { ActionToken } from './../config/action-token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpReponse } from '../models/response/http-reponse';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http : HttpClient,
    private authService : AuthService
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

  /*
    Cập nhật danh sách nhân viên
  */ 
  updateEmployee(employeeRequest : EmployeeRequest) {
    return this.http.put(Constants.baseURL + "/employee/update", employeeRequest).pipe();
  }

  /*
    Hồ Sơ nhân viên đang xem chi tiết
  */
  employeeDetail = new BehaviorSubject<EmployeeRequest>(sessionStorage.getItem("EmployeeDetail") ? this.getEmployeeDetail() : null);
  currentEmployeeDetail = this.employeeDetail.asObservable();

  updateEmployeeDetail(employeeDetail : EmployeeRequest) {
    this.employeeDetail.next(employeeDetail);
  }

  // Lấy hồ sơ xem chi tiết trong session
  getEmployeeDetail() {
    let employeeDetail = JSON.parse(sessionStorage.getItem("EmployeeDetail"));
    return employeeDetail;
  }


  // Xóa danh sách nhân viên
  deleteEmployees(list : any) {
    const options = {
      headers: new HttpHeaders(),
      body: list
    }
    return this.http.delete(Constants.baseURL + "/employee/delete", options).pipe();
  }


  // Thêm mới bộ phận
  addDepartment(departmentRequest : DepartmentRequest) {
    return this.http.post(Constants.baseURL + "/department/add", departmentRequest).pipe();
  }

  // Cập nhật bộ phận
  updateDepartment(departmentRequest : DepartmentRequest) {
    return this.http.put(Constants.baseURL + "/department/update", departmentRequest).pipe();
  }
}
